import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import axios from "axios";

// Navbar Component
const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <motion.nav
            className={`${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } shadow-md rounded-full px-8 py-4 flex justify-between items-center w-[90%] max-w-7xl mx-auto sticky top-4 z-50`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center space-x-3">
                <span className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                    BiceChat
                </span>
            </div>
            <ul className="hidden md:flex space-x-8 text-sm font-medium">
                {[
                    { name: "Home", path: "/" },
                    { name: "Chat", path: "/chat" },
                    { name: "Features", path: "/" },
                    { name: "Pricing", path: "/" },
                    { name: "How It Works", path: "/" },
                ].map((item, index) => (
                    <motion.li
                        key={index}
                        className={`hover:text-blue-500 transition duration-300 cursor-pointer ${
                            darkMode ? "text-white" : "text-black"
                        }`}
                        whileHover={{ scale: 1.1 }}
                    >
                        <a href={item.path} className="no-underline">
                            {item.name}
                        </a>
                    </motion.li>
                ))}
            </ul>
            <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full"
                whileHover={{ scale: 1.1 }}
            >
                {darkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-blue-500" />}
            </motion.button>
        </motion.nav>
    );
};

// ChatPage Component
const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const handleSend = async () => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            alert("API Key is missing! Please configure your .env file.");
            return;
        }

        if (input.trim() === "") {
            alert("Input cannot be empty!");
            return;
        }

        const newMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setBotTyping(true);

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: input },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const botResponse = {
                sender: "bot",
                text: response.data.choices[0].message.content.trim(),
            };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Error communicating with OpenAI:", error.response?.data || error.message);

            if (error.response?.status === 403) {
                alert("Error: Forbidden. Please check API permissions.");
            } else if (error.response?.status === 401) {
                alert("Error: Unauthorized. Please check your API key.");
            } else {
                alert("An error occurred while communicating with OpenAI.");
            }
        } finally {
            setBotTyping(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <div className="flex justify-center items-center mt-16">
                <div className="w-[85%] h-[80vh] p-6 bg-white shadow-xl rounded-lg border-2 border-blue-100">
                    <div className="bg-white shadow-md rounded-lg flex flex-col h-full">
                        <header className="bg-blue-500 py-4 px-6 flex justify-between items-center rounded-t-lg">
                            <h1 className="text-xl font-bold text-white">BiceChat</h1>
                            <p className="text-white text-sm">Powered by OpenAI</p>
                        </header>

                        <div className="flex-grow p-6 overflow-y-auto max-h-[60vh] bg-gray-50">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`px-4 py-2 max-w-lg rounded-lg ${
                                            message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            {botTyping && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-2 max-w-lg rounded-lg bg-gray-200 text-gray-800">
                                        <span>Bot is typing...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <footer className="bg-gray-100 py-4 px-6 flex items-center rounded-b-lg">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="flex-grow bg-white rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your message here..."
                            />
                            <motion.button
                                onClick={handleSend}
                                className="ml-4 bg-blue-500 text-white rounded-full p-3 shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                whileHover={{ scale: 1.1 }}
                            >
                                <FiSend size={20} />
                            </motion.button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

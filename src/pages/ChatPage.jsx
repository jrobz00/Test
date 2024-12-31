import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCopy } from "react-icons/fi";
import axios from "axios";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [botTyping, setBotTyping] = useState(false);
    const chatEndRef = useRef(null);

    // Hardcoded API key (public exposure risk!)
    const OPENAI_API_KEY = "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";

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!OPENAI_API_KEY) {
            alert("API Key is missing! Please configure your API key.");
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
            let botResponse;

            if (/who.*made.*(you|this site)/i.test(input)) {
                botResponse =
                    "This site was created by Joseph Robinson and powered by OpenAI.";
            } else {
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
                            Authorization: `Bearer ${OPENAI_API_KEY}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                botResponse = response.data.choices[0].message.content.trim();
            }

            setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
            setGeneratedCode(botResponse);
        } catch (error) {
            console.error("Error communicating with OpenAI:", error.response?.data || error.message);
            alert("An error occurred while communicating with OpenAI.");
        } finally {
            setBotTyping(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        alert("Response copied to clipboard!");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="bg-[#F9FAFB] text-black min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <header className="border-b border-gray-200 pb-4 mb-4">
                    <h1 className="text-xl font-bold text-gray-800">BiceChat</h1>
                    <p className="text-sm text-gray-500">Powered by OpenAI.</p>
                </header>
                <div className="space-y-6 max-h-[400px] overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`px-4 py-3 max-w-md rounded-lg shadow-sm ${
                                    message.sender === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    {botTyping && (
                        <div className="flex justify-start">
                            <div className="px-4 py-3 max-w-md rounded-lg bg-gray-100 text-gray-800 shadow-sm">
                                Bot is typing...
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                {generatedCode && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                        <p className="font-bold text-gray-700 mb-2">AI Answer</p>
                        <pre className="text-sm text-gray-600 font-mono overflow-x-auto">{generatedCode}</pre>
                        <button
                            onClick={copyToClipboard}
                            className="mt-2 text-blue-500 text-sm hover:underline"
                        >
                            Copy
                        </button>
                    </div>
                )}
                <footer className="mt-6">
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="flex-grow bg-transparent text-gray-800 focus:outline-none placeholder-gray-500 border-none"
                            placeholder="Start with a detailed description"
                        />
                        <motion.button
                            onClick={handleSend}
                            className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-400 focus:outline-none"
                            whileHover={{ scale: 1.1 }}
                        >
                            <FiSend size={20} />
                        </motion.button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ChatPage;

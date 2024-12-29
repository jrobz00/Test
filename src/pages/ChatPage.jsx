import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import axios from "axios";

// Navbar component with Link elements for navigation
const Navbar = () => {
  return (
    <motion.nav
      className="bg-white shadow-md rounded-full px-8 py-4 flex justify-between items-center w-[90%] max-w-7xl mx-auto sticky top-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span className="text-white font-bold text-sm">✦</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">AI Chat</span>
      </div>

      <ul className="hidden md:flex space-x-8 text-black font-medium">
        {["Home", "Chat", "Features", "Pricing", "How It Works"].map((item, index) => (
          <motion.li
            key={index}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <a href={`/${item.toLowerCase()}`} className="no-underline text-black">
              {item}
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-blue-500 shadow-md transition duration-300"
        whileHover={{ scale: 1.1 }}
      >
        Sign Up
      </motion.button>
    </motion.nav>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState(null);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // OpenAI API key

  // Handle sending messages and interacting with AI
  const handleSend = async () => {
    if (input.trim() !== "") {
      // Check if the input contains keywords related to website creation
      if (
        input.toLowerCase().includes("website") ||
        input.toLowerCase().includes("navbar") ||
        input.toLowerCase().includes("make a site")
      ) {
        const disabledMessage = {
          sender: "bot",
          text: "Website creation and similar requests are temporarily disabled. Please try again later.",
        };
        setMessages([...messages, disabledMessage]);
        setInput(""); // Reset input field
        return; // Prevent further processing
      }

      const newMessage = { sender: "user", text: input };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInput("");

      if (activeChat) {
        setActiveChat((prev) => ({
          ...prev,
          history: [...prev.history, newMessage],
        }));
      }

      // Send the user's message to OpenAI API
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4",
            messages: [{ role: "user", content: input }],
          },
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        const botResponse = {
          sender: "bot",
          text: response.data.choices[0].message.content,
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]);

        if (activeChat) {
          setActiveChat((prev) => ({
            ...prev,
            history: [...prev.history, botResponse],
          }));
        }
      } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        alert("Failed to communicate with OpenAI. Check the console for more details.");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex justify-center items-center mt-16">
        <div className="w-[85%] h-[80vh] grid grid-cols-3 gap-8 p-6 bg-white shadow-lg rounded-lg">
          {/* Sidebar for Previous Chats */}
          <aside className="col-span-1 bg-gray-100 shadow-md rounded-lg flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center space-x-2 text-gray-800">
                <MdOutlineChatBubbleOutline size={24} />
                <span>Chats</span>
              </h2>
            </div>
            <ul className="flex-grow overflow-y-auto p-4 space-y-3">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <li key={index} className="flex items-center space-x-2 p-3 rounded-lg">
                    <span>{message.text}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No messages yet.</p>
              )}
            </ul>
          </aside>

          {/* Main Chat Area */}
          <div className="col-span-2 bg-white shadow-md rounded-lg flex flex-col">
            {/* Header */}
            <header className="bg-gray-100 py-4 px-6 flex justify-between items-center rounded-t-lg">
              <h1 className="text-xl font-bold text-gray-800">AI Chat</h1>
              <p className="text-gray-500 text-sm">Powered by OpenAI</p>
            </header>

            {/* Chat Area */}
            <div className="flex-grow p-6 overflow-y-auto max-h-[60vh]">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
                      Start a Conversation
                    </h2>
                    <p className="text-gray-500">
                      Ask anything, and our AI will assist you in creating your project.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`px-4 py-2 max-w-lg rounded-lg shadow-sm ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <footer className="bg-gray-100 py-4 px-6 flex items-center rounded-b-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}  // Handle Enter key press
                className="flex-grow bg-gray-200 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
              />
              <motion.button
                onClick={handleSend}
                className="ml-4 bg-blue-500 text-white rounded-full p-3 shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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

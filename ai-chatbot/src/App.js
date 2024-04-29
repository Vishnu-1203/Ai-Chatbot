import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display user message immediately (create a copy before updating)
    const updatedMessages = [...messages, { text: userInput, from: "user" }];
    setMessages(updatedMessages);
    setUserInput("");

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Display Gemini's response (update the messages again)
      setMessages([...updatedMessages, { text: data.message, from: "bot" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages([
        ...messages,
        { text: "Error communicating with the server.", from: "bot" },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Gemini Chatbot</div>
      <div className="chat-window">
        {" "}
        {/* Wrapper for messages */}
        <ul className="chat-messages">
          {messages.map((msg, index) => (
            <li key={index} className={`chat-message ${msg.from}`}>
              {msg.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;

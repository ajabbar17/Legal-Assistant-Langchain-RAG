"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./Typing";
import WelcomeMessage from "./Welcome";


export default function HomeComponent() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendToBackend = async (question) => {
    try {
      const response = await fetch("http://localhost:3004/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      return data.answer;
    } catch (error) {
      console.error("Error fetching from backend:", error);
      return "⚠️ Sorry, I couldn’t reach the server. Please try again later.";
    }
  };

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const response = await sendToBackend(content);

      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response, 
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExampleClick = (question) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
     
      {messages.length !== 0 && <ChatHeader />}

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
          <WelcomeMessage onExampleClick={handleExampleClick} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}

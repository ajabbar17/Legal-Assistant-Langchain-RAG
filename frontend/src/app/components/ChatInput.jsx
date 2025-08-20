"use client"; // Needed if you're using Next.js App Router (app/ directory)

import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="text-white p-4">
      <div className="max-w-4xl mx-auto flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about the Constitution of Pakistan..."
            className="w-full resize-none rounded-full border border-[#ffffff4e] focus:inset-shadow-sm focus:border-[#ffffffac] shadow-inner  px-4 py-3 pr-12  focus:outline-none  max-h-32 min-h-[48px]"
            rows={1}
            disabled={disabled}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="absolute right-2 bottom-4 p-2 rounded-md  text-white hover:bg-green-700  disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

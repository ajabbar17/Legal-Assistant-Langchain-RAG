"use client"; // Needed if you're using Next.js App Router (app/ directory)

import React from "react";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ message }) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex gap-3 p-4 ${
        message.isBot ? "bg-[#0F172A]" : "bg-[#17223c] rounded-lg"
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.isBot
              ? "bg-green-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {message.isBot ? <Bot size={16} /> : <User size={16} />}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {message.isBot ? "Constitution AI" : "You"}
          </span>
          <span className="text-xs text-white">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div className="prose prose-sm max-w-none">
          <p className="text-white leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client"; // required if you are using Next.js App Router (app/ directory)

import React from "react";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 p-4 text-white ">
      {/* Bot Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-600 text-white">
          <Bot size={16} />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold ">Constitution AI</span>
        </div>

        {/* Typing Animation */}
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="text-sm  ml-2">Thinking...</span>
        </div>
      </div>
    </div>
  );
}

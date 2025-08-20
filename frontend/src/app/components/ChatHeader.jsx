"use client"; // Required if you're using Next.js App Router (app/ directory)

import React from "react";
import { BookOpen, Flag } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="bg-[#0F172A] shadow-sm text-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
            <BookOpen className="text-white" size={20} />
          </div>

          {/* Title & Subtitle */}
          <div className="flex-1">
            
            <p className="text-sm ">
              Ask me anything about Pakistan&apos;s Constitution
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}

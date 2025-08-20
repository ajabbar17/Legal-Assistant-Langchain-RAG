"use client"; // add this if you are using Next.js App Router

import React from "react";
import { MessageSquare, Scale, Users, Shield, BookOpen } from "lucide-react";

export default function WelcomeMessage({ onExampleClick }) {
  const examples = [
    {
      icon: <Scale size={20} />,
      title: "Fundamental Rights",
      question:
        "What are the fundamental rights guaranteed by the Constitution of Pakistan?",
    },
    {
      icon: <Users size={20} />,
      title: "Government Structure",
      question:
        "How is the federal government structured according to the Constitution?",
    },
    {
      icon: <Shield size={20} />,
      title: "Islamic Provisions",
      question: "What are the Islamic provisions in Pakistan's Constitution?",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Constitutional Amendments",
      question: "How can the Constitution of Pakistan be amended?",
    },
  ];

  return (
    <div className="flex-1 flex items-center text-white justify-center p-8">
      <div className="text-center max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
            <BookOpen className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold  mb-2">
            Welcome to Constitution AI
          </h2>
          <p className="text-lg ">
            Your AI assistant for the Constitution of Pakistan. Ask me anything!
          </p>
        </div>

        {/* Example Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(example.question)}
              className="p-4 text-left border border-[#15203b] shadow-inner inset-shadow-sm hover:shadow-[#2c447a] hover:scale-105 shadow-[#1f3157] rounded-lg   transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-green-600 ">
                  {example.icon}
                </div>
                <h3 className="font-semibold ">{example.title}</h3>
              </div>
              <p className="text-sm ">{example.question}</p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-sm ">
          <p>Click on an example above or type your own question to get started.</p>
        </div>
      </div>
    </div>
  );
}

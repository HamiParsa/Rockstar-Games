"use client";

import React from "react";
import { FaQuestionCircle, FaEnvelope, FaTools, FaHeadset } from "react-icons/fa";

const SUPPORT_SECTIONS = [
  { icon: <FaQuestionCircle />, title: "FAQ", desc: "Frequently asked questions and guides." },
  { icon: <FaEnvelope />, title: "Contact Us", desc: "Send us a message and we'll reply fast." },
  { icon: <FaTools />, title: "Technical Support", desc: "Troubleshoot your issues with our help." },
  { icon: <FaHeadset />, title: "Live Chat", desc: "Chat with our support team in real-time." },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 relative overflow-hidden">
      {/* subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-black to-gray-900 opacity-30 pointer-events-none" />

      <h1 className="text-5xl font-extrabold text-center mb-12 text-orange-500 drop-shadow-lg">
        Rockstar Support
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SUPPORT_SECTIONS.map((section, i) => (
          <div
            key={i}
            className="relative group bg-black/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="text-orange-500 text-5xl mb-4">{section.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
            <p className="text-gray-300">{section.desc}</p>
            {/* hover overlay effect */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">Send Us a Message</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-xl bg-black/50 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-xl bg-black/50 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-4 rounded-xl bg-black/50 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
          />
          <button
            type="submit"
            className="bg-orange-500 text-black font-bold py-4 rounded-full hover:bg-orange-600 shadow-[0_10px_30px_rgba(255,115,0,0.25)] transition text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiRockstargames } from "react-icons/si";
import { FaShoppingCart, FaBars, FaTimes, FaHome, FaGamepad, FaStore, FaNewspaper, FaQuestionCircle } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Games", href: "/games", icon: <FaGamepad /> },
    { name: "Store", href: "/store", icon: <FaStore /> },
    { name: "News", href: "/news", icon: <FaNewspaper /> },
    { name: "Support", href: "/support", icon: <FaQuestionCircle /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-yellow-400 flex text-2xl font-extrabold tracking-wide">
            ROCKSTAR GAMES
            <SiRockstargames className="mt-1 ml-2 text-3xl" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-200 font-semibold">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-yellow-300 transition flex items-center gap-1">
              {link.icon} {link.name}
            </Link>
          ))}
        </div>

        {/* Cart + Sign in */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/cart">
            <FaShoppingCart className="text-gray-200 hover:text-yellow-300 transition cursor-pointer text-xl" />
          </Link>
          <button className="px-4 py-2 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/cart">
            <FaShoppingCart className="text-gray-200 hover:text-yellow-300 transition cursor-pointer text-xl" />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-200 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800">
          <div className="flex flex-col items-center gap-4 py-6 text-gray-200 font-semibold">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-yellow-300 transition text-lg flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.icon} {link.name}
              </Link>
            ))}
            <button className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

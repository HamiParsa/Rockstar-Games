"use client";
import React from "react";
import { FaTwitter, FaYoutube, FaDiscord, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/90 border-t border-gray-800 text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-bold">ROCKSTAR+</h4>
          <p className="text-sm text-gray-400 mt-2">Official fan hub — cinematic, bold, and built for fans.</p>
          <div className="flex items-center gap-4 mt-4">
            <Link href="#" className="hover:text-white"><FaTwitter /></Link>
            <Link href="#" className="hover:text-white"><FaYoutube /></Link>
            <Link href="#" className="hover:text-white"><FaDiscord /></Link>
            <Link href="#" className="hover:text-white"><FaInstagram /></Link>
          </div>
        </div>

        <div className="flex gap-12">
          <div>
            <h5 className="font-semibold mb-3">Company</h5>
            <ul className="text-sm space-y-2">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Press</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Support</h5>
            <ul className="text-sm space-y-2">
              <li><Link href="#" className="hover:text-white">Help</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
              <li><Link href="#" className="hover:text-white">Forums</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-3">Contact</h5>
          <p className="text-sm text-gray-400">support@rockstarplus.example</p>
          <p className="text-sm text-gray-400 mt-2">© 2025 Rockstar+ — Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}


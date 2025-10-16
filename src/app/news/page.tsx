"use client";

import React from "react";
import Image from "next/image";

type NewsItem = {
  id: number;
  title: string;
  date: string;
  description: string;
  img: string;
};

const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "GTA VI Official Trailer Released",
    date: "Oct 15, 2025",
    description: "Rockstar finally unveils the first trailer for GTA VI, promising a next-gen experience.",
    img: "https://wallpapercave.com/wp/wp13253984.jpg",
  },
  {
    id: 2,
    title: "RDR2 New DLC Announced",
    date: "Sep 28, 2025",
    description: "Explore new adventures in the Wild West with the upcoming DLC for RDR2.",
    img: "https://wallpapercave.com/wp/wp14149036.jpg",
  },
  {
    id: 3,
    title: "Bully Remastered Coming Soon",
    date: "Aug 10, 2025",
    description: "Classic school chaos gets a modern remake with enhanced graphics and features.",
    img: "https://wallpapercave.com/wp/wp10640445.jpg",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-orange-500 drop-shadow-lg">Rockstar News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NEWS.map((news) => (
          <div
            key={news.id}
            className="relative rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-80">
              <Image src={news.img} alt={news.title} fill className="object-cover" />
            </div>

            {/* Blur overlay box */}
            <div className="absolute bottom-0 w-full p-4 bg-black/50 backdrop-blur-md text-center">
              <h2 className="text-2xl font-bold text-orange-400 mb-1">{news.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{news.date}</p>
              <p className="text-gray-200 text-sm">{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

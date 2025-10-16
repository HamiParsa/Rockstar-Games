"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaSearch, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

const games = [
  {
    title: "GTA VI",
    src: "https://m.media-amazon.com/images/I/81K5GDW5X+L.jpg",
    description: "Next-gen chaos and epic story.",
    genre: "Action",
    trailer: "#",
  },
  {
    title: "RDR2",
    src: "https://m.media-amazon.com/images/I/71PrNDWXLIL._UF894,1000_QL80_.jpg",
    description: "Ride into the Wild West cinematic experience.",
    genre: "Adventure",
    trailer: "#",
  },
  {
    title: "GTA V",
    src: "https://m.media-amazon.com/images/I/51MFu2e82VL._UF894,1000_QL80_.jpg",
    description: "Los Santos madness in full glory.",
    genre: "Action",
    trailer: "#",
  },
  {
    title: "Bully",
    src: "https://m.media-amazon.com/images/I/714dm4p+XTL._UF894,1000_QL80_.jpg",
    description: "Classic school chaos and fun.",
    genre: "Adventure",
    trailer: "#",
  },
  {
    title: "L.A. Noire",
    src: "https://m.media-amazon.com/images/I/917ltc-LSuL.jpg",
    description: "Detective noir mystery.",
    genre: "Crime",
    trailer: "#",
  },
  {
    title: "Max Payne 3",
    src: "https://m.media-amazon.com/images/I/71NH3NlZIGL._UF1000,1000_QL80_.jpg",
    description: "Bullet time action thriller.",
    genre: "Action",
    trailer: "#",
  },
  {
    title: "RDR1",
    src: "https://m.media-amazon.com/images/I/81CYoE+346L._UF1000,1000_QL80_.jpg",
    description: "The classic western saga.",
    genre: "Adventure",
    trailer: "#",
  },
  {
    title: "Manhunt",
    src: "https://m.media-amazon.com/images/I/71UI+aruAlL._UF1000,1000_QL80_.jpg",
    description: "Stealth horror action.",
    genre: "Horror",
    trailer: "#",
  },
  {
    title: "GTA IV",
    src: "https://m.media-amazon.com/images/I/51yTRvGNYJL._UF894,1000_QL80_.jpg",
    description: "Liberty City chaos.",
    genre: "Action",
    trailer: "#",
  },
  {
    title: "RDR Online",
    src: "https://m.media-amazon.com/images/I/5194Qpv84kL._UF894,1000_QL80_.jpg",
    description: "Online western adventure.",
    genre: "Adventure",
    trailer: "#",
  },
];

export default function SexyGameGallery() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredGames = games.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || g.genre === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="relative bg-gradient-to-b from-black via-zinc-900 to-black text-white min-h-screen flex flex-col justify-start items-center overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.15),transparent_70%)]" />

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold mt-24 mb-10 z-10 text-center">
        Rockstar Universe
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 z-10">
        {/* Search box */}
        <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-full w-72 md:w-96 focus-within:ring-2 ring-orange-500 transition">
          <FaSearch className="text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white w-full placeholder-gray-500"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-full w-44">
          <FaFilter className="text-gray-400 text-lg" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-zinc-500 outline-none  w-full cursor-pointer"
          >
            <option value="All">All Genres</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>
      </div>

      {/* Games */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
        {filteredGames.map((game, i) => (
          <motion.div
            key={i}
            className="relative w-[280px] h-[420px] md:w-[320px] md:h-[480px] overflow-hidden shadow-[0_0_25px_rgba(255,140,0,0.4)] border border-gray-700 group"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src={game.src}
              alt={game.title}
              fill
              className="object-cover group-hover:opacity-80 transition-opacity duration-300"
              draggable={false}
            />

            {/* overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm p-4">
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-gray-300 text-sm mb-4">{game.description}</p>
              <a
                href={game.trailer}
                className="inline-flex items-center gap-2 bg-orange-500 text-black font-bold px-5 py-2 rounded-full hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
              >
                <FaPlay /> Play Trailer
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
  FaShareAlt,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";
import { JSX } from "react/jsx-runtime";

/* =========================
   Types & Data
   ========================= */

interface SliderItem {
  src: string;
  title: string;
  description: string;
  trailer?: string;
}

interface GameCard {
  src: string;
  title: string;
  description: string;
  trailer?: string;
}

interface NewsCard {
  src: string;
  title: string;
  date: string;
  link: string;
}

interface ProductCard {
  src: string;
  name: string;
  price: string;
  link: string;
}

/* demo data — replace with real content */
const sliderItems: SliderItem[] = [
  { src: "https://wallpapercave.com/wp/wp13881171.jpg", title: "GTA VI", description: "Next-gen chaos.", trailer: "#" },
  { src: "https://wallpapercave.com/wp/wp9567628.jpg", title: "RDR2", description: "Ride into the Wild West.", trailer: "#" },
  { src: "https://wallpapercave.com/wp/wp7571743.jpg", title: "GTA V", description: "Chaos in Los Santos.", trailer: "#" },
];

const games: GameCard[] = [
  { src: "https://wallpapercave.com/wp/wp14002513.jpg", title: "GTA VI", description: "Next-gen chaos.", trailer: "#" },
  { src: "https://wallpapercave.com/wp/wp12456571.jpg", title: "RDR2", description: "Wild West cinematic.", trailer: "#" },
  { src: "https://wallpapercave.com/wp/wp1809631.jpg", title: "GTA V", description: "Los Santos madness.", trailer: "#" },
  { src: "https://wallpapercave.com/wp/wp2375495.jpg", title: "San Andreas", description: "The classic era.", trailer: "#" },
];

const news: NewsCard[] = [
  { src: "https://wallpapercave.com/wp/wp13881268.jpg", title: "GTA VI Trailer Released", date: "Oct 15, 2025", link: "#" },
  { src: "https://wallpapercave.com/wp/wp13905226.jpg", title: "RDR2 Patch Notes Out", date: "Sep 30, 2025", link: "#" },
  { src: "https://wallpapercave.com/wp/wp8606736.jpg", title: "GTA V Anniversary Event", date: "Aug 20, 2025", link: "#" },
];

const products: ProductCard[] = [
  { src: "https://wallpapercave.com/wp/wp13271189.png", name: "GTA VI Collector's Edition", price: "$79.99", link: "#" },
  { src: "https://wallpapercave.com/wp/wp13905347.jpg", name: "RDR2 Special Edition", price: "$59.99", link: "#" },
  { src: "https://wallpapercave.com/wp/wp8606709.jpg", name: "GTA V Premium Pack", price: "$49.99", link: "#" },
];

/* =========================
   Snow types + generator
   ========================= */

interface Snowflake {
  x: number; // px
  y: number; // px
  size: number; // px
  speed: number; // px per tick
  drift: number; // horizontal drift per tick
  alpha: number; // opacity
}

const generateSnowflakes = (count: number): Snowflake[] => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 4 + 1.2,
    speed: Math.random() * 1.6 + 0.3,
    drift: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.6 + 0.15,
  }));
};

/* =========================
   Framer motion variants
   ========================= */

const sliderVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 320 : -320, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -320 : 320, opacity: 0, scale: 0.98 }),
};

const AUTO_SLIDE_MS = 9000;

/* =========================
   Component
   ========================= */

export default function Home(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [dir, setDir] = useState<number>(0);
  const [snow, setSnow] = useState<Snowflake[]>([]);

  // init snow
  useEffect(() => {
    setSnow(generateSnowflakes(160));
    // update on resize so snow covers viewport
    const onResize = () => setSnow(generateSnowflakes(120));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // animate snow
  useEffect(() => {
    const tickMs = 28;
    const id = setInterval(() => {
      setSnow(prev =>
        prev.map(s => {
          const nextY = s.y + s.speed;
          const nextX = (s.x + s.drift + window.innerWidth) % window.innerWidth;
          return {
            ...s,
            y: nextY > window.innerHeight + 30 ? -10 - Math.random() * 80 : nextY,
            x: nextX,
          };
        })
      );
    }, tickMs);
    return () => clearInterval(id);
  }, []);

  // auto slide
  useEffect(() => {
    const id = setInterval(() => changeSlide(1), AUTO_SLIDE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const changeSlide = (direction: number) => {
    setDir(direction);
    setIndex(prev => (prev + direction + sliderItems.length) % sliderItems.length);
  };

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -120) changeSlide(1);
    else if (info.offset.x > 120) changeSlide(-1);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* HERO */}
      <header className="relative h-screen w-full overflow-hidden pt-16"> {/* pt-16 to avoid navbar overlap */}
        {/* background dimmer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sliderItems[index].src}
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${sliderItems[index].src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.14 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>

        {/* cinematic overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

        {/* subtle vignetting & light streak */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[-10%] w-[120%] h-40 bg-gradient-to-r from-transparent via-yellow-600/6 to-transparent blur-[40px] opacity-30" />
        </div>

        {/* snow */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {snow.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: `rgba(255,255,255,${s.alpha})`,
                filter: "blur(0.7px)",
                transform: "translateZ(0)",
                pointerEvents: "none",
              }}
            />
          ))}
        </div>

        {/* slider card */}
        <div className="relative z-20 h-full flex items-center justify-center px-6">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              className="relative w-full max-w-[1100px] md:max-w-[1200px] rounded-3xl cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full h-[60vh] md:h-[72vh] rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
                <Image width={1000} height={1000} src={sliderItems[index].src} alt={sliderItems[index].title} className="w-full h-full object-cover" draggable={false} />

                {/* info overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-black/30 backdrop-blur-sm px-6 py-4 md:px-10 md:py-6 rounded-xl flex items-center gap-4 shadow-lg border border-yellow-500/10">
                      <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 leading-tight text-center drop-shadow-[0_8px_40px_rgba(255,204,0,0.12)]">
                        {sliderItems[index].title}
                      </h1>
                      <div className="hidden md:flex items-center gap-3">
                        <FaInfoCircle size={26} className="text-white opacity-90 hover:text-yellow-300 transition" />
                        <FaShareAlt size={26} className="text-white opacity-90 hover:text-yellow-300 transition" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm md:text-base text-gray-200 max-w-[65%]">{sliderItems[index].description}</p>
                    <div className="flex items-center gap-3">
                      <a
                        href={sliderItems[index].trailer ?? "#"}
                        className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-black font-bold rounded-full shadow-[0_8px_30px_rgba(255,140,0,0.12)] hover:bg-orange-600 transition"
                        aria-label="Play trailer"
                      >
                        <FaPlay /> Play
                      </a>
                      <button
                        onClick={() => changeSlide(1)}
                        className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-yellow-500 transition"
                        aria-label="Next slide"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* side nav */}
        <button aria-label="Prev" onClick={() => changeSlide(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-yellow-500 transition">
          <FaChevronLeft />
        </button>
        <button aria-label="Next" onClick={() => changeSlide(1)} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-yellow-500 transition">
          <FaChevronRight />
        </button>
      </header>

      {/* FEATURED GAMES */}
      <section className="relative z-10 py-20 px-6 md:px-16 bg-black/95">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((g, idx) => (
              <article key={idx} className="relative group rounded-2xl overflow-hidden border border-gray-700 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_50px_rgba(255,204,0,0.06)] transition-transform hover:scale-105">
                <div className="relative">
                  <Image width={1000} height={1000} src={g.src} alt={g.title} className="w-full h-52 object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 md:p-6 bg-black/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{g.title}</h3>
                    <div className="flex items-center gap-3 text-gray-200">
                      <FaInfoCircle className="hover:text-yellow-300 transition cursor-pointer" />
                      <FaShareAlt className="hover:text-yellow-300 transition cursor-pointer" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-2 min-h-[48px]">{g.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <a className="px-4 py-2 bg-orange-500 text-black rounded-full font-bold hover:bg-orange-600 transition" href={g.trailer ?? "#"}>
                      <FaPlay /> Play
                    </a>
                    <button className="text-sm text-gray-400 hover:text-white transition">More</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS & TRAILERS */}
      <section className="relative z-10 py-20 px-6 md:px-16 bg-black/95 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Latest News & Trailers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((n, i) => (
                <article key={i} className="flex gap-4 bg-black/60 p-4 rounded-lg border border-gray-700 hover:scale-[1.02] transition-transform">
                  <Image width={1000} height={1000} src={n.src} alt={n.title} className="w-32 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{n.title}</h3>
                    <p className="text-xs text-gray-400">{n.date}</p>
                    <a href={n.link} className="mt-2 inline-block text-sm text-yellow-300 hover:underline">Read</a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside>
            <h3 className="text-2xl font-bold mb-4">Spotlight</h3>
            <div className="bg-black/60 rounded-lg p-4 border border-gray-700">
              <h4 className="font-semibold">Trailer of the week</h4>
              <p className="text-sm text-gray-300 mt-2">Dont miss the cinematic trailer with enhanced HDR and soundtrack.</p>
              <a className="mt-4 inline-block px-4 py-2 bg-orange-500 text-black rounded-full font-bold hover:bg-orange-600 transition" href="#">
                <FaPlay /> Watch
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* STORE */}
      <section className="relative z-10 py-20 px-6 md:px-16 bg-black/95 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Rockstar Store</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div key={i} className="bg-black/60 p-4 rounded-lg border border-gray-700 hover:scale-105 transition-transform">
                <Image width={1000} height={1000} src={p.src} alt={p.name} className="w-full h-40 object-cover rounded-md" />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{p.name}</h4>
                    <p className="text-sm text-gray-400">{p.price}</p>
                  </div>
                  <a href={p.link} className="px-4 py-2 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition">
                    <FaShoppingCart /> Buy
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

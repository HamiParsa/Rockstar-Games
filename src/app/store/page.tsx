"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaCheck } from "react-icons/fa";

type Product = {
  id: number;
  src: string;
  name: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: 1, src: "https://wallpapercave.com/wp/wp13280799.jpg", name: "GTA VI Collector's Edition", price: 79.99 },
  { id: 2, src: "https://wallpapercave.com/wp/wp2205098.jpg", name: "RDR2 Special Edition", price: 59.99 },
  { id: 3, src: "https://wallpapercave.com/wp/wp8606709.jpg", name: "GTA V Premium Pack", price: 49.99 },
  { id: 4, src: "https://wallpapercave.com/wp/wp13979569.jpg", name: "Gta Sa", price: 39.99 },
];

export default function StorePage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // Hydration safe
  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem("cart");
    if (raw) {
      const saved = JSON.parse(raw) as Product[];
      setCart(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, mounted]);

  const addToCart = (product: Product) => {
    if (!cart.find((p) => p.id === product.id)) setCart([...cart, product]);
  };

  if (!mounted) return null; // avoid SSR mismatch

  return (
    <div className="min-h-screen bg-black mt-10 text-white relative overflow-hidden">
      <header className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-orange-500 drop-shadow-lg">Rockstar Store</h1>
        <p className="text-gray-300 mt-2">Add your favorite games to the cart</p>
      </header>

      <main className="px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((p) => {
          const inCart = !!cart.find((c) => c.id === p.id);
          return (
            <div key={p.id} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(255,115,0,0.25)] transition-all">
              <div className="w-full h-[360px] relative overflow-hidden">
                <Image src={p.src} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="text-gray-400 mt-1">{p.price.toLocaleString(undefined, { style: "currency", currency: "USD" })}</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => addToCart(p)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 font-semibold rounded-lg transition 
                      ${inCart ? "bg-emerald-500 text-black" : "bg-orange-500 text-black hover:bg-orange-600"}`}
                  >
                    {inCart ? <><FaCheck /> Added</> : <><FaShoppingCart /> Add to Cart</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

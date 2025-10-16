"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTrash, FaCreditCard, FaCheckCircle } from "react-icons/fa";

type Product = {
  id: number;
  src: string;
  name: string;
  price: number;
};

export default function CartPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);

  const removeItem = (id: number) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = () => {
    if (!items.length) return;
    setCheckoutSuccess(true);
    localStorage.removeItem("cart");
    setItems([]);
    setTimeout(() => setCheckoutSuccess(false), 4000);
  };

  const total = items.reduce((acc, it) => acc + it.price, 0).toFixed(2);

  return (
    <div className="relative min-h-screen bg-black text-white pt-24 px-4 md:px-16">
      {/* cinematic glow */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(255,115,0,0.2),transparent_60%)] blur-2xl pointer-events-none" />

      <main className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-orange-400 drop-shadow-[0_0_20px_rgba(255,115,0,0.3)]">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-400 mt-12 text-lg">
            Your cart is empty — add some epic items from the store.
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between bg-gray-900/70 p-3 rounded-lg border border-gray-800 shadow-sm hover:shadow-[0_0_15px_rgba(255,115,0,0.25)] transition"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={it.src}
                      alt={it.name}
                      width={60}
                      height={60}
                      className="object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg truncate max-w-xs">{it.name}</h3>
                      <p className="text-sm text-gray-300">${it.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-red-500 hover:text-red-400 p-2 rounded-md transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700 w-full md:w-auto flex flex-col md:flex-row items-center gap-4 justify-between">
                <span className="text-lg text-gray-300">Total:</span>
                <span className="text-2xl font-extrabold text-orange-400">${total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(255,115,0,0.3)] transition flex items-center gap-2"
              >
                <FaCreditCard /> Checkout
              </button>
            </div>
          </>
        )}
      </main>

      {/* checkout success modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-orange-500 shadow-[0_0_30px_rgba(255,115,0,0.45)] text-center max-w-sm">
            <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">
              Order Confirmed
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              Thanks — your order has been received and is being processed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

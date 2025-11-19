"use client";

import Link from "next/link";
import LandingBg from "@/assets/images/LandingPage-Bg.png";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${LandingBg.src})`,
          filter: "brightness(0.3) contrast(1.2)",
        }}
      />

      {/* Dark overlay with grid */}
      <div className="absolute inset-0 bg-black/70 elegant-grid" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
        <h1 className="text-5xl md:text-8xl font-light mb-8 leading-tight">
          <span className="block text-white font-bold tracking-tight">
            Discover the Soul
          </span>
          <span className="block text-white font-bold tracking-tight">
            of Indonesia
          </span>
          <br />
          <span className="elegant-text text-4xl md:text-6xl font-light">
            in Every Thread and Stone
          </span>
        </h1>

        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/tour"
            className="elegant-button px-8 py-4 rounded-full text-lg font-semibold shine-effect"
          >
            Explore Destinations
          </Link>
          <Link
            href="/studio"
            className="elegant-button-outline px-8 py-4 rounded-full text-lg font-medium"
          >
            Open AI Studio
          </Link>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 particle-bg" />

      {/* Subtle gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
    </section>
  );
}

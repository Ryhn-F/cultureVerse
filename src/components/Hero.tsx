"use client";

import Link from "next/link";
import LandingBg from '@/assets/images/LandingPage-Bg.png'

export default function Hero() {
  return (
    <section className=" min-h-screen flex items-center justify-center overflow-hidden bg-black/5 backdrop-brightness-50"
    style={{ backgroundImage: `url(${LandingBg.src})` }}>
    

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
        <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
          <span className=" text-white">
            Discover the Soul of Indonesia
          </span>
          <br />
          <span className="bg-linear-to-t from-[#bcbbbb] to-[#ffffff] bg-clip-text text-transparent font-bold">in Every Thread and Stone</span>
        </h1>
        
       

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/tour"
            className=" font-semibold border border-white/50 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md hover:text-white/50"
          >
            Explore Destinations
          </Link>
          <Link
            href="/studio"
            className="px-6 py-3 rounded-full bg-white text-black hover:text-black/50 font-medium border border-white/50 backdrop-blur-2xl"
          >
            Open AI Studio
          </Link>
        </div>
      </div>

      {/* Gradient overlay */}
      
      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-b from-[#000000]/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000000]/50 to-transparent"></div>
    </section>
  );
}


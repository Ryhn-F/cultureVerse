"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomepage ? scrolled ? "bg-[#FFFFFF] backdrop-blur-md shadow-md" :"bg-transparent" 
        
          : "bg-[#FFFFFF] backdrop-blur-md "
         
      }`}
    >
      <div className="max-w-7xl mx-auto  ">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={`text-2xl md:text-3xl font-display font-bold ${isHomepage ? scrolled ? "text-black" :"text-white" 
        
          : "text-black"
         }`}
          >
            CultureVerse
          </Link>

          <div className="hidden md:flex items-center space-x-3 rounded-full bg-white/20 px-2 py-2 backdrop-blur-2xl">
            <Link
              href="/"
              className={`transition-colors px-5 py-2 font-medium ${
                pathname === "/" 
                  ? "bg-white  text-black rounded-full  font-semibold" 
                  : "text-gray-800 hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tour"
              className={`transition-colors font-medium px-5 py-2 ${
                pathname.startsWith("/tour") 
                  ? " font-semibold text-black rounded-full  " 
                  :isHomepage  ? scrolled ? "text-gray-800 hover:text-black"  :"text-white/70 hover:text-white" : "text-gray-800 hover:text-black"
              }`}
            >
              Destinations
            </Link>
            <Link
              href="/studio"
              className={`transition-colors font px-5 py-2 font-medium ${
                pathname === "/studio" 
                  ? " font-semibold text-black rounded-full  " 
                  :isHomepage  ? scrolled ? "text-gray-800 hover:text-black":"text-white/70 hover:text-white" : "text-gray-800 hover:text-black"
              }`}
            >
              AI Studio
            </Link>
            <Link
              href="/about"
              className={`transition-colors font px-5 py-2 font-medium ${
                pathname === "/about" 
                  ? " font-semibold text-black rounded-full  " 
                  :isHomepage  ?   scrolled ? "text-gray-800 hover:text-black" : "text-white/70 hover:text-white" : "text-gray-800 hover:text-black"
              }`}
            >
              About
            </Link>
          </div>

          <div className="flex space-x-3">  
            <Link 
              href="/login"
          className={`px-6 py-3 rounded-full bg-white/20 ${isHomepage  ?   scrolled ? "text-gray-800 hover:text-black" : "text-white/70 hover:text-white" : "text-gray-800 hover:text-black"}  font-medium border border-white/50 backdrop-blur-2xl`}>
              Login
            </Link>
            <Link 
              href="/sign-up"
          className="px-6 py-3 rounded-full bg-white text-gray-800 hover:text-black font-medium border border-white/50 backdrop-blur-2xl">
              Sign Up
            </Link>

          </div>

        

          <div className="md:hidden">
            <button 
              className="text-[#065F46] hover:text-[#047857] transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


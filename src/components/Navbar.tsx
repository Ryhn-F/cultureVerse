"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark shadow-lg shadow-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-display font-bold relative group"
          >
            <span className="elegant-text">CultureVerse</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-gray-400 group-hover:w-full transition-all duration-300"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 glass-dark rounded-full px-3 py-2.5">
            <Link
              href="/"
              className={`relative px-6 py-2.5 font-medium transition-all duration-300 rounded-full ${
                pathname === "/"
                  ? "bg-white text-black shadow-lg shadow-white/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
              {pathname === "/" && (
                <span className="absolute inset-0 rounded-full bg-white opacity-20 blur-md"></span>
              )}
            </Link>
            <Link
              href="/tour"
              className={`relative px-6 py-2.5 font-medium transition-all duration-300 rounded-full ${
                pathname.startsWith("/tour")
                  ? "bg-white text-black shadow-lg shadow-white/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Destinations
              {pathname.startsWith("/tour") && (
                <span className="absolute inset-0 rounded-full bg-white opacity-20 blur-md"></span>
              )}
            </Link>
            <Link
              href="/studio"
              className={`relative px-6 py-2.5 font-medium transition-all duration-300 rounded-full ${
                pathname === "/studio"
                  ? "bg-white text-black shadow-lg shadow-white/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              AI Studio
              {pathname === "/studio" && (
                <span className="absolute inset-0 rounded-full bg-white opacity-20 blur-md"></span>
              )}
            </Link>
            <Link
              href="/about"
              className={`relative px-6 py-2.5 font-medium transition-all duration-300 rounded-full ${
                pathname === "/about"
                  ? "bg-white text-black shadow-lg shadow-white/30"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              About
              {pathname === "/about" && (
                <span className="absolute inset-0 rounded-full bg-white opacity-20 blur-md"></span>
              )}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full glass-dark border border-white/20 text-white font-medium hover:border-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="elegant-button px-6 py-2.5 rounded-full font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg glass-dark border border-white/20 text-white hover:border-white transition-all duration-300"
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

      {/* Decorative Line */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 elegant-divider"></div>
      )}
    </nav>
  );
}

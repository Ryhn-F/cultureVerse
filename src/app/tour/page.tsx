"use client";

import DestinationCard from "@/components/DestinationCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { DestinationCardProps } from "@/components/DestinationCard";

export default function TourPage() {
  const [destinations, setDestinations] = useState<DestinationCardProps[]>([]);

  const fetchDestinations = async () => {
    try {
      const res: AxiosResponse<DestinationCardProps[]> = await axios.get<
        DestinationCardProps[]
      >("api/destination-card");
      setDestinations(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <main className="min-h-screen pt-20 pb-20 bg-black elegant-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 pt-12 fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="elegant-text">Choose Your Destination</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Explore Indonesia&apos;s most iconic cultural and natural landmarks
            through immersive 360° virtual reality experiences
          </p>
          <div className="elegant-divider w-40 mx-auto"></div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              id={destination.id}
              name={destination.name}
              location={destination.location}
              description={destination.description}
              imageUrl={destination.imageUrl}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="glass-card p-8 md:p-12 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Click on any destination to enter immersive VR mode. Explore 360°
            panoramic views, click on interactive hotspots to learn about the
            history, legends, and cultural significance of each location.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="glass-dark px-6 py-3 rounded-full border border-white/20">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-white font-medium">
                  360° Panoramic Views
                </span>
              </div>
            </div>
            <div className="glass-dark px-6 py-3 rounded-full border border-white/20">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <span className="text-sm text-white font-medium">
                  Interactive Hotspots
                </span>
              </div>
            </div>
            <div className="glass-dark px-6 py-3 rounded-full border border-white/20">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-sm text-white font-medium">
                  Cultural Stories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

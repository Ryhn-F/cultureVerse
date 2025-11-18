"use client";

import Image from "next/image";
import Link from "next/link";

export interface DestinationCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
}


export default function DestinationCard({
  id,
  name,
  description,
  imageUrl,
  location,
}: DestinationCardProps) {
  return (
    <Link href={`/tour/${id}`}>
      <div className="group relative bg-[#F5F5DC] rounded-2xl overflow-hidden shadow-md gold-glow transform hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-[#EAB308]/10">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#065F46]/80 via-[#065F46]/30 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-display font-bold text-white mb-2">{name}</h3>
            <p className="text-white/90 text-sm">{location}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-[#065F46]/70 line-clamp-2">{description}</p>
          <div className="mt-4 flex items-center text-[#047857] font-semibold group-hover:text-[#EAB308] transition-colors">
            Explore in VR
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}


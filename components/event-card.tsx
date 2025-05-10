'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: {
    city: string;
    country: string;
  };
  imageUrl: string;
  distance: string;
  eventType: string;
  price: string;
  spotsLeft?: number;
  featured?: boolean;
}

export function EventCard({
  id,
  title,
  date,
  location,
  imageUrl,
  distance,
  eventType,
  price,
  spotsLeft,
  featured = false
}: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current && featured) {
      gsap.fromTo(
        cardRef.current,
        { 
          y: 30,
          opacity: 0 
        },
        { 
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, [featured]);
  
  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg shadow-lg bg-black transition-all duration-300 h-full
        ${featured ? 'border-2 border-blue-500 scale-105 hover:scale-107' : 'hover:scale-102 border border-gray-800'}
      `}
    >
      <div className="h-full flex flex-col">
        <Link href={`/events/${id}`} className="block no-underline">
          <div className="relative h-48">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={featured}
              loading={featured ? "eager" : "lazy"}
            />
            {featured && (
              <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
                Featured
              </div>
            )}
            {spotsLeft !== undefined && spotsLeft < 50 && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                {spotsLeft} spots left!
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
              <span className="text-blue-400 font-bold">{price}</span>
            </div>
            
            <div className="flex justify-between mb-3">
              <div className="text-sm text-gray-300">{date}</div>
              <div className="text-sm text-gray-300">{distance}</div>
            </div>
            
            <div className="flex items-center text-sm text-gray-400 gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location.city}, {location.country}</span>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center">
              <span className="inline-block bg-blue-900/50 text-blue-300 rounded px-2 py-1 text-xs">
                {eventType}
              </span>
              <span className="text-white text-sm font-medium">View Details →</span>
            </div>
          </div>
        </Link>
        
        <div className="px-4 pb-4 mt-auto">
          <Link 
            href={`/events/${id}/register`} 
            className="block w-full py-2 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-md transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
} 
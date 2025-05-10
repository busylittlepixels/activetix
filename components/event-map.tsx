'use client';

import { useEffect, useRef } from 'react';
import { PageContainer } from './page-container';
import Link from 'next/link';
import gsap from 'gsap';

interface EventLocation {
  city: string;
  country: string;
  coords: {
    lat: number;
    lng: number;
  };
  eventName: string;
  eventDate: string;
  id: string;
}

// Sample event locations with coordinates
const eventLocations: EventLocation[] = [
  {
    city: 'New York',
    country: 'United States',
    coords: { lat: 40.7128, lng: -74.0060 },
    eventName: 'NYC Marathon',
    eventDate: 'November 5, 2025',
    id: 'nyc-marathon-2023'
  },
  {
    city: 'London',
    country: 'United Kingdom',
    coords: { lat: 51.5074, lng: -0.1278 },
    eventName: 'London Half Marathon',
    eventDate: 'March 3, 2025',
    id: 'london-half-2023'
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    coords: { lat: 35.6762, lng: 139.6503 },
    eventName: 'Tokyo 10K Run',
    eventDate: 'May 21, 2025',
    id: 'tokyo-10k-2023'
  },
  {
    city: 'Berlin',
    country: 'Germany',
    coords: { lat: 52.5200, lng: 13.4050 },
    eventName: 'Berlin Marathon',
    eventDate: 'September 24, 2025',
    id: 'berlin-marathon-2023'
  },
  {
    city: 'Sydney',
    country: 'Australia',
    coords: { lat: -33.8688, lng: 151.2093 },
    eventName: 'Sydney Harbour 5K',
    eventDate: 'February 12, 2025',
    id: 'sydney-5k-2023'
  },
  {
    city: 'Paris',
    country: 'France',
    coords: { lat: 48.8566, lng: 2.3522 },
    eventName: 'Paris City Half Marathon',
    eventDate: 'October 8, 2025',
    id: 'paris-half-2023'
  },
  {
    city: 'Cape Town',
    country: 'South Africa',
    coords: { lat: -33.9249, lng: 18.4241 },
    eventName: 'Cape Town Ultra',
    eventDate: 'April 15, 2025',
    id: 'cape-town-ultra-2023'
  },
  {
    city: 'Rio de Janeiro',
    country: 'Brazil',
    coords: { lat: -22.9068, lng: -43.1729 },
    eventName: 'Rio Beach Run',
    eventDate: 'June 18, 2025',
    id: 'rio-beach-run-2023'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    coords: { lat: 1.3521, lng: 103.8198 },
    eventName: 'Singapore Night Marathon',
    eventDate: 'July 22, 2025',
    id: 'singapore-night-marathon-2023'
  },
  {
    city: 'Chicago',
    country: 'United States',
    coords: { lat: 41.8781, lng: -87.6298 },
    eventName: 'Chicago Marathon',
    eventDate: 'October 15, 2025',
    id: 'chicago-marathon-2023'
  },
  // New locations
  {
    city: 'Dublin',
    country: 'Ireland',
    coords: { lat: 53.3498, lng: -6.2603 },
    eventName: 'Dublin Marathon',
    eventDate: 'October 29, 2025',
    id: 'dublin-marathon-2023'
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    coords: { lat: 52.3676, lng: 4.9041 },
    eventName: 'Amsterdam City Run',
    eventDate: 'April 21, 2025',
    id: 'amsterdam-run-2023'
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    coords: { lat: 41.3851, lng: 2.1734 },
    eventName: 'Barcelona Half Marathon',
    eventDate: 'May 7, 2025',
    id: 'barcelona-half-2023'
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    coords: { lat: 38.7223, lng: -9.1393 },
    eventName: 'Lisbon Waterfront 10K',
    eventDate: 'June 11, 2025',
    id: 'lisbon-10k-2023'
  },
  {
    city: 'Split',
    country: 'Croatia',
    coords: { lat: 43.5081, lng: 16.4402 },
    eventName: 'Split Coastal Marathon',
    eventDate: 'July 9, 2025',
    id: 'split-marathon-2023'
  }
];

export function EventMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<HTMLDivElement[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initMap = () => {
      // Clear any previous markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      if (mapContainerRef.current) {
        // Animation for map appearance
        gsap.fromTo(
          mapContainerRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power3.out"
          }
        );
        
        // Define a mapping function for a standard equirectangular map projection
        const getMarkerPosition = (lat: number, lng: number) => {
          // For a standard world map with equirectangular projection:
          // Longitude: -180 to 180 degrees maps to 0-100% width
          // Latitude: 90 to -90 degrees maps to 0-100% height
          
          // Convert longitude from -180...180 to 0...100%
          const xPercent = ((lng + 180) / 360) * 100;
          
          // Convert latitude from 90...-90 to 0...100%
          const yPercent = ((90 - lat) / 180) * 100;
          
          return { x: xPercent, y: yPercent };
        };
        
        // Create markers for each location
        eventLocations.forEach((location, index) => {
          const marker = document.createElement('div');
          marker.className = 'absolute w-4 h-4 md:w-6 md:h-6 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform shadow-xl border-2 border-white z-10';
          
          // Get position using our mapping function
          const position = getMarkerPosition(location.coords.lat, location.coords.lng);
          
          // Set position as percentage (works better for responsive layouts)
          marker.style.left = `${position.x}%`;
          marker.style.top = `${position.y}%`;
          
          // Add custom marker label
          const label = document.createElement('div');
          label.className = 'absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs md:text-sm text-white whitespace-nowrap bg-black/80 px-2 py-0.5 rounded shadow-lg pointer-events-none z-20 font-medium';
          label.textContent = location.city;
          marker.appendChild(label);
          
          // Add pulse animation
          const pulse = document.createElement('div');
          pulse.className = 'absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping';
          marker.appendChild(pulse);
          
          // Add inner dot
          const innerDot = document.createElement('div');
          innerDot.className = 'absolute inset-[20%] bg-white rounded-full';
          marker.appendChild(innerDot);
          
          // Add event listeners for tooltip
          marker.addEventListener('mouseenter', (e) => {
            if (tooltipRef.current) {
              tooltipRef.current.innerHTML = `
                <div class="font-bold text-lg text-red-400">${location.eventName}</div>
                <div class="flex items-center gap-1 mt-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>${location.city}, ${location.country}</span>
                </div>
                <div class="flex items-center gap-1 mt-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-red-400">${location.eventDate}</span>
                </div>
                <div class="mt-2 pt-2 border-t border-gray-700">
                  <button 
                    onclick="window.location.href='/events/${location.id}'" 
                    class="text-sm text-red-400 hover:text-red-300 hover:underline inline-flex items-center cursor-pointer"
                  >
                    View Event Details
                    <svg class="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              `;
              
              tooltipRef.current.style.left = `${e.clientX + 10}px`;
              tooltipRef.current.style.top = `${e.clientY + 10}px`;
              tooltipRef.current.classList.remove('hidden');
              
              gsap.fromTo(
                tooltipRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.3 }
              );
            }
          });
          
          marker.addEventListener('mouseleave', () => {
            if (tooltipRef.current) {
              tooltipRef.current.classList.add('hidden');
            }
          });
          
          marker.addEventListener('click', () => {
            window.location.href = `/events/${location.id}`;
          });
          
          // Staggered animation for markers
          gsap.fromTo(
            marker,
            { 
              opacity: 0,
              scale: 0.5 
            },
            { 
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.1 * index,
              ease: "back.out"
            }
          );
          
          mapContainerRef.current?.appendChild(marker);
          markersRef.current.push(marker);
        });
      }
    };
    
    // Initialize map
    initMap();
    
    // Clean up function
    return () => {
      markersRef.current.forEach(marker => {
        marker.remove();
      });
    };
  }, []);
  
  return (
    <section className="w-full py-16 bg-background">
      <PageContainer>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Global Running Events Map
          </h2>
          <p className="text-lg text-white mt-3 max-w-3xl">
            Explore running events taking place around the world and find your next race destination
          </p>
        </div>
      </PageContainer>
        
      <div 
        ref={mapContainerRef}
        className="relative w-full aspect-[2/1] overflow-hidden bg-gray-900 shadow-xl"
      >
        {/* World map background - using a proper map image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png" 
            alt="World Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Tooltip */}
        <div 
          ref={tooltipRef}
          className="fixed z-50 hidden bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-lg shadow-xl border border-red-500/30 text-left max-w-[300px]"
        ></div>
      </div>
      
      <PageContainer>
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">Click on any marker to see race details</p>
          <Link 
            href="/events"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Race Locations
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
} 
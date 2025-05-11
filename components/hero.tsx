'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { countries, eventTypes, distances } from './featured-races';

interface HeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  backgroundType: 'image' | 'video';
  backgroundSrc: string;
}

export function Hero({
  badge = 'NEW AND IMPROVED',
  title,
  subtitle,
  primaryCta,
  backgroundType,
  backgroundSrc
}: HeroProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Search form state
  const [formData, setFormData] = useState({
    eventType: '',
    country: '',
    distance: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string from form data
    const queryParams = new URLSearchParams();
    if (formData.eventType) queryParams.append('eventType', formData.eventType);
    if (formData.country) queryParams.append('country', formData.country);
    if (formData.distance) queryParams.append('distance', formData.distance);
    
    // Navigate to search results page with query parameters
    router.push(`/events?${queryParams.toString()}`);
  };

  useEffect(() => {
    if (isLoaded) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Fade in the hero background
      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
      
      // Animate the badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
      
      // Animate the title
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );
      
      // Animate the subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
      
      // Animate the CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
      
      // Animate the search form
      tl.fromTo(
        searchFormRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
    }
  }, [isLoaded]);

  useEffect(() => {
    // Set loaded to true after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden pt-16 hero-section"
    >
      {/* Background media */}
      <div className="absolute inset-0 w-full h-full z-0">
        {backgroundType === 'image' ? (
          <Image
            src={backgroundSrc}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
            unoptimized={backgroundSrc.startsWith('http')}
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={backgroundSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {/* Overlay gradient with reduced intensity at the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black z-1"></div>
      </div>

      {/* Hero content - aligned left with reduced font sizes */}
      <div 
        ref={contentRef} 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* {badge && (
          <div 
            ref={badgeRef} 
            className="inline-block mb-5 px-3 py-1.5 bg-blue-600 rounded-full text-xs font-semibold tracking-wide"
          >
            {badge}
          </div>
        )} */}
        
        <h1 
          ref={titleRef}
          className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50 max-w-4xl"
        >
          {title}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl mb-8 max-w-2xl text-blue-100"
        >
          {subtitle}
        </p>
        
        {/* <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="btn bg-blue-600 max-w-1/2 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              {primaryCta.text}
            </Link>
          )}
        </div> */}
        
        {/* Search Form */}
        <form 
          ref={searchFormRef} 
          onSubmit={handleSubmit}
          className="mt-4 bg-black/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-800 max-w-3xl"
        >
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Event Type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <select
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Distance</option>
                {distances.map(distance => (
                  <option key={distance} value={distance}>{distance}</option>
                ))}
              </select>
            </div>
            
            <button 
              type="submit"
              className="flex-none bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

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
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    }
  }, [isLoaded]);

  useEffect(() => {
    // Set loaded to true after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden pt-16"
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
        {/* Enhanced overlay gradient that creates a seamless transition to the black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black z-1"></div>
      </div>

      {/* Hero content - aligned left with reduced font sizes */}
      <div 
        ref={contentRef} 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {badge && (
          <div 
            ref={badgeRef} 
            className="inline-block mb-5 px-3 py-1.5 bg-blue-600 rounded-full text-xs font-semibold tracking-wide"
          >
            {badge}
          </div>
        )}
        
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
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-start">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="btn bg-blue-600 max-w-1/2 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              {primaryCta.text}
            </Link>
          )}
          
        </div>
      </div>
    </div>
  );
} 
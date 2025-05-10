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
  secondaryCta?: {
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
  secondaryCta,
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
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
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
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-1"></div>
      </div>

      {/* Hero content */}
      <div 
        ref={contentRef} 
        className="relative z-10 px-6 py-12 max-w-7xl mx-auto text-center"
      >
        {badge && (
          <div 
            ref={badgeRef} 
            className="inline-block mb-6 px-4 py-2 bg-blue-600 rounded-full text-sm font-semibold tracking-wide"
          >
            {badge}
          </div>
        )}
        
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50"
        >
          {title}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
        >
          {subtitle}
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              {primaryCta.text}
            </Link>
          )}
          
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="btn btn-lg bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold transition-all"
            >
              {secondaryCta.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 
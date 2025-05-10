'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface CTASectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export function CTASection({ 
  title, 
  description, 
  ctaText, 
  ctaLink,
  className = '' 
}: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(
        contentRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className={`w-full py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={contentRef}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300">
            {title}
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mb-10 text-gray-300">
            {description}
          </p>
          <Link
            href={ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-md shadow-lg hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300"
          >
            {ctaText}
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 
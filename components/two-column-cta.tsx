'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

interface TwoColumnCTAProps {
  title: string;
  subtitle?: string;
  description: string;
  secondaryDescription?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  className?: string;
}

export function TwoColumnCTA({
  title,
  subtitle,
  description,
  secondaryDescription,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  reversed = false,
  className = ''
}: TwoColumnCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && textRef.current && imageRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
      
      const fromLeft = { x: -50, opacity: 0 };
      const fromRight = { x: 50, opacity: 0 };
      
      const textFrom = reversed ? fromRight : fromLeft;
      const imageFrom = reversed ? fromLeft : fromRight;
      
      tl.fromTo(
        textRef.current, 
        textFrom, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      ).fromTo(
        imageRef.current, 
        imageFrom, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
        '-=0.5'
      );
    }
  }, [reversed]);
  
  return (
    <section 
      ref={sectionRef} 
      className={`w-full py-16 md:py-24 bg-black ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          <div 
            ref={textRef} 
            className="flex-1 w-full md:w-auto"
          >
            {subtitle && (
              <p className="text-sm md:text-base uppercase tracking-wide text-blue-400 mb-2">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {title}
            </h2>
            <p className="text-lg md:text-xl mb-5 text-gray-300">
              {description}
            </p>
            {secondaryDescription && (
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                {secondaryDescription}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
              >
                {primaryCta.text}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-transparent border border-white/30 rounded-md hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                >
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>
          <div 
            ref={imageRef} 
            className="flex-1 w-full md:w-auto relative overflow-hidden rounded-lg shadow-xl"
          >
            <div className="aspect-video w-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

interface ImageItem {
  src: string;
  alt: string;
  link?: string;
  hoverText?: string;
}

interface ImageGridProps {
  images: ImageItem[];
  className?: string;
}

export function ImageGrid({ images, className = '' }: ImageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (gridRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(
        '.grid-image-item', 
        { opacity: 0, scale: 0.9 }, 
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }
  }, []);
  
  return (
    <div ref={gridRef} className={`w-full ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="grid-image-item relative aspect-square overflow-hidden group"
          >
            {image.link ? (
              <Link href={image.link} className="block w-full h-full">
                <ImageWithHoverEffect image={image} index={index} />
              </Link>
            ) : (
              <ImageWithHoverEffect image={image} index={index} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageWithHoverEffect({ image, index }: { image: ImageItem; index?: number }) {
  return (
    <>
      <Image 
        src={image.src} 
        alt={image.alt}
        fill
        priority={index !== undefined && index < 4}
        loading={index !== undefined && index < 8 ? "eager" : "lazy"}
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        style={{ objectFit: 'cover' }}
        className="transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
        {image.hoverText && (
          <span className="text-white font-medium text-center">{image.hoverText}</span>
        )}
      </div>
    </>
  );
} 
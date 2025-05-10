'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      console.info('View Transitions API is not supported in this browser.');
      return;
    }

    // Handle navigation state
    if (prevPathRef.current !== pathname) {
      setIsNavigating(false);
      prevPathRef.current = pathname;
    }

    // Add navigation handlers
    function handleLinkClick(e: MouseEvent) {
      // Only intercept links that should be handled by Next.js router
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');
      
      // Skip if the link:
      // - Has a target other than _self
      // - Is an external link
      // - Has a download attribute
      // - Uses a different protocol (mailto:, tel:, etc.)
      // - Has the data-no-transition attribute
      if (
        !href ||
        (target && target !== '_self') ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        link.hasAttribute('download') ||
        href.includes(':') ||
        link.hasAttribute('data-no-transition')
      ) {
        return;
      }
      
      // Prevent default navigation
      e.preventDefault();
      
      // Mark as navigating
      setIsNavigating(true);
      
      // Start view transition and navigate
      document.startViewTransition(() => {
        router.push(href);
      });
    }

    // Add event listener for link clicks
    document.addEventListener('click', handleLinkClick);

    // Clean up event listener
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, router]);

  return null;
} 
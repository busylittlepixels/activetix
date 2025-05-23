'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (footerRef.current) {
            gsap.fromTo(
                footerRef.current,
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%"
                    }
                }
            );
        }

        // Store the current refs value
        const currentLinkRefs = linkRefs.current;

        // Create named functions for the event listeners
        const handleMouseEnter = (link: HTMLElement) => {
            gsap.to(link, {
                y: -2,
                scale: 1.05,
                duration: 0.2,
                ease: 'power1.out'
            });
        };
        
        const handleMouseLeave = (link: HTMLElement) => {
            gsap.to(link, {
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: 'power1.out'
            });
        };

        // Add event listeners
        currentLinkRefs.forEach(link => {
            if (link) {
                link.addEventListener('mouseenter', () => handleMouseEnter(link));
                link.addEventListener('mouseleave', () => handleMouseLeave(link));
            }
        });

        // Clean up function
        return () => {
            currentLinkRefs.forEach(link => {
                if (link) {
                    link.removeEventListener('mouseenter', () => handleMouseEnter(link));
                    link.removeEventListener('mouseleave', () => handleMouseLeave(link));
                }
            });
        };
    }, []);

    const addToLinkRefs = (el: HTMLAnchorElement | null) => {
        if (el && !linkRefs.current.includes(el)) {
            linkRefs.current.push(el);
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-800 bg-black/70 pt-16 pb-8 backdrop-blur-sm site-footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-4 max-w-xs">
                        <h4 className="text-lg font-semibold text-white">
                            <span className="bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
                                Active<span className="text-white">Tix</span>
                            </span>
                        </h4>
                        <p className="text-sm text-gray-300">
                            Deploy modern web experiences with ActiveTix&apos;s powerful platform and Next.js, the React framework for production.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h5 className="text-white font-medium">Resources</h5>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        ref={addToLinkRefs}
                                        href="/documentation"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        ref={addToLinkRefs}
                                        href="/api"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        API Reference
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        ref={addToLinkRefs}
                                        href="/examples"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        Examples
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h5 className="text-white font-medium">Connect</h5>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        ref={addToLinkRefs}
                                        href="https://github.com/activetix"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        ref={addToLinkRefs}
                                        href="https://twitter.com/activetix"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Twitter
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        ref={addToLinkRefs}
                                        href="/contact"
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500">
                        © {currentYear} ActiveTix, Inc. Development by <a href="https://busylittlepixels.com" className="text-white hover:text-gray-300">busy<span className="text-red-500">little</span>pixels</a>. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <Link
                            ref={addToLinkRefs}
                            href="/privacy"
                            className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            ref={addToLinkRefs}
                            href="/terms"
                            className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

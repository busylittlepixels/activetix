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

        // Animate links on hover
        linkRefs.current.forEach(link => {
            if (link) {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        y: -2,
                        scale: 1.05,
                        duration: 0.2,
                        ease: 'power1.out'
                    });
                });
                
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        y: 0,
                        scale: 1,
                        duration: 0.2,
                        ease: 'power1.out'
                    });
                });
            }
        });

        return () => {
            linkRefs.current.forEach(link => {
                if (link) {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
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
        <footer ref={footerRef} className="mt-16 border-t border-blue-700 pt-16 pb-12 sm:pt-24 sm:pb-16">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4 max-w-xs">
                    <h4 className="text-lg font-semibold text-white">Netlify + Next.js</h4>
                    <p className="text-sm text-blue-200">
                        Deploy modern web projects with Netlify's all-in-one platform and Next.js, the React framework for production.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h5 className="text-white font-medium">Resources</h5>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    ref={addToLinkRefs}
                                    href="https://docs.netlify.com/frameworks/next-js/overview/"
                                    className="text-sm text-blue-300 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Next.js on Netlify
                                </Link>
                            </li>
                            <li>
                                <Link
                                    ref={addToLinkRefs}
                                    href="https://docs.netlify.com/configure-builds/common-configurations/"
                                    className="text-sm text-blue-300 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Build Configuration
                                </Link>
                            </li>
                            <li>
                                <Link
                                    ref={addToLinkRefs}
                                    href="https://docs.netlify.com/edge-functions/overview/"
                                    className="text-sm text-blue-300 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Edge Functions
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
                                    href="https://github.com/netlify-templates/next-platform-starter"
                                    className="text-sm text-blue-300 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub Repository
                                </Link>
                            </li>
                            <li>
                                <Link
                                    ref={addToLinkRefs}
                                    href="https://twitter.com/netlify"
                                    className="text-sm text-blue-300 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    ref={addToLinkRefs}
                                    href="https://www.netlify.com/contact/"
                                    className="text-sm text-blue-300 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-xs text-blue-400">
                    © {currentYear} Netlify, Inc. All rights reserved.
                </p>
                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <Link
                        ref={addToLinkRefs}
                        href="https://www.netlify.com/privacy/"
                        className="text-xs text-blue-400 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy
                    </Link>
                    <Link
                        ref={addToLinkRefs}
                        href="https://www.netlify.com/legal/terms-of-use/"
                        className="text-xs text-blue-400 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Terms
                    </Link>
                </div>
            </div>
        </footer>
    );
}

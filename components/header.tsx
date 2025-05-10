'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Revalidation', href: '/revalidation' },
    { linkText: 'Image CDN', href: '/image-cdn' },
    { linkText: 'Edge Function', href: '/edge' },
    { linkText: 'Blobs', href: '/blobs' },
    { linkText: 'Classics', href: '/classics' }
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Use useEffect only for window-based events
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Close mobile menu when window is resized to desktop size
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        // Initial check for scroll position
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Inject a class to the parent component when menu is open
    useEffect(() => {
        const htmlElement = document.documentElement;
        
        if (mobileMenuOpen) {
            htmlElement.classList.add('menu-open');
        } else {
            htmlElement.classList.remove('menu-open');
        }
        
        return () => {
            htmlElement.classList.remove('menu-open');
        };
    }, [mobileMenuOpen]);

    return (
        <header 
            className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? 'fixed bg-black/95 backdrop-blur-sm shadow-lg py-2' 
                    : 'bg-transparent py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex flex-wrap items-center justify-between">
                    <Link href="/" className="flex items-center no-underline">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">
                            Active<span className="text-white">Tix</span>
                        </span>
                    </Link>
                    
                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden flex items-center focus:outline-none"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <div className="relative w-6 h-5">
                            <span 
                                className={`absolute left-0 top-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                            ></span>
                            <span 
                                className={`absolute left-0 top-2 w-full h-0.5 bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                            ></span>
                            <span 
                                className={`absolute left-0 top-4 w-full h-0.5 bg-white transform transition-all duration-300 ${
                                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                            ></span>
                        </div>
                    </button>
                    
                    {/* Desktop menu */}
                    <div className="hidden lg:flex lg:items-center main-navigation">
                        {!!navItems?.length && (
                            <ul className="flex flex-wrap gap-x-4 gap-y-1 me-4">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link 
                                            href={item.href} 
                                            className={`inline-flex px-1.5 py-1 sm:px-3 sm:py-2 transition-all no-underline ${
                                                scrolled 
                                                    ? 'text-white hover:text-blue-300' 
                                                    : 'text-white/90 hover:text-white'
                                            }`}
                                        >
                                            {item.linkText}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all no-underline"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                    
                    {/* Mobile menu overlay */}
                    <div 
                        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
                            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>
                    
                    {/* Mobile menu panel */}
                    <div 
                        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-black z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="flex flex-col h-full p-6">
                            <div className="flex justify-end mb-8">
                                <button 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-white"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {!!navItems?.length && (
                                <ul className="flex flex-col space-y-4">
                                    {navItems.map((item, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={item.href} 
                                                className="text-lg text-white hover:text-blue-300 transition-colors block py-2 no-underline"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.linkText}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            <div className="mt-auto pt-6 border-t border-gray-800">
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/login"
                                        className="flex justify-center items-center py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors no-underline"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

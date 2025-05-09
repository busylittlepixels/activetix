'use client';

import Link from 'next/link';
import { Card } from 'components/card';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { RandomQuote } from 'components/random-quote';
import { getNetlifyContext } from 'utils';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as [Serverless Functions](https://docs.netlify.com/functions/overview/).
Alternatively, you can add Serverless Functions to any site regardless of framework, with acccess to the [full context data](https://docs.netlify.com/functions/api/).

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const ctx = getNetlifyContext();

// Client-side only component with animations
function AnimatedHomepage({ children }) {
    const heroRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const btnRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        // Hero animation
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.fromTo(heroRef.current, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.8 }
        );
        
        tl.fromTo(headingRef.current, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.6 }, 
            "-=0.4"
        );
        
        tl.fromTo(textRef.current, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.6 }, 
            "-=0.4"
        );
        
        tl.fromTo(btnRef.current, 
            { opacity: 0, scale: 0.9 }, 
            { opacity: 1, scale: 1, duration: 0.6 }, 
            "-=0.3"
        );

        // Sections animation (on scroll)
        const sections = sectionsRef.current;
        if (sections.length) {
            sections.forEach((section, i) => {
                gsap.fromTo(section, 
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }

        // Floating animation for cards
        gsap.to(".animated-card", {
            y: 15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
        });

        // Button hover effect
        const btn = btnRef.current;
        if (btn) {
            btn.addEventListener("mouseenter", () => {
                gsap.to(btn, { scale: 1.05, duration: 0.3 });
            });
            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, { scale: 1, duration: 0.3 });
            });
        }

        return () => {
            if (btn) {
                btn.removeEventListener("mouseenter", () => {});
                btn.removeEventListener("mouseleave", () => {});
            }
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section ref={heroRef} className="hero-section relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 p-8 shadow-lg">
                <div className="hero-content z-10">
                    <h1 ref={headingRef} className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="text-gradient">Netlify Platform Starter</span> - Next.js
                    </h1>
                    <p ref={textRef} className="mb-6 text-lg">Get started with Next.js and Netlify in seconds.</p>
                    <Link 
                        href="https://docs.netlify.com/frameworks/next-js/overview/" 
                        ref={btnRef}
                        className="btn btn-lg sm:min-w-64 bg-gradient-to-r from-cyan-400 to-teal-400 text-blue-900 hover:from-cyan-300 hover:to-teal-300 transition-all shadow-md"
                    >
                        Read the Docs
                    </Link>
                </div>
                <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-cyan-300 opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-blue-300 opacity-20 blur-3xl animate-pulse"></div>
            </section>
            
            {!!ctx && (
                <section ref={addToRefs} className="flex flex-col gap-4">
                    <ContextAlert className="mb-6" />
                    <Markdown content={contextExplainer} />
                    <RuntimeContextCard animated={true} />
                </section>
            )}
            
            <section ref={addToRefs} className="flex flex-col gap-4">
                <Markdown content={preDynamicContentExplainer} />
                <div className="animated-card">
                    <RandomQuote />
                </div>
                <Markdown content={postDynamicContentExplainer} />
            </section>

            <section ref={addToRefs} className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="feature-card animated-card bg-gradient-to-br from-blue-700 to-purple-700 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-3">Fast Development</h3>
                    <p>Build and preview your Next.js app locally, with hot reloading for instant feedback.</p>
                </div>
                <div className="feature-card animated-card bg-gradient-to-br from-cyan-700 to-teal-700 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-3">Instant Deployment</h3>
                    <p>Push to Git and let Netlify automatically build and deploy your site globally.</p>
                </div>
            </section>
        </div>
    );
}

export default function Page() {
    return <AnimatedHomepage />;
}

function RuntimeContextCard({ animated }) {
    const title = `Netlify Context: running in ${ctx} mode.`;
    const cardClass = animated ? "animated-card" : "";
    
    if (ctx === 'dev') {
        return (
            <Card title={title} className={cardClass}>
                <p>Next.js will rebuild any page you navigate to, including static pages.</p>
            </Card>
        );
    } else {
        return (
            <Card title={title} className={cardClass}>
                <p>This page was statically-generated at build time.</p>
            </Card>
        );
    }
}

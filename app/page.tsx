'use client';

import { useState, useEffect } from 'react';
import { Hero } from 'components/hero';
import { Card } from 'components/card';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { PageContainer } from 'components/page-container';
import { RandomQuote } from 'components/random-quote';
import { Footer } from 'components/footer';
import { getNetlifyContext } from 'utils';
import { TwoColumnCTA } from 'components/two-column-cta';
import { ImageGrid } from 'components/image-grid';
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

// Sample image data for the image grid
const gridImages = [
  { src: '/images/corgi.jpg', alt: 'Event 1', hoverText: 'Summer Concert', link: '/events/summer-concert' },
  { src: '/images/corgi.jpg', alt: 'Event 2', hoverText: 'Theatre Night', link: '/events/theatre-night' },
  { src: '/images/corgi.jpg', alt: 'Event 3', hoverText: 'Art Exhibition', link: '/events/art-exhibition' },
  { src: '/images/corgi.jpg', alt: 'Event 4', hoverText: 'Dance Festival', link: '/events/dance-festival' },
  { src: '/images/corgi.jpg', alt: 'Event 5', hoverText: 'Comedy Show', link: '/events/comedy-show' },
  { src: '/images/corgi.jpg', alt: 'Event 6', hoverText: 'Film Premiere', link: '/events/film-premiere' },
  { src: '/images/corgi.jpg', alt: 'Event 7', hoverText: 'Music Festival', link: '/events/music-festival' },
  { src: '/images/corgi.jpg', alt: 'Event 8', hoverText: 'Sports Game', link: '/events/sports-game' },
  { src: '/images/corgi.jpg', alt: 'Event 9', hoverText: 'Food Fair', link: '/events/food-fair' },
  { src: '/images/corgi.jpg', alt: 'Event 10', hoverText: 'Tech Conference', link: '/events/tech-conference' },
  { src: '/images/corgi.jpg', alt: 'Event 11', hoverText: 'Business Summit', link: '/events/business-summit' },
  { src: '/images/corgi.jpg', alt: 'Event 12', hoverText: 'Charity Gala', link: '/events/charity-gala' },
];

export default function Page() {
  const [sectionsLoaded, setSectionsLoaded] = useState(false);
  
  useEffect(() => {
    setSectionsLoaded(true);
    
    // Animation for the sections
    if (sectionsLoaded) {
      // Floating animation for cards
      gsap.to(".animated-card", {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
      
      // Scroll animations
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
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
  }, [sectionsLoaded]);

  return (
    <div className="flex flex-col w-full">
      {/* Full-width hero section */}
      <Hero
        badge="NEXT.JS + ACTIVETIX"
        title="Build Modern Web Experiences"
        subtitle="Deploy powerful full-stack applications with advanced features like Edge Functions, Serverless Functions, and more."
        primaryCta={{
          text: "Get Started",
          href: "/documentation"
        }}
        secondaryCta={{
          text: "View Examples",
          href: "/examples"
        }}
        backgroundType="image"
        backgroundSrc="/images/corgi.jpg"
      />
      
      {/* Two-column CTA section */}
      <TwoColumnCTA 
        title="Discover Amazing Events"
        subtitle="EXCLUSIVE EXPERIENCES"
        description="ActiveTix helps you discover and book tickets for the most exclusive events. From concerts to sports games, theater performances to art exhibitions, we've got you covered."
        primaryCta={{
          text: "Browse Events",
          href: "/events"
        }}
        secondaryCta={{
          text: "How It Works",
          href: "/how-it-works"
        }}
        imageSrc="/images/corgi.jpg"
        imageAlt="Concert audience with lights"
      />
      
      {/* Context section with full-width background and constrained content */}
      {!!ctx && (
        <section className="w-full py-16 bg-black">
          <PageContainer>
            <div className="animate-on-scroll">
              <ContextAlert className="mb-6" />
              <Markdown content={contextExplainer} className="" />
              <RuntimeContextCard animated={true} />
            </div>
          </PageContainer>
        </section>
      )}
      
      {/* Random quote section with full-width background and constrained content */}
      <section className="w-full py-16 bg-gray-900">
        <PageContainer>
          <div className="animate-on-scroll">
            <Markdown content={preDynamicContentExplainer} className="" />
            <div className="animated-card">
              <RandomQuote />
            </div>
            <Markdown content={postDynamicContentExplainer} className="" />
          </div>
        </PageContainer>
      </section>

      {/* Features section with full-width background and constrained content */}
      <section className="w-full py-16 bg-black">
        <PageContainer>
          <div className="animate-on-scroll feature-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="feature-card animated-card bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">Fast Development</h3>
              <p>Build and preview your Next.js app locally, with hot reloading for instant feedback.</p>
            </div>
            <div className="feature-card animated-card bg-gradient-to-br from-cyan-600 to-teal-600 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">Instant Deployment</h3>
              <p>Push to Git and let ActiveTix automatically build and deploy your site globally.</p>
            </div>
          </div>
        </PageContainer>
      </section>
      
      {/* Full-width image grid */}
      <section className="w-full">
        <h2 className="text-center text-3xl font-bold my-12">Explore Our Events</h2>
        <ImageGrid images={gridImages} />
      </section>
    </div>
  );
}

interface RuntimeContextCardProps {
  animated?: boolean;
}

function RuntimeContextCard({ animated }: RuntimeContextCardProps) {
  const title = `ActiveTix Context: running in ${ctx} mode.`;
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

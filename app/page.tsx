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

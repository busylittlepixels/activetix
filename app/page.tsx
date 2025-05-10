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
import { FeaturedRaces } from 'components/featured-races';
import { EventMap } from 'components/event-map';
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

// Sample image data for the image grid with running/marathon images
const gridImages = [
  { 
    src: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop', 
    alt: 'Marathon runners crossing finish line', 
    hoverText: 'NYC Marathon', 
    link: '/events/nyc-marathon' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1596727362302-b8d891c22e52?q=80&w=800&auto=format&fit=crop', 
    alt: 'Runners on mountain trail', 
    hoverText: 'Trail Running Series', 
    link: '/events/trail-series' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop', 
    alt: 'Runner silhouette at sunset', 
    hoverText: 'Sunset Half Marathon', 
    link: '/events/sunset-half' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800&auto=format&fit=crop', 
    alt: 'Group of runners at starting line', 
    hoverText: 'Spring 10K Challenge', 
    link: '/events/spring-10k' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop', 
    alt: 'Trail runner jumping over rocks', 
    hoverText: 'Mountain Ultra Marathon', 
    link: '/events/mountain-ultra' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=800&auto=format&fit=crop', 
    alt: 'Cross country runner in autumn forest', 
    hoverText: 'Fall Cross Country', 
    link: '/events/fall-xc' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop', 
    alt: 'Runner with race number', 
    hoverText: 'Boston Marathon', 
    link: '/events/boston-marathon' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=800&auto=format&fit=crop', 
    alt: 'Marathon participants on city street', 
    hoverText: 'Urban Marathon', 
    link: '/events/urban-marathon' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop', 
    alt: 'Athletes at starting line of track race', 
    hoverText: 'Track & Field Championship', 
    link: '/events/track-field' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=800&auto=format&fit=crop', 
    alt: 'Runners in colorful mud race', 
    hoverText: 'Color Run Challenge', 
    link: '/events/color-run' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1530143584546-02191bc84eb5?q=80&w=800&auto=format&fit=crop', 
    alt: 'Obstacle course race participants', 
    hoverText: 'Obstacle Race', 
    link: '/events/obstacle-race' 
  },
  { 
    src: 'https://images.unsplash.com/photo-1585341840941-98553e474d84?q=80&w=800&auto=format&fit=crop', 
    alt: 'Triathlon participants running segment', 
    hoverText: 'Ironman Triathlon', 
    link: '/events/ironman' 
  },
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
        badge="Get Set"
        title="Your Next Race Awaits"
        subtitle="Discover and register for the world's best marathons, trail runs, and Events. Join thousands of passionate runners worldwide."
        primaryCta={{
          text: "Find Events",
          href: "/events"
        }}
        backgroundType="image"
        backgroundSrc="/images/events/boston-marathon.jpg"
      />
      
      {/* Two-column CTA section */}
      <TwoColumnCTA 
        title="Discover Amazing Events"
        subtitle="EXCLUSIVE EXPERIENCES"
        description="ActiveTix helps you discover and book tickets for the most exclusive events. From marathons to trail runs, obstacle courses to triathlons, we've got you covered."
        secondaryDescription="Our platform connects race organizers with passionate runners worldwide. Whether you're a first-time 5K participant or an elite marathon runner, we provide seamless registration, real-time tracking, and exclusive race-day perks for an unmatched experience."
        primaryCta={{
          text: "Browse Events",
          href: "/events"
        }}
        secondaryCta={{
          text: "How It Works",
          href: "/how-it-works"
        }}
        imageSrc="https://images.unsplash.com/photo-1517931524326-bdd55a541177?q=80&w=1200&auto=format&fit=crop"
        imageAlt="Marathon runners with crowd cheering"
        className="pt-8 md:pt-12 pb-32"
      />
      
      {/* Context section with full-width background and constrained content */}
      {!!ctx && (
        <section className="w-full pb-16 bg-black">
          <PageContainer>
            <div className="animate-on-scroll">
              <ContextAlert className="mb-6" />
              <Markdown content={contextExplainer} className="" />
              <RuntimeContextCard animated={true} />
            </div>
          </PageContainer>
        </section>
      )}
      
      

      {/* Featured Races section */}
      <FeaturedRaces />

      {/* Full-width image grid */}
      <section className="w-full mt-32">
        <ImageGrid images={gridImages} />
      </section>

      {/* World Map Event Locations */}
      <EventMap />

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

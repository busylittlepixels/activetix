'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InnerPageLayout } from '../../components/inner-page-layout';
import { PageContainer } from '../../components/page-container';
import { Hero } from '../../components/hero';
import { TwoColumnCTA } from '../../components/two-column-cta';
import { ImageGrid } from '../../components/image-grid';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Organizer benefits images for the grid
const organizerImages = [
  { 
    src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop', 
    alt: 'Race organizers setting up start line', 
    hoverText: 'Seamless Registration', 
  },
  { 
    src: '/images/events/boston-marathon.jpg', 
    alt: 'Tablet with event management dashboard', 
    hoverText: 'Real-time Data', 
  },
  { 
    src: 'https://images.unsplash.com/photo-1551590192-8070a16d9f67?q=80&w=800&auto=format&fit=crop', 
    alt: 'Race organizers with digital check-in', 
    hoverText: 'Digital Check-in', 
  },
  { 
    src: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop', 
    alt: 'Team of race volunteers', 
    hoverText: 'Staff Management', 
  },
  { 
    src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop', 
    alt: 'Marketing materials for running event', 
    hoverText: 'Marketing Tools', 
  },
  { 
    src: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop', 
    alt: 'Runner receiving medal', 
    hoverText: 'Participant Experience', 
  },
  { 
    src: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=800&auto=format&fit=crop', 
    alt: 'Digital timer at running event', 
    hoverText: 'Timing Integration', 
  },
  { 
    src: 'https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=800&auto=format&fit=crop', 
    alt: 'Person analyzing race analytics', 
    hoverText: 'Advanced Analytics', 
  },
];

// Stats data
const statsItems = [
  { value: '95%', label: 'Customer Satisfaction', description: 'Event organizers who recommend our platform' },
  { value: '35%', label: 'Registration Increase', description: 'Average growth in event registrations' },
  { value: '4.2M', label: 'Participants', description: 'Athletes registered through our system' },
  { value: '60+', label: 'Countries', description: 'Global presence across continents' },
];

export default function OrganizersPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect for the middle section
    if (parallaxRef.current) {
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
    
    // Animation for stats counters
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      
      gsap.from(statItems, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }, []);

  return (
    <>
      <Hero
        badge="FOR ORGANIZERS"
        title="Power Your Events with ActiveTix"
        subtitle="Our comprehensive platform streamlines event management, boosts registrations, and enhances participant experience."
        primaryCta={{
          text: "Get Started",
          href: "/organizers/signup"
        }}
        backgroundType="video"
        backgroundSrc="/videos/ActiveTixOrganizers.mp4"
      />
      
      <PageContainer>
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50">
              From Setup to Success
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              ActiveTix provides everything you need to create, manage, and grow successful running events of any size.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative group bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10">
              <div className="absolute -top-6 left-6 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-3 text-white group-hover:text-blue-400 transition-colors">Easy Setup</h3>
              <p className="text-gray-300">
                Create an event in minutes with customizable registration forms, dynamic pricing tiers, and automatic confirmation emails.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="relative group bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10">
              <div className="absolute -top-6 left-6 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-3 text-white group-hover:text-blue-400 transition-colors">Seamless Operations</h3>
              <p className="text-gray-300">
                Manage check-ins, real-time race tracking, results processing, and staff coordination from a unified dashboard.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="relative group bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10">
              <div className="absolute -top-6 left-6 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4 mb-3 text-white group-hover:text-blue-400 transition-colors">Growth Tools</h3>
              <p className="text-gray-300">
                Boost registrations with built-in marketing tools, social sharing, early-bird discounts, and detailed analytics.
              </p>
            </div>
          </div>
        </section>
      </PageContainer>
      
      {/* Parallax Section */}
      <div ref={parallaxRef} className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="parallax-bg absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?q=80&w=2000&auto=format&fit=crop"
            alt="Race organizers preparing for an event"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white max-w-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Elevate </span> 
            Your Running Event Experience
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
            Join thousands of successful event organizers who trust ActiveTix
          </p>
          <Link 
            href="/organizers/demo"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-900/20"
          >
            Request a Demo
          </Link>
        </div>
      </div>
      
      {/* Stats Section */}
      <div ref={statsRef} className="bg-black py-20">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsItems.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-3">{stat.value}</div>
                <h3 className="text-xl text-white font-semibold mb-2">{stat.label}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
      
      {/* Features Grid */}
      <TwoColumnCTA 
        title="Powerful Platform for Event Organizers"
        subtitle="ALL-IN-ONE SOLUTION"
        description="ActiveTix streamlines every aspect of running event organization, from registration and payment processing to participant communication and results management."
        secondaryDescription="Our intuitive tools integrate with your existing systems, offering a seamless experience that saves time, reduces costs, and helps you create unforgettable events."
        primaryCta={{
          text: "See Features",
          href: "/organizers/features"
        }}
        secondaryCta={{
          text: "Pricing",
          href: "/organizers/pricing"
        }}
        imageSrc="/images/events/boston-marathon.jpg"
        imageAlt="Event management dashboard on tablet"
        className="pt-20 pb-20"
      />
      
      {/* Image Grid */}
      <section className="w-full">
        {/* <div className="text-center mb-12 pt-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-50">
              Everything You Need for Success
            </span>
          </h2>
        </div> */}
        <ImageGrid images={organizerImages} />
      </section>
      
      {/* Final CTA */}
      <section className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 py-20">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Events?</h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of race organizers who have simplified their workflow and grown their events with ActiveTix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/organizers/signup"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </Link>
              <Link
                href="/organizers/contact"
                className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
} 
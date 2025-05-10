'use client';

import { useState, useEffect, useRef } from 'react';
import { EventCard, EventCardProps } from './event-card';
import { RaceSearch } from './race-search';
import { PageContainer } from './page-container';
import Link from 'next/link';
import gsap from 'gsap';

// Mock data
export const eventTypes = [
  'Marathon', 'Half Marathon', 'Ultra Marathon', 'Trail Running', 
  '10K', '5K', 'Triathlon', 'Obstacle Course'
];

export const distances = [
  '5K', '10K', '15K', '21.1K (Half Marathon)', 
  '42.2K (Marathon)', '50K', '100K', 'Other'
];

export const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia',
  'France', 'Germany', 'Spain', 'Italy', 'Japan', 'Ireland', 
  'Netherlands', 'Portugal', 'Croatia'
];

export const cities = [
  'New York', 'London', 'Boston', 'Chicago', 'Berlin',
  'Tokyo', 'Paris', 'Sydney', 'Toronto', 'San Francisco',
  'Dublin', 'Amsterdam', 'Barcelona', 'Lisbon', 'Split'
];

// Sample race events data
export const raceEvents: EventCardProps[] = [
  {
    id: 'nyc-marathon-2025',
    title: 'New York City Marathon',
    date: 'November 2, 2025',
    location: { city: 'New York', country: 'United States' },
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop',
    distance: '42.2K',
    eventType: 'Marathon',
    price: '€299',
    spotsLeft: 32,
    featured: true
  },
  {
    id: 'boston-marathon-2025',
    title: 'Boston Marathon',
    date: 'April 21, 2025',
    location: { city: 'Boston', country: 'United States' },
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop',
    distance: '42.2K',
    eventType: 'Marathon',
    price: '€249',
    featured: true
  },
  {
    id: 'dublin-marathon-2025',
    title: 'Dublin Marathon',
    date: 'October 26, 2025',
    location: { city: 'Dublin', country: 'Ireland' },
    imageUrl: 'https://images.unsplash.com/photo-1565994000336-b7ca4e528648?q=80&w=800&auto=format&fit=crop',
    distance: '42.2K',
    eventType: 'Marathon',
    price: '€90',
    spotsLeft: 28,
    featured: true
  },
  {
    id: 'amsterdam-run-2025',
    title: 'Amsterdam City Run',
    date: 'April 13, 2025',
    location: { city: 'Amsterdam', country: 'Netherlands' },
    imageUrl: 'https://images.unsplash.com/photo-1579337152636-883731501056?q=80&w=800&auto=format&fit=crop',
    distance: '15K',
    eventType: '15K',
    price: '€60',
    featured: false
  },
  {
    id: 'barcelona-half-2025',
    title: 'Barcelona Half Marathon',
    date: 'May 11, 2025',
    location: { city: 'Barcelona', country: 'Spain' },
    imageUrl: 'https://images.unsplash.com/photo-1582996091906-a2aea9c56f6e?q=80&w=800&auto=format&fit=crop',
    distance: '21.1K',
    eventType: 'Half Marathon',
    price: '€75',
    spotsLeft: 45
  },
  {
    id: 'lisbon-10k-2025',
    title: 'Lisbon Waterfront 10K',
    date: 'June 8, 2025',
    location: { city: 'Lisbon', country: 'Portugal' },
    imageUrl: 'https://images.unsplash.com/photo-1550101872-a1ca53d16c79?q=80&w=800&auto=format&fit=crop',
    distance: '10K',
    eventType: '10K',
    price: '€50'
  },
  {
    id: 'split-marathon-2025',
    title: 'Split Coastal Marathon',
    date: 'July 13, 2025',
    location: { city: 'Split', country: 'Croatia' },
    imageUrl: 'https://images.unsplash.com/photo-1587047255710-e9f895bc6482?q=80&w=800&auto=format&fit=crop',
    distance: '42.2K',
    eventType: 'Marathon',
    price: '€85',
    spotsLeft: 22
  },
  {
    id: 'london-half-2025',
    title: 'London Half Marathon',
    date: 'March 9, 2025',
    location: { city: 'London', country: 'United Kingdom' },
    imageUrl: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800&auto=format&fit=crop',
    distance: '21.1K',
    eventType: 'Half Marathon',
    price: '€89',
    spotsLeft: 15
  },
  {
    id: 'trail-challenge-2025',
    title: 'Mountain Trail Challenge',
    date: 'June 14, 2025',
    location: { city: 'Denver', country: 'United States' },
    imageUrl: 'https://images.unsplash.com/photo-1596727362302-b8d891c22e52?q=80&w=800&auto=format&fit=crop',
    distance: '50K',
    eventType: 'Trail Running',
    price: '€129'
  },
  {
    id: 'berlin-marathon-2025',
    title: 'Berlin Marathon',
    date: 'September 28, 2025',
    location: { city: 'Berlin', country: 'Germany' },
    imageUrl: 'https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=800&auto=format&fit=crop',
    distance: '42.2K',
    eventType: 'Marathon',
    price: '€199',
    spotsLeft: 42
  },
  {
    id: 'tokyo-10k-2025',
    title: 'Tokyo 10K Run',
    date: 'May 18, 2025',
    location: { city: 'Tokyo', country: 'Japan' },
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop',
    distance: '10K',
    eventType: '10K',
    price: '€69'
  },
  {
    id: 'paris-half-2025',
    title: 'Paris City Half Marathon',
    date: 'October 5, 2025',
    location: { city: 'Paris', country: 'France' },
    imageUrl: 'https://images.unsplash.com/photo-1530143584546-02191bc84eb5?q=80&w=800&auto=format&fit=crop',
    distance: '21.1K',
    eventType: 'Half Marathon',
    price: '€99'
  },
  {
    id: 'sydney-5k-2025',
    title: 'Sydney Harbour 5K',
    date: 'February 16, 2025',
    location: { city: 'Sydney', country: 'Australia' },
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
    distance: '5K',
    eventType: '5K',
    price: '€49'
  }
];

export function FeaturedRaces() {
  const [displayedEvents, setDisplayedEvents] = useState<EventCardProps[]>(raceEvents);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });
      
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);
  
  const handleSearch = (filters: any) => {
    let filteredEvents = [...raceEvents];
    
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(keyword) ||
        event.location.city.toLowerCase().includes(keyword) ||
        event.location.country.toLowerCase().includes(keyword) ||
        event.eventType.toLowerCase().includes(keyword)
      );
    }
    
    if (filters.country) {
      filteredEvents = filteredEvents.filter(event => 
        event.location.country === filters.country
      );
    }
    
    if (filters.city) {
      filteredEvents = filteredEvents.filter(event => 
        event.location.city === filters.city
      );
    }
    
    if (filters.eventType) {
      filteredEvents = filteredEvents.filter(event => 
        event.eventType === filters.eventType
      );
    }
    
    if (filters.distance) {
      filteredEvents = filteredEvents.filter(event => 
        event.distance === filters.distance
      );
    }
    
    setDisplayedEvents(filteredEvents);
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-background from-gray-900 to-black"
    >
      <PageContainer>
        <div className="mb-12 text-left">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-white"
          >
            Featured Running Events
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl text-left">
            Discover and register for the world&apos;s best marathons, trail runs, and races
          </p>
        </div>
        
        <div className="mb-10">
          <RaceSearch
            onSearch={handleSearch}
            countries={countries}
            cities={cities}
            eventTypes={eventTypes}
            distances={distances}
          />
        </div>
        
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link 
            href="/events"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Events
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
} 
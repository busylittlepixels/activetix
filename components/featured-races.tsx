'use client';

import { useState, useEffect, useRef } from 'react';
import { EventCard, EventCardProps } from './event-card';
import { RaceSearch } from './race-search';
import { PageContainer } from './page-container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    imageUrl: '/images/events/nyc-marathon.jpg',
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
    imageUrl: '/images/events/boston-marathon.jpg',
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
    imageUrl: '/images/events/dublin-marathon.jpg',
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
    imageUrl: '/images/events/amsterdam-run.jpg',
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
    imageUrl: '/images/events/barcelona-half.jpg',
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
    imageUrl: '/images/events/lisbon-10k.jpg',
    distance: '10K',
    eventType: '10K',
    price: '€50'
  },
  {
    id: 'split-marathon-2025',
    title: 'Split Coastal Marathon',
    date: 'July 13, 2025',
    location: { city: 'Split', country: 'Croatia' },
    imageUrl: '/images/events/split-marathon.jpg',
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
    imageUrl: '/images/events/london-half.jpg',
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
    imageUrl: '/images/events/mountain-trail.jpg',
    distance: '50K',
    eventType: 'Trail Running',
    price: '€129'
  },
  {
    id: 'berlin-marathon-2025',
    title: 'Berlin Marathon',
    date: 'September 28, 2025',
    location: { city: 'Berlin', country: 'Germany' },
    imageUrl: '/images/events/berlin-marathon.jpg',
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
    imageUrl: '/images/events/tokyo-10k.jpg',
    distance: '10K',
    eventType: '10K',
    price: '€69'
  },
  {
    id: 'paris-half-2025',
    title: 'Paris City Half Marathon',
    date: 'October 5, 2025',
    location: { city: 'Paris', country: 'France' },
    imageUrl: '/images/events/paris-half.jpg',
    distance: '21.1K',
    eventType: 'Half Marathon',
    price: '€99'
  },
  {
    id: 'sydney-5k-2025',
    title: 'Sydney Harbour 5K',
    date: 'February 16, 2025',
    location: { city: 'Sydney', country: 'Australia' },
    imageUrl: '/images/events/sydney-5k.jpg',
    distance: '5K',
    eventType: '5K',
    price: '€49'
  },
  {
    id: 'autumn-forest-run-2025',
    title: 'Autumn Forest Run',
    date: 'October 12, 2025',
    location: { city: 'Portland', country: 'United States' },
    imageUrl: '/images/events/autumn-forest-run.jpg',
    distance: '15K',
    eventType: 'Trail Running',
    price: '€79'
  }
];

export function FeaturedRaces() {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState<EventCardProps[]>(raceEvents);
  const [displayedEvents, setDisplayedEvents] = useState<EventCardProps[]>([]);
  const [paginationCount, setPaginationCount] = useState(1);
  const eventsPerPage = 8;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Initialize with first 8 events
  useEffect(() => {
    setDisplayedEvents(allEvents.slice(0, eventsPerPage));
  }, [allEvents]);
  
  // Handle load more button click
  const handleLoadMore = () => {
    if (paginationCount === 1) {
      // First click: Load 16 events total
      setDisplayedEvents(allEvents.slice(0, eventsPerPage * 2));
      setPaginationCount(2);
    } else {
      // Second click: Redirect to events page
      router.push('/events');
    }
  };
  
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
    
    // Animate the newly loaded cards when more are shown
    if (gridRef.current) {
      const newCards = gridRef.current.querySelectorAll('.event-card-item');
      if (newCards.length > 0) {
        gsap.fromTo(
          newCards,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out'
          }
        );
      }
    }
  }, [displayedEvents]);
  
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
    
    setAllEvents(filteredEvents);
    // Reset pagination when search is performed
    setPaginationCount(1);
    setDisplayedEvents(filteredEvents.slice(0, eventsPerPage));
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
            Featured Events
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
            filtersOpenByDefault={false}
          />
        </div>
        
        {displayedEvents.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedEvents.map((event) => (
              <div key={event.id} className="event-card-item">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          {displayedEvents.length < allEvents.length || paginationCount > 1 ? (
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {paginationCount === 1 ? "Load More Events" : "View All Events"}
              <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <Link 
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Events
              <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </PageContainer>
    </section>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { InnerPageLayout } from '../../components/inner-page-layout';
import { RaceSearch } from '../../components/race-search';
import { EventCard } from '../../components/event-card';
import { 
  raceEvents, 
  countries, 
  cities, 
  eventTypes, 
  distances 
} from '../../components/featured-races';
import gsap from 'gsap';

export default function EventsPage() {
  const [displayedEvents, setDisplayedEvents] = useState(raceEvents);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(false);
    
    // Animation
    const tl = gsap.timeline();
    tl.fromTo('.events-grid .event-card', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power2.out' 
      }
    );
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
    
    // Animate new results
    gsap.fromTo('.events-grid .event-card', 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        stagger: 0.05,
        ease: 'power2.out' 
      }
    );
  };
  
  return (
    <InnerPageLayout
      title="Events"
      subtitle="Find and register for the best Events worldwide"
      headerImage="/images/events/boston-marathon.jpg"
    >
      <div className="mb-10">
        <RaceSearch
          onSearch={handleSearch}
          countries={countries}
          cities={cities}
          eventTypes={eventTypes}
          distances={distances}
          filtersOpenByDefault={true}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayedEvents.length > 0 ? (
        <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedEvents.map((event) => (
            <div key={event.id} className="event-card h-full">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-400 mb-2">No events found</h3>
          <p className="text-gray-500 mb-8">Try adjusting your search filters</p>
          <button 
            onClick={() => setDisplayedEvents(raceEvents)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            View All Events
          </button>
        </div>
      )}
    </InnerPageLayout>
  );
} 
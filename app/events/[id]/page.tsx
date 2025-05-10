'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { InnerPageLayout } from '../../../components/inner-page-layout';
import { raceEvents } from '../../../components/featured-races';
import { PageContainer } from '../../../components/page-container';
import gsap from 'gsap';

interface RouteMap {
  imageUrl: string;
  elevationGain: string;
  distance: string;
  terrain: string[];
  startPoint: string;
  endPoint: string;
}

interface EventDetailsProps {
  params: Promise<{ id: string }>;
}

export default function EventPage({ params }: EventDetailsProps) {
  const { id } = use(params);
  const [event, setEvent] = useState(raceEvents.find(event => event.id === id));
  const [loading, setLoading] = useState(true);

  // Sample route map data
  const routeMap: RouteMap = {
    imageUrl: 'https://images.unsplash.com/photo-1621458036962-9438b2308336?q=80&w=1200&auto=format&fit=crop',
    elevationGain: '350m',
    distance: event?.distance || '',
    terrain: ['Road', 'Urban', 'Waterfront'],
    startPoint: 'City Hall Plaza',
    endPoint: 'Central Park Finish Line'
  };

  // Sample event details not in the event card
  const additionalDetails = {
    description: `Join thousands of runners from around the world for the prestigious ${event?.title}. This iconic race takes you through the heart of ${event?.location.city}, showcasing the city's most beautiful landmarks and vibrant neighborhoods. Whether you're a seasoned marathoner or first-time participant, this event offers an unforgettable experience with enthusiastic crowds and world-class organization.`,
    schedule: [
      { time: '06:00 AM', activity: 'Race Village Opens' },
      { time: '07:30 AM', activity: 'Wheelchair Race Start' },
      { time: '08:00 AM', activity: 'Elite Runners Start' },
      { time: '08:15 AM', activity: 'General Participant Start' },
      { time: '04:00 PM', activity: 'Course Closes' }
    ],
    amenities: [
      'Water Stations Every 2km',
      'Medical Support Throughout Course',
      'Gear Check',
      'Post-Race Recovery Zone',
      'Finisher Medal & T-shirt',
      'Professional Photography',
      'Live Tracking App'
    ],
    registrationDeadline: 'September 15, 2025',
    contactEmail: 'info@activetix.com',
    contactPhone: '+1 (555) 123-4567'
  };

  useEffect(() => {
    if (event) {
      setLoading(false);
      
      // Animations
      const tl = gsap.timeline();
      tl.fromTo('.animate-fade-in', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }
      );
      
      gsap.fromTo('.route-map', 
        { opacity: 0, scale: 0.95 }, 
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          delay: 0.3,
          ease: 'power2.out' 
        }
      );
    }
  }, [event]);

  if (loading) {
    return (
      <InnerPageLayout title="Loading Event Details...">
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </InnerPageLayout>
    );
  }

  if (!event) {
    return (
      <InnerPageLayout title="Event Not Found">
        <div className="py-16 text-center">
          <p className="text-xl text-gray-400 mb-8">Sorry, we couldn&apos;t find the event you&apos;re looking for.</p>
          <Link 
            href="/events" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Browse All Events
          </Link>
        </div>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout 
      title={event.title}
      subtitle={`${event.location.city}, ${event.location.country} | ${event.date}`}
      headerImage={event.imageUrl}
      isEventPage={true}
    >
      {/* Main Event Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">Event Overview</h2>
          <p className="text-lg text-gray-300 mb-6 animate-fade-in">{additionalDetails.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3">Event Type</h3>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{event.eventType}</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3">Distance</h3>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>{event.distance}</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3">Price</h3>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{event.price}</span>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-white mb-3">Registration Deadline</h3>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{additionalDetails.registrationDeadline}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-4">Registration</h2>
          
          {event.spotsLeft && (
            <div className="mb-6">
              <p className="text-yellow-400 font-medium">
                Only {event.spotsLeft} spots remaining!
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${Math.min(100 - (event.spotsLeft / 200) * 100, 90)}%` }}></div>
              </div>
            </div>
          )}
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Entry Fee:</span>
              <span className="text-xl font-bold text-white">{event.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
              <span>Processing Fee:</span>
              <span>€9.99</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
              <span>Taxes:</span>
              <span>Included</span>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
              <span className="text-gray-300">Total:</span>
              <span className="text-xl font-bold text-white">{event.price.includes('€') ? `€${parseInt(event.price.replace('€', '')) + 9.99}` : event.price}</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
            Register Now
          </button>
          
          <p className="text-center text-gray-400 text-sm mt-3">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
      
      {/* Route Map Section */}
      <div className="mb-16 route-map">
        <h2 className="text-2xl font-bold text-white mb-4">Race Route</h2>
        <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden mb-6">
          <Image 
            src={routeMap.imageUrl}
            alt="Race route map"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-md py-2 px-4">
                <p className="text-sm text-gray-400">Distance</p>
                <p className="text-white font-semibold">{routeMap.distance}</p>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-md py-2 px-4">
                <p className="text-sm text-gray-400">Elevation Gain</p>
                <p className="text-white font-semibold">{routeMap.elevationGain}</p>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-md py-2 px-4">
                <p className="text-sm text-gray-400">Start Point</p>
                <p className="text-white font-semibold">{routeMap.startPoint}</p>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-md py-2 px-4">
                <p className="text-sm text-gray-400">Finish Line</p>
                <p className="text-white font-semibold">{routeMap.endPoint}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {routeMap.terrain.map((type, index) => (
            <span key={index} className="bg-blue-900/50 text-blue-300 text-sm rounded px-3 py-1">
              {type}
            </span>
          ))}
        </div>
      </div>
      
      {/* Schedule Section */}
      <div className="mb-16 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Event Schedule</h2>
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] divide-y divide-gray-800">
            {additionalDetails.schedule.map((item, index) => (
              <div key={index} className="contents">
                <div className="p-4 md:p-5 bg-gray-900/50 font-medium text-white">
                  {item.time}
                </div>
                <div className="p-4 md:p-5 text-gray-300">
                  {item.activity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Amenities Section */}
      <div className="mb-16 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Race Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalDetails.amenities.map((amenity, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-900/30 border border-gray-800 rounded-lg">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-300">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                <a href={`mailto:${additionalDetails.contactEmail}`} className="text-blue-400 hover:text-blue-300">
                  {additionalDetails.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                <a href={`tel:${additionalDetails.contactPhone.replace(/\D/g, '')}`} className="text-blue-400 hover:text-blue-300">
                  {additionalDetails.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
} 
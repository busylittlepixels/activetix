'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { InnerPageLayout } from '../../../components/inner-page-layout';
import { raceEvents } from '../../../components/featured-races';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (params.id) {
      const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundEvent = raceEvents.find(e => e.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // Redirect to events page if event not found
        router.push('/events');
      }
    }
    setIsLoading(false);
  }, [params.id, router]);
  
  if (isLoading || !event) {
    return (
      <InnerPageLayout title="Loading..." subtitle="Please wait">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </InnerPageLayout>
    );
  }
  
  return (
    <InnerPageLayout
      title={event.title}
      subtitle={`${event.date} • ${event.location.city}, ${event.location.country}`}
      headerImage={event.imageUrl}
      isEventPage={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2">
          <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Event Details</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/70 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Date</div>
                <div className="text-white font-medium">{event.date}</div>
              </div>
              
              <div className="bg-black/70 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Time</div>
                <div className="text-white font-medium">7:00 AM</div>
              </div>
              
              <div className="bg-black/70 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Distance</div>
                <div className="text-white font-medium">{event.distance}</div>
              </div>
              
              <div className="bg-black/70 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Event Type</div>
                <div className="text-white font-medium">{event.eventType}</div>
              </div>
              
              <div className="bg-black/70 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Location</div>
                <div className="text-white font-medium">{event.location.city}, {event.location.country}</div>
              </div>
              
              <div className="bg-black/70 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Price</div>
                <div className="text-white font-medium">{event.price}</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">
              Join us for the {event.title}, a premier running event in {event.location.city}. This {event.eventType.toLowerCase()} race offers a challenging but rewarding {event.distance} course through scenic routes, showcasing the beauty of {event.location.city}.
            </p>
            
            <p className="text-gray-300 mb-4">
              Whether you're an elite athlete aiming for a personal best or a recreational runner looking to challenge yourself, this event provides a memorable experience for all participants.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-white mt-8">Course Information</h3>
            <p className="text-gray-300 mb-4">
              The course starts and finishes in the city center, taking runners through iconic landmarks, scenic parks, and beautiful neighborhoods. The route is mostly flat with a few gentle hills, making it ideal for achieving personal records.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-white mt-8">Race Day Schedule</h3>
            <ul className="text-gray-300 list-disc pl-5 space-y-2 mb-6">
              <li>5:30 AM - Race village opens</li>
              <li>6:30 AM - Bag drop closes</li>
              <li>6:45 AM - Warm-up</li>
              <li>7:00 AM - Race start</li>
              <li>10:00 AM - Award ceremony</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 text-white mt-8">Included in Registration</h3>
            <ul className="text-gray-300 list-disc pl-5 space-y-2">
              <li>Official race t-shirt</li>
              <li>Finisher's medal</li>
              <li>Chip timing</li>
              <li>Race photos</li>
              <li>Refreshments along the course</li>
              <li>Post-race celebration</li>
            </ul>
          </div>
        </div>
        
        <div>
          <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl mb-8 sticky top-24">
            <h3 className="text-xl font-semibold mb-4 text-white">Registration</h3>
            
            <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Registration Fee</span>
                <span className="text-white font-bold">{event.price}</span>
              </div>
              {event.spotsLeft !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Spots Left</span>
                  <span className="text-white font-bold">{event.spotsLeft}</span>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="text-white font-medium mb-2">Important Dates</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Early Bird Registration</span>
                  <span className="text-white">Ends Jun 30, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Regular Registration</span>
                  <span className="text-white">Ends Sep 30, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Late Registration</span>
                  <span className="text-white">Ends Oct 28, 2025</span>
                </div>
              </div>
            </div>
            
            <Link 
              href={`/events/${event.id}/register`}
              className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium rounded-lg transition-colors mb-3"
            >
              Register Now
            </Link>
            
            <p className="text-gray-400 text-sm text-center">
              Secure your spot today!
            </p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-white">Contact</h3>
            <p className="text-gray-300 mb-4">
              Have questions about the event? Get in touch with our team.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">info@{event.id.split('-')[0]}.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
} 
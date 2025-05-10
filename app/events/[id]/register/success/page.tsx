'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { InnerPageLayout } from '../../../../../components/inner-page-layout';
import { raceEvents } from '../../../../../components/featured-races';

export default function RegistrationSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  
  useEffect(() => {
    // Generate a random registration number
    const generateRegistrationNumber = () => {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const prefix = 'RT';
      return `${prefix}-${randomNum}`;
    };
    
    setRegistrationNumber(generateRegistrationNumber());
    
    // Find the event
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
  }, [params.id, router]);
  
  if (!event) {
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
      title="Registration Complete!"
      subtitle={`Thank you for registering for ${event.title}`}
    >
      <div className="max-w-3xl mx-auto pb-16">
        <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl text-center mb-8">
          <div className="mb-6">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
          <p className="text-gray-300 mb-6">
            Your registration for {event.title} has been confirmed.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6 inline-block min-w-[250px]">
            <div className="text-sm text-gray-400 mb-1">Registration Number</div>
            <div className="text-xl font-bold text-white tracking-wider">{registrationNumber}</div>
          </div>
          
          <p className="text-gray-300 mb-8">
            We've sent a confirmation email with all the details.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/events/${event.id}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Event Details
            </Link>
            <Link
              href="/events"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse More Events
            </Link>
          </div>
        </div>
        
        <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-blue-300 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Check Your Email</h4>
                <p className="text-gray-300 text-sm">We've sent a confirmation email with all the details and your registration receipt.</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-blue-300 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Download Race Info</h4>
                <p className="text-gray-300 text-sm">Access essential information about the event, including course maps and rules.</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-blue-300 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Prepare for the Event</h4>
                <p className="text-gray-300 text-sm">Start training and prepare your gear for the big day!</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900 text-blue-300 text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Join the Community</h4>
                <p className="text-gray-300 text-sm">Connect with other participants on our social media channels.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </InnerPageLayout>
  );
} 
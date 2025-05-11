'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageContainer } from '../../../components/page-container';
import { InnerPageLayout } from '../../../components/inner-page-layout';

// Tab definitions
const tabs = [
  { id: 'account', label: 'Account Details', href: '/profile' },
  { id: 'events', label: 'My Events', href: '/profile/events' },
  { id: 'payment', label: 'Payment Information', href: '/profile/payment' },
  { id: 'settings', label: 'Settings', href: '/profile/settings' }
];

// Dummy user data
// Dummy user data
const userData = {
  id: 'user123',
  name: 'Ro O\'Leary',
  email: 'roleary81@gmail.com',
  phone: '+1 (555) 123-4567',
  dateJoined: '2023-04-15',
  profileImage: '/images/profile/me.jpg'
};

// Dummy registered events data
const registeredEvents = [
  {
    id: 'nyc-marathon-2025',
    title: 'NYC Marathon',
    date: 'November 5, 2025',
    location: { city: 'New York', country: 'United States' },
    imageUrl: 'https://images.unsplash.com/photo-1479964555776-763e3571d936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    distance: '42.2K',
    status: 'upcoming',
    bibNumber: '12345',
    registrationDate: '2024-05-01',
    price: '€120'
  },
  {
    id: 'berlin-marathon-2025',
    title: 'Berlin Marathon',
    date: 'September 24, 2025',
    location: { city: 'Berlin', country: 'Germany' },
    imageUrl: 'https://images.unsplash.com/photo-1604877999376-58c83e60af75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    distance: '42.2K',
    status: 'upcoming',
    bibNumber: '54321',
    registrationDate: '2024-02-15',
    price: '€110'
  },
  {
    id: 'london-half-2025',
    title: 'London Half Marathon',
    date: 'March 3, 2025',
    location: { city: 'London', country: 'United Kingdom' },
    imageUrl: 'https://images.unsplash.com/photo-1596727362774-a3804a612255?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    distance: '21.1K',
    status: 'completed',
    bibNumber: '78910',
    registrationDate: '2024-01-10',
    price: '€75',
    result: {
      finishTime: '1:42:35',
      overallPosition: 342,
      categoryPosition: 58
    }
  },
  {
    id: 'paris-half-2025',
    title: 'Paris City Half Marathon',
    date: 'October 8, 2025',
    location: { city: 'Paris', country: 'France' },
    imageUrl: 'https://images.unsplash.com/photo-1568393527882-cf8232b0a74a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    distance: '21.1K',
    status: 'canceled',
    bibNumber: '24680',
    registrationDate: '2024-03-20',
    price: '€70',
    refundStatus: 'Refunded'
  }
];

export default function ProfileEventsPage() {
  const [activeTab, setActiveTab] = useState('events');
  const [filter, setFilter] = useState('all');

  const filteredEvents = filter === 'all' 
    ? registeredEvents 
    : registeredEvents.filter(event => event.status === filter);

  return (
    <InnerPageLayout
      title="My Events"
      subtitle="View and manage your race registrations"
    >
      <PageContainer>
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <img 
                    src={userData.profileImage} 
                    alt={userData.name}
                    className="rounded-full object-cover w-full h-full border-2 border-blue-500"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white">{userData.name}</h2>
                <p className="text-gray-400">Member since {new Date(userData.dateJoined).toLocaleDateString()}</p>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="mb-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <Link 
                        href={tab.href}
                        className={`flex items-center py-2 px-3 rounded-lg w-full transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-900/50 text-blue-300 border-l-4 border-blue-500'
                            : 'text-gray-300 hover:bg-black/30 hover:text-white'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {getTabIcon(tab.id)}
                        <span className="ml-3">{tab.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="pt-4 border-t border-gray-800">
                <button className="flex items-center text-red-400 hover:text-red-300 w-full py-2 px-3 rounded-lg transition-colors hover:bg-black/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">My Registered Events</h2>
                
                {/* Filter buttons */}
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => setFilter('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md text-sm ${filter === 'canceled' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    onClick={() => setFilter('canceled')}
                  >
                    Canceled
                  </button>
                </div>
              </div>
              
              {/* Event list */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
                  <p className="text-gray-400 mb-6">You haven&apos;t registered for any {filter !== 'all' ? filter : ''} events yet.</p>
                  <Link 
                    href="/events"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Find Events
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex flex-col md:flex-row bg-black/30 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
                    >
                      <div className="w-full md:w-1/4 h-40 md:h-auto relative">
                        <div className="absolute inset-0">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div className="absolute top-0 right-0 m-2">
                          <StatusBadge status={event.status} />
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                            <div className="flex items-center text-gray-400 mb-2">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-400 mb-3">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.location.city}, {event.location.country}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="bg-gray-800 px-3 py-1.5 rounded">
                                <div className="text-gray-400">Distance</div>
                                <div className="font-medium text-white">{event.distance}</div>
                              </div>
                              <div className="bg-gray-800 px-3 py-1.5 rounded">
                                <div className="text-gray-400">Bib Number</div>
                                <div className="font-medium text-white">{event.bibNumber || 'TBA'}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:text-right">
                            <div className="text-sm text-gray-400 mb-1">Registration Date</div>
                            <div className="text-white mb-3">{new Date(event.registrationDate).toLocaleDateString()}</div>
                            <div className="text-sm text-gray-400 mb-1">Price</div>
                            <div className="text-white font-medium">{event.price}</div>
                          </div>
                        </div>
                        
                        {event.status === 'completed' && event.result && (
                          <div className="mt-4 pt-4 border-t border-gray-800">
                            <h4 className="text-lg font-semibold text-white mb-2">Result</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-blue-900/30 p-3 rounded-lg text-center">
                                <div className="text-blue-300 text-sm mb-1">Finish Time</div>
                                <div className="text-white font-semibold">{event.result.finishTime}</div>
                              </div>
                              <div className="bg-blue-900/30 p-3 rounded-lg text-center">
                                <div className="text-blue-300 text-sm mb-1">Overall Position</div>
                                <div className="text-white font-semibold">{event.result.overallPosition}</div>
                              </div>
                              <div className="bg-blue-900/30 p-3 rounded-lg text-center">
                                <div className="text-blue-300 text-sm mb-1">Category Position</div>
                                <div className="text-white font-semibold">{event.result.categoryPosition}</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {event.status === 'canceled' && event.refundStatus && (
                          <div className="mt-4 pt-4 border-t border-gray-800">
                            <div className="flex items-center text-yellow-400">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Refund Status: {event.refundStatus}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between">
                          <Link 
                            href={`/events/${event.id}`}
                            className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
                          >
                            Event Details
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                          
                          {event.status === 'upcoming' && (
                            <div className="flex space-x-3">
                              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                                Download Race Info
                              </button>
                              <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                                Transfer Registration
                              </button>
                            </div>
                          )}
                          
                          {event.status === 'completed' && (
                            <div className="flex space-x-3">
                              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                                Download Certificate
                              </button>
                              <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                                View Photos
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8 text-center">
                <Link 
                  href="/events"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Browse More Events
                  <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </InnerPageLayout>
  );
}

// Helper function to render the appropriate icon for each tab
function getTabIcon(tabId: string) {
  switch (tabId) {
    case 'account':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case 'events':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      );
    case 'payment':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case 'settings':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  switch(status) {
    case 'upcoming':
      return (
        <span className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
          Upcoming
        </span>
      );
    case 'completed':
      return (
        <span className="bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded">
          Completed
        </span>
      );
    case 'canceled':
      return (
        <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
          Canceled
        </span>
      );
    default:
      return null;
  }
} 
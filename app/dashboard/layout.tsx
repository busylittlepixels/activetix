'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PageContainer } from '../../components/page-container';
import { InnerPageLayout } from '../../components/inner-page-layout';

// Tab definitions
const tabs = [
  { id: 'overview', label: 'Overview', href: '/dashboard', icon: 'chart' },
  { id: 'events', label: 'My Events', href: '/dashboard/events', icon: 'calendar' },
  { id: 'participants', label: 'Participants', href: '/dashboard/participants', icon: 'users' },
  { id: 'revenue', label: 'Revenue', href: '/dashboard/revenue', icon: 'dollar' },
  { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: 'settings' }
];

// Dummy organizer data
const organizerData = {
  id: 'blp123',
  name: 'Busy Little Runners',
  email: 'admin@busylittlepixels.com',
  phone: '+1 (555) 987-6543',
  dateJoined: '2022-01-10',
  profileImage: '/images/events/blp.png',
  eventCount: 12,
  participantCount: 36540,
  totalRevenue: '€3,265,420'
};

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Determine active tab based on current path
  const activeTabId = tabs.find(tab => 
    pathname === tab.href || pathname.startsWith(`${tab.href}/`)
  )?.id || 'overview';

  return (
    <InnerPageLayout
      title="Organizer Dashboard"
      subtitle="Manage your events, participants, and revenue"
    >
      <PageContainer>
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Dashboard Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-xl mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                  <Image 
                    src={organizerData.profileImage}
                    alt={organizerData.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white">{organizerData.name}</h2>
                <p className="text-gray-400">Organizer since {new Date(organizerData.dateJoined).toLocaleDateString()}</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                  <div className="text-blue-400 font-bold text-xl">{organizerData.eventCount}</div>
                  <div className="text-gray-400 text-xs">Events</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                  <div className="text-blue-400 font-bold text-xl">{new Intl.NumberFormat().format(organizerData.participantCount)}</div>
                  <div className="text-gray-400 text-xs">Participants</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                  <div className="text-blue-400 font-bold text-xl">{organizerData.totalRevenue}</div>
                  <div className="text-gray-400 text-xs">Revenue</div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="mb-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <Link 
                        href={tab.href}
                        className={`flex items-center py-2 px-3 rounded-lg w-full transition-colors ${
                          activeTabId === tab.id
                            ? 'bg-blue-900/50 text-blue-300 border-l-4 border-blue-500'
                            : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                        }`}
                      >
                        {getTabIcon(tab.icon)}
                        <span className="ml-3">{tab.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="pt-4 border-t border-gray-800">
                <Link href="/events/new" className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Event
                </Link>
                
                <button className="flex items-center text-red-400 hover:text-red-300 w-full py-2 px-3 mt-4 rounded-lg transition-colors hover:bg-gray-800/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
            
            {/* Help & Support */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/30 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-gray-300 mb-4 text-sm">Our support team is here to assist you with any questions.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {children}
          </div>
        </div>
      </PageContainer>
    </InnerPageLayout>
  );
}

// Helper function to render the appropriate icon for each tab
function getTabIcon(iconName: string) {
  switch (iconName) {
    case 'chart':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'dollar':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
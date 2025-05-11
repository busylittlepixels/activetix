'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
if (typeof window !== 'undefined') {
  Chart.register(...registerables);
}

// Dummy data for the dashboard
const recentEvents = [
  { 
    id: 'boston-marathon-2025', 
    title: 'Boston Marathon 2025', 
    date: 'April 21, 2025', 
    participants: 32500, 
    revenue: '€2,437,500',
    status: 'registering'
  },
  { 
    id: 'boston-half-2025', 
    title: 'Boston Half Marathon', 
    date: 'October 13, 2025', 
    participants: 12800, 
    revenue: '€768,000',
    status: 'registering'
  },
  { 
    id: 'freedom-trail-10k', 
    title: 'Freedom Trail 10K', 
    date: 'July 4, 2025', 
    participants: 5600, 
    revenue: '€224,000',
    status: 'draft'
  }
];

// Dummy data for recent registration activity
const recentRegistrations = [
  { eventId: 'boston-marathon-2025', participant: 'Emily Johnson', time: '2 hours ago', amount: '€75' },
  { eventId: 'boston-half-2025', participant: 'Michael Chen', time: '3 hours ago', amount: '€60' },
  { eventId: 'boston-marathon-2025', participant: 'Sophia Williams', time: '4 hours ago', amount: '€75' },
  { eventId: 'boston-half-2025', participant: 'James Rodriguez', time: '5 hours ago', amount: '€60' }
];

export default function DashboardPage() {
  const registrationChartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Registration chart
    if (registrationChartRef.current) {
      const ctx = registrationChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: '2024 Registrations',
              data: [1200, 1900, 3000, 5400, 4000, 3500, 3000, 3800, 4200, 4800, 5200, 4600],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#e5e7eb'
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                  color: '#9ca3af'
                }
              },
              x: {
                grid: {
                  color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                  color: '#9ca3af'
                }
              }
            }
          }
        });
        
        return () => {
          chart.destroy();
        };
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Call-to-Action Banner */}
      <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border border-blue-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Ready to organize your next event?</h2>
            <p className="text-blue-100">Create a new event to get started with registration, participant management, and more.</p>
          </div>
          <Link
            href="/dashboard/events/new"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center whitespace-nowrap"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Event
          </Link>
        </div>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Events</p>
              <h3 className="text-3xl font-bold text-white mt-1">12</h3>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-green-400 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Up 2 from last year</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 p-6 rounded-xl border border-indigo-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Participants</p>
              <h3 className="text-3xl font-bold text-white mt-1">36,540</h3>
            </div>
            <div className="bg-indigo-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-green-400 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>5.3% growth</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-xl border border-purple-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-1">€3.2M</h3>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-green-400 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>8.7% increase</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-rose-900/20 to-rose-800/20 p-6 rounded-xl border border-rose-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Retention Rate</p>
              <h3 className="text-3xl font-bold text-white mt-1">76%</h3>
            </div>
            <div className="bg-rose-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-green-400 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>+3% vs last year</span>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Registration Trends</h3>
        <div className="w-full h-64">
          <canvas ref={registrationChartRef}></canvas>
        </div>
      </div>
      
      {/* Your Events Section */}
      <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Your Events</h3>
          <Link 
            href="/dashboard/events"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Events
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3 pr-4">Event</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Participants</th>
                <th className="pb-3 pr-4">Revenue</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {recentEvents.map((event) => (
                <tr key={event.id} className="border-b border-gray-800 hover:bg-black/20">
                  <td className="py-4 pr-4 font-medium">{event.title}</td>
                  <td className="py-4 pr-4">{event.date}</td>
                  <td className="py-4 pr-4">{event.participants.toLocaleString()}</td>
                  <td className="py-4 pr-4">{event.revenue}</td>
                  <td className="py-4 pr-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'registering' 
                        ? 'bg-green-900/50 text-green-300' 
                        : event.status === 'draft'
                          ? 'bg-yellow-900/50 text-yellow-300'
                          : 'bg-blue-900/50 text-blue-300'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/events/${event.id}`} className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link>
                      <Link href={`/dashboard/events/${event.id}`} className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentRegistrations.map((registration, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
              <div className="w-10 h-10 bg-blue-600/30 rounded-full flex items-center justify-center text-blue-400 mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">
                  {registration.participant} registered for{' '}
                  <span className="text-blue-400">{recentEvents.find(e => e.id === registration.eventId)?.title}</span>
                </p>
                <p className="text-gray-400 text-sm">{registration.time}</p>
              </div>
              <div className="text-green-400 font-medium">{registration.amount}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/dashboard/events/new" className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-800/30 shadow-lg flex items-center hover:from-blue-900/30 hover:to-blue-800/30 transition-colors">
          <div className="bg-blue-600/30 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-bold">Create Event</h4>
            <p className="text-gray-300 text-sm">Set up a new race or event</p>
          </div>
        </Link>
        
        <Link href="/dashboard/participants" className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 p-6 rounded-xl border border-indigo-800/30 shadow-lg flex items-center hover:from-indigo-900/30 hover:to-indigo-800/30 transition-colors">
          <div className="bg-indigo-600/30 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-bold">Manage Participants</h4>
            <p className="text-gray-300 text-sm">View and edit registrations</p>
          </div>
        </Link>
        
        <Link href="/dashboard/revenue" className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-xl border border-purple-800/30 shadow-lg flex items-center hover:from-purple-900/30 hover:to-purple-800/30 transition-colors">
          <div className="bg-purple-600/30 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-bold">View Reports</h4>
            <p className="text-gray-300 text-sm">Access financial insights</p>
          </div>
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { InnerPageLayout } from '../../components/inner-page-layout';
// import { PageContainer } from '../../components/page-container';

// Sample event data for demonstration
const organizerEvents = [
  { 
    id: 'dublin-marathon', 
    title: 'Dublin Marathon', 
    date: 'October 30, 2025', 
    location: { city: 'Dublin', country: 'Ireland' },
    imageUrl: '/images/events/dublin-marathon.jpg',
    participants: { registered: 18500, capacity: 20000 }, 
    revenue: '€925,000',
    status: 'registering',
    distance: 'Marathon',
    eventType: 'Marathon'
  },
  { 
    id: 'cork-half-marathon', 
    title: 'Cork Half Marathon', 
    date: 'September 15, 2025', 
    location: { city: 'Cork', country: 'Ireland' },
    imageUrl: '/images/events/cork-half.jpg',
    participants: { registered: 7800, capacity: 10000 }, 
    revenue: '€312,000',
    status: 'registering',
    distance: 'Half Marathon',
    eventType: 'Half Marathon'
  },
  { 
    id: 'galway-10k', 
    title: 'Galway 10K', 
    date: 'July 3, 2025', 
    location: { city: 'Galway', country: 'Ireland' },
    imageUrl: '/images/events/galway-10k.jpg',
    participants: { registered: 4200, capacity: 5000 }, 
    revenue: '€126,000',
    status: 'draft',
    distance: '10K',
    eventType: '10K'
  }
];

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: { city: '', country: '' },
    distance: '',
    eventType: '',
    capacity: ''
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewEvent(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setNewEvent(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend
    console.log('Form submitted with data:', newEvent);
    // Reset form and hide it
    setNewEvent({
      title: '',
      date: '',
      location: { city: '', country: '' },
      distance: '',
      eventType: '',
      capacity: ''
    });
    setShowCreateForm(false);
    // Show success message or notification
  };
  
  // Filter events based on status and search term
  const filteredEvents = organizerEvents
    .filter(event => filter === 'all' || event.status === filter)
    .filter(event => 
      search === '' || 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.city.toLowerCase().includes(search.toLowerCase()) ||
      event.eventType.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-8">
      {/* Create Event Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-xl p-6 shadow-xl border border-blue-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Create a New Event</h2>
            <p className="text-blue-200">Get started with your next running event in minutes.</p>
          </div>
          
          <button 
            onClick={() => setShowCreateForm(prev => !prev)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center whitespace-nowrap shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showCreateForm ? 'Cancel' : 'Create New Event'}
          </button>
        </div>
        
        {/* Create Event Form */}
        {showCreateForm && (
          <div className="mt-6 bg-black/30 rounded-lg p-6 border border-blue-800/50">
            <h3 className="text-xl font-semibold mb-4 text-white">Event Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Dublin Marathon 2025"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="location.city" className="block text-sm font-medium text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="location.city"
                    name="location.city"
                    required
                    value={newEvent.location.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Dublin"
                  />
                </div>
                <div>
                  <label htmlFor="location.country" className="block text-sm font-medium text-gray-300 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="location.country"
                    name="location.country"
                    required
                    value={newEvent.location.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Ireland"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={newEvent.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Marathon">Marathon</option>
                    <option value="Half Marathon">Half Marathon</option>
                    <option value="10K">10K</option>
                    <option value="5K">5K</option>
                    <option value="Trail Run">Trail Run</option>
                    <option value="Ultra Marathon">Ultra Marathon</option>
                    <option value="Fun Run">Fun Run</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-1">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    required
                    value={newEvent.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., 5000"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Events List Section */}
      <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Your Events</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white w-full sm:w-64 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setFilter('all')}
          >
            All Events
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'registering' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setFilter('registering')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'draft' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setFilter('draft')}
          >
            Drafts
          </button>
        </div>
        
        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Link
                key={event.id}
                href={`/dashboard/events/${event.id}`}
                className="block bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10"
              >
                <div className="h-40 overflow-hidden relative">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.imageUrl || '/images/events/default-event.jpg'})` }}  
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">{event.date}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        event.status === 'registering' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {event.status === 'registering' ? 'Active' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{event.location.city}, {event.location.country}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Participants</p>
                      <p className="text-white font-medium">{event.participants.registered} / {event.participants.capacity}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Revenue</p>
                      <p className="text-white font-medium">{event.revenue}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No events found matching your criteria.</p>
            <button 
              onClick={() => {
                setFilter('all');
                setSearch('');
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 
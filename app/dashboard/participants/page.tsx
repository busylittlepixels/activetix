'use client';

import { useState } from 'react';

// Dummy participant data
const participants = [
  { 
    id: 'p1', 
    name: 'John Doe', 
    email: 'john.doe@example.com',
    phone: '+31 (6) 180-66163',
    eventId: 'boston-marathon-2025',
    eventName: 'Boston Marathon 2025',
    registrationDate: '2024-01-15',
    status: 'confirmed',
    bibNumber: '12345',
    category: 'Men 30-39'
  },
  { 
    id: 'p2', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    eventId: 'boston-marathon-2025',
    eventName: 'Boston Marathon 2025',
    registrationDate: '2024-01-16',
    status: 'confirmed',
    bibNumber: '12346',
    category: 'Women 20-29'
  },
  { 
    id: 'p3', 
    name: 'Michael Johnson', 
    email: 'michael.j@example.com',
    phone: '+1 (555) 456-7890',
    eventId: 'boston-half-2025',
    eventName: 'Boston Half Marathon',
    registrationDate: '2024-02-10',
    status: 'confirmed',
    bibNumber: '5001',
    category: 'Men 40-49'
  },
  { 
    id: 'p4', 
    name: 'Emily Williams', 
    email: 'emily.w@example.com',
    phone: '+1 (555) 234-5678',
    eventId: 'boston-half-2025',
    eventName: 'Boston Half Marathon',
    registrationDate: '2024-02-12',
    status: 'waitlist',
    bibNumber: 'TBD',
    category: 'Women 30-39'
  },
  { 
    id: 'p5', 
    name: 'Robert Chen', 
    email: 'robert.c@example.com',
    phone: '+1 (555) 876-5432',
    eventId: 'boston-marathon-2025',
    eventName: 'Boston Marathon 2025',
    registrationDate: '2024-01-18',
    status: 'canceled',
    bibNumber: 'N/A',
    category: 'Men 20-29'
  },
  { 
    id: 'p6', 
    name: 'Sarah Lee', 
    email: 'sarah.l@example.com',
    phone: '+1 (555) 345-6789',
    eventId: 'freedom-trail-10k',
    eventName: 'Freedom Trail 10K',
    registrationDate: '2024-03-05',
    status: 'confirmed',
    bibNumber: '3001',
    category: 'Women 40-49'
  }
];

// Event filter options
const eventOptions = [
  { id: 'all', name: 'All Events' },
  { id: 'boston-marathon-2025', name: 'Boston Marathon 2025' },
  { id: 'boston-half-2025', name: 'Boston Half Marathon' },
  { id: 'freedom-trail-10k', name: 'Freedom Trail 10K' }
];

// Status filter options
const statusOptions = [
  { id: 'all', name: 'All Statuses' },
  { id: 'confirmed', name: 'Confirmed' },
  { id: 'waitlist', name: 'Waitlist' },
  { id: 'canceled', name: 'Canceled' }
];

export default function ParticipantsPage() {
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  
  // Filter participants based on search and filters
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = search === '' || 
      participant.name.toLowerCase().includes(search.toLowerCase()) ||
      participant.email.toLowerCase().includes(search.toLowerCase()) ||
      participant.bibNumber.toLowerCase().includes(search.toLowerCase());
      
    const matchesEvent = eventFilter === 'all' || participant.eventId === eventFilter;
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });
  
  // Toggle select all participants
  const toggleSelectAll = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredParticipants.map(p => p.id));
    }
  };
  
  // Toggle select individual participant
  const toggleSelectParticipant = (id: string) => {
    if (selectedParticipants.includes(id)) {
      setSelectedParticipants(selectedParticipants.filter(p => p !== id));
    } else {
      setSelectedParticipants([...selectedParticipants, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Participants</h2>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={selectedParticipants.length === 0}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              Export Selected
            </button>
            
            <button className="px-4 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Participant
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search participants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {eventOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => {
                setSearch('');
                setEventFilter('all');
                setStatusFilter('all');
              }}
              className="px-4 py-2 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Participants Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3 pl-4">
                  <input 
                    type="checkbox" 
                    checked={selectedParticipants.length === filteredParticipants.length && filteredParticipants.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                </th>
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Event</th>
                <th className="pb-3 pr-4">Bib #</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Registration Date</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No participants found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b border-gray-800 hover:bg-black/20">
                    <td className="py-4 pl-4">
                      <input 
                        type="checkbox" 
                        checked={selectedParticipants.includes(participant.id)}
                        onChange={() => toggleSelectParticipant(participant.id)}
                        className="rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                    </td>
                    <td className="py-4 pr-4">
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-gray-400 text-sm">{participant.email}</div>
                    </td>
                    <td className="py-4 pr-4">{participant.eventName}</td>
                    <td className="py-4 pr-4">{participant.bibNumber}</td>
                    <td className="py-4 pr-4">{participant.category}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        participant.status === 'confirmed' 
                          ? 'bg-green-900/50 text-green-300' 
                          : participant.status === 'waitlist'
                            ? 'bg-yellow-900/50 text-yellow-300'
                            : 'bg-red-900/50 text-red-300'
                      }`}>
                        {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 pr-4">{new Date(participant.registrationDate).toLocaleDateString()}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-400 text-sm">
            Showing <span className="font-medium text-white">{filteredParticipants.length}</span> of <span className="font-medium text-white">{participants.length}</span> participants
          </div>
          
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
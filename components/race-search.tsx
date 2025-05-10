'use client';

import { useState } from 'react';

interface SearchFilters {
  keyword: string;
  country: string;
  city: string;
  eventType: string;
  distance: string;
}

interface RaceSearchProps {
  onSearch: (filters: SearchFilters) => void;
  countries: string[];
  cities: string[];
  eventTypes: string[];
  distances: string[];
}

export function RaceSearch({
  onSearch,
  countries,
  cities,
  eventTypes,
  distances
}: RaceSearchProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    country: '',
    city: '',
    eventType: '',
    distance: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="w-full bg-black/50 border border-gray-800 rounded-lg p-5 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="keyword"
                placeholder="Search races..."
                value={filters.keyword}
                onChange={handleInputChange}
                className="w-full ps-10 p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full md:w-auto px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              <span className={`transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full md:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
            >
              Search
            </button>
          </div>
        </div>
        
        {filtersOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
              <select
                name="country"
                value={filters.country}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
              <select
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Event Type</label>
              <select
                name="eventType"
                value={filters.eventType}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">All Event Types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Distance</label>
              <select
                name="distance"
                value={filters.distance}
                onChange={handleInputChange}
                className="w-full p-2.5 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">All Distances</option>
                {distances.map((distance) => (
                  <option key={distance} value={distance}>
                    {distance}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 
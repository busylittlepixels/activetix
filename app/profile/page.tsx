'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageContainer } from '../../components/page-container';
import { InnerPageLayout } from '../../components/inner-page-layout';

// Tab definitions
const tabs = [
  { id: 'account', label: 'Account Details', href: '/profile' },
  { id: 'events', label: 'My Events', href: '/profile/events' },
  { id: 'payment', label: 'Payment Information', href: '/profile/payment' },
  { id: 'settings', label: 'Settings', href: '/profile/settings' }
];

// Dummy user data
const userData = {
  id: 'user123',
  name: 'Ro O\'Leary',
  email: 'roleary81@gmail.com',
  phone: '+31 (6) 180-66163',
  dateJoined: '2023-04-15',
  profileImage: '/images/profile/me.jpg'
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <InnerPageLayout
      title="My Profile"
      subtitle="Manage your account details and race registrations"
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
                  <Link href="/login"><span className="ml-3">Logout</span></Link>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Account Details</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      defaultValue="Ronan"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue="O'Leary"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={userData.email}
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={userData.phone}
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="dateOfBirth">
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      defaultValue="1981-01-24"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      defaultValue="male"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white pt-4">Address Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="address">
                      Street Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      defaultValue="Spaarndammerdijk"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      defaultValue="Amsterdam"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="state">
                      State/Province
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      defaultValue="Noord-Holland"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="postalCode">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      defaultValue="1011"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="country">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      defaultValue="Netherlands"
                      className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
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
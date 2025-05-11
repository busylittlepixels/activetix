'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  phone: '+31 (6) 180-66163',
  dateJoined: '2023-04-15',
  profileImage: '/images/profile/me.jpg'
};

// Dummy settings data
const settingsData = {
  notifications: {
    email: {
      newEvents: true,
      registrationConfirmation: true,
      eventReminders: true,
      trainingTips: false,
      promotions: false
    },
    sms: {
      eventReminders: true,
      registrationConfirmation: true,
      emergencyAlerts: true
    }
  },
  privacy: {
    profileVisibility: 'friends',
    showResults: true,
    shareWithSponsors: false
  },
  account: {
    language: 'english',
    timeZone: 'America/New_York',
    distanceUnit: 'km',
    darkMode: true
  }
};

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState(settingsData);
  
  const handleToggleChange = (category: string, subcategory: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...prev[category as keyof typeof prev][subcategory as any],
          [setting]: !prev[category as keyof typeof prev][subcategory as any][setting]
        }
      }
    }));
  };
  
  const handleDropdownChange = (category: string, setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <InnerPageLayout
      title="Settings"
      subtitle="Manage your account settings and preferences"
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
            {/* Notification Settings */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Notification Preferences</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Email Notifications</h3>
                <div className="space-y-4">
                  <ToggleSwitch 
                    id="email-newEvents"
                    label="New Events in Your Area"
                    description="Get notified when new events are added in your location"
                    isChecked={settings.notifications.email.newEvents}
                    onChange={() => handleToggleChange('notifications', 'email', 'newEvents')}
                  />
                  
                  <ToggleSwitch 
                    id="email-registrationConfirmation"
                    label="Registration Confirmations"
                    description="Receive email confirmations for event registrations"
                    isChecked={settings.notifications.email.registrationConfirmation}
                    onChange={() => handleToggleChange('notifications', 'email', 'registrationConfirmation')}
                  />
                  
                  <ToggleSwitch 
                    id="email-eventReminders"
                    label="Event Reminders"
                    description="Get reminders about upcoming events you're registered for"
                    isChecked={settings.notifications.email.eventReminders}
                    onChange={() => handleToggleChange('notifications', 'email', 'eventReminders')}
                  />
                  
                  <ToggleSwitch 
                    id="email-trainingTips"
                    label="Training Tips & Articles"
                    description="Receive training advice and articles to help you prepare"
                    isChecked={settings.notifications.email.trainingTips}
                    onChange={() => handleToggleChange('notifications', 'email', 'trainingTips')}
                  />
                  
                  <ToggleSwitch 
                    id="email-promotions"
                    label="Promotions & Offers"
                    description="Get special offers and discounts from us and our partners"
                    isChecked={settings.notifications.email.promotions}
                    onChange={() => handleToggleChange('notifications', 'email', 'promotions')}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">SMS Notifications</h3>
                <div className="space-y-4">
                  <ToggleSwitch 
                    id="sms-eventReminders"
                    label="Event Reminders"
                    description="Receive text messages before your events"
                    isChecked={settings.notifications.sms.eventReminders}
                    onChange={() => handleToggleChange('notifications', 'sms', 'eventReminders')}
                  />
                  
                  <ToggleSwitch 
                    id="sms-registrationConfirmation"
                    label="Registration Confirmations"
                    description="Get text confirmations when you register for events"
                    isChecked={settings.notifications.sms.registrationConfirmation}
                    onChange={() => handleToggleChange('notifications', 'sms', 'registrationConfirmation')}
                  />
                  
                  <ToggleSwitch 
                    id="sms-emergencyAlerts"
                    label="Emergency Alerts"
                    description="Important safety alerts and event changes"
                    isChecked={settings.notifications.sms.emergencyAlerts}
                    onChange={() => handleToggleChange('notifications', 'sms', 'emergencyAlerts')}
                  />
                </div>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-white mb-2" htmlFor="profileVisibility">
                    Profile Visibility
                  </label>
                  <select
                    id="profileVisibility"
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleDropdownChange('privacy', 'profileVisibility', e.target.value)}
                    className="w-full md:w-1/2 p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="public">Public - Visible to everyone</option>
                    <option value="friends">Friends Only - Visible to connections</option>
                    <option value="private">Private - Only visible to you</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-400">
                    Control who can see your profile and race history
                  </p>
                </div>
                
                <ToggleSwitch 
                  id="privacy-showResults"
                  label="Show Race Results"
                  description="Allow your race results to be displayed publicly"
                  isChecked={settings.privacy.showResults}
                  onChange={() => handleToggleChange('privacy', 'showResults', '')}
                />
                
                <ToggleSwitch 
                  id="privacy-shareWithSponsors"
                  label="Share Data with Event Sponsors"
                  description="Allow event sponsors to contact you with relevant offers"
                  isChecked={settings.privacy.shareWithSponsors}
                  onChange={() => handleToggleChange('privacy', 'shareWithSponsors', '')}
                />
              </div>
            </div>
            
            {/* Account Settings */}
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-white mb-2" htmlFor="language">
                    Language
                  </label>
                  <select
                    id="language"
                    value={settings.account.language}
                    onChange={(e) => handleDropdownChange('account', 'language', e.target.value)}
                    className="w-full md:w-1/2 p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="spanish">Spanish</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-white mb-2" htmlFor="timeZone">
                    Time Zone
                  </label>
                  <select
                    id="timeZone"
                    value={settings.account.timeZone}
                    onChange={(e) => handleDropdownChange('account', 'timeZone', e.target.value)}
                    className="w-full md:w-1/2 p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-lg font-medium text-white mb-2" htmlFor="distanceUnit">
                    Distance Unit
                  </label>
                  <select
                    id="distanceUnit"
                    value={settings.account.distanceUnit}
                    onChange={(e) => handleDropdownChange('account', 'distanceUnit', e.target.value)}
                    className="w-full md:w-1/2 p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="km">Kilometers (km)</option>
                    <option value="mi">Miles (mi)</option>
                  </select>
                </div>
                
                <ToggleSwitch 
                  id="account-darkMode"
                  label="Dark Mode"
                  description="Use dark mode for the website"
                  isChecked={settings.account.darkMode}
                  onChange={() => handleToggleChange('account', 'darkMode', '')}
                />
                
                <div className="pt-4 mt-6 border-t border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-white">Danger Zone</h3>
                  
                  <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-red-300 mb-2">Delete Account</h4>
                    <p className="text-gray-300 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </InnerPageLayout>
  );
}

// Toggle Switch Component
function ToggleSwitch({ 
  id, 
  label, 
  description,
  isChecked, 
  onChange 
}: { 
  id: string; 
  label: string; 
  description?: string;
  isChecked: boolean; 
  onChange: () => void; 
}) {
  return (
    <div className="flex justify-between items-start py-2">
      <div>
        <label htmlFor={id} className="text-lg font-medium text-white">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
      </div>
      
      <div className="relative inline-block w-12 h-6 mr-2">
        <input
          id={id}
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={onChange}
        />
        <span 
          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
            isChecked ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          <span 
            className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-200 ${
              isChecked ? 'left-7' : 'left-1'
            }`}
          ></span>
        </span>
      </div>
    </div>
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
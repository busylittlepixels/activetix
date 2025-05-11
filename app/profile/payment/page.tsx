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
const userData = {
  id: 'user123',
  name: 'Ro O\'Leary',
  email: 'roleary81@gmail.com',
  phone: '+31 (6) 180-66163',
  dateJoined: '2023-04-15',
  profileImage: '/images/profile/me.jpg'
};
// Dummy payment methods
const paymentMethods = [
  {
    id: 'card1',
    type: 'credit',
    name: 'Visa ending in 4242',
    lastFour: '4242',
    expiryDate: '09/26',
    isDefault: true
  },
  {
    id: 'card2',
    type: 'credit',
    name: 'Mastercard ending in 5555',
    lastFour: '5555',
    expiryDate: '12/25',
    isDefault: false
  },
  {
    id: 'paypal1',
    type: 'paypal',
    name: 'PayPal',
    email: 'alex.johnson@example.com',
    isDefault: false
  }
];

// Dummy payment history
const paymentHistory = [
  {
    id: 'pay1',
    date: '2024-05-01',
    amount: '€120.00',
    status: 'completed',
    method: 'Visa ending in 4242',
    description: 'Registration for NYC Marathon 2025'
  },
  {
    id: 'pay2',
    date: '2024-03-20',
    amount: '€70.00',
    status: 'refunded',
    method: 'PayPal',
    description: 'Registration for Paris City Half Marathon 2025',
    refundDate: '2024-04-01'
  },
  {
    id: 'pay3',
    date: '2024-02-15',
    amount: '€110.00',
    status: 'completed',
    method: 'Mastercard ending in 5555',
    description: 'Registration for Berlin Marathon 2025'
  },
  {
    id: 'pay4',
    date: '2024-01-10',
    amount: '€75.00',
    status: 'completed',
    method: 'Visa ending in 4242',
    description: 'Registration for London Half Marathon 2025'
  }
];

export default function ProfilePaymentPage() {
  const [activeTab, setActiveTab] = useState('payment');
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  return (
    <InnerPageLayout
      title="Payment Information"
      subtitle="Manage your payment methods and view transaction history"
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
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                <button 
                  onClick={() => setShowAddPaymentMethod(!showAddPaymentMethod)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Payment Method
                </button>
              </div>
              
              {showAddPaymentMethod && (
                <div className="mb-6 p-6 bg-black/30 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-4">Add New Payment Method</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Payment Type
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="paymentType" value="credit" className="mr-2" defaultChecked />
                          <span className="text-white">Credit Card</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="paymentType" value="paypal" className="mr-2" />
                          <span className="text-white">PayPal</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="cardholderName">
                        Cardholder Name
                      </label>
                      <input
                        id="cardholderName"
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="expiryDate">
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="cvv">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2 flex justify-end space-x-3">
                      <button 
                        onClick={() => setShowAddPaymentMethod(false)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Methods List */}
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 bg-black/30 border border-gray-800 rounded-lg">
                    <div className="flex items-center">
                      {method.type === 'credit' ? (
                        <div className="w-12 h-8 rounded-md bg-blue-600 flex items-center justify-center mr-4">
                          <svg className="w-8 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-12 h-8 rounded-md bg-blue-400 flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">PayPal</span>
                        </div>
                      )}
                      
                      <div>
                        <div className="text-white font-medium">{method.name}</div>
                        {method.type === 'credit' ? (
                          <div className="text-gray-400 text-sm">Expires {method.expiryDate}</div>
                        ) : (
                          <div className="text-gray-400 text-sm">{method.email}</div>
                        )}
                      </div>
                      
                      {method.isDefault && (
                        <span className="ml-4 px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-md">
                          Default
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {!method.isDefault && (
                        <button className="text-gray-400 hover:text-white transition-colors">
                          Set as Default
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-white transition-colors">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Payment History</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-3 pr-4">Date</th>
                      <th className="pb-3 pr-4">Description</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3 pr-4">Method</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-800 hover:bg-black/10">
                        <td className="py-4 pr-4">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 pr-4">
                          {payment.description}
                        </td>
                        <td className="py-4 pr-4 font-medium">
                          {payment.amount}
                        </td>
                        <td className="py-4 pr-4">
                          {payment.method}
                        </td>
                        <td className="py-4">
                          <PaymentStatusBadge status={payment.status} />
                          {payment.status === 'refunded' && payment.refundDate && (
                            <div className="text-xs text-gray-400 mt-1">
                              Refunded on {new Date(payment.refundDate).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {paymentHistory.length === 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No payment history yet</h3>
                  <p className="text-gray-400">Your payment transactions will appear here</p>
                </div>
              )}
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

// Payment Status Badge Component
function PaymentStatusBadge({ status }: { status: string }) {
  switch(status) {
    case 'completed':
      return (
        <span className="bg-green-900/50 text-green-300 px-2 py-1 text-xs font-semibold rounded">
          Completed
        </span>
      );
    case 'refunded':
      return (
        <span className="bg-yellow-900/50 text-yellow-300 px-2 py-1 text-xs font-semibold rounded">
          Refunded
        </span>
      );
    case 'pending':
      return (
        <span className="bg-blue-900/50 text-blue-300 px-2 py-1 text-xs font-semibold rounded">
          Pending
        </span>
      );
    case 'failed':
      return (
        <span className="bg-red-900/50 text-red-300 px-2 py-1 text-xs font-semibold rounded">
          Failed
        </span>
      );
    default:
      return null;
  }
} 
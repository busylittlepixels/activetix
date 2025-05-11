'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
if (typeof window !== 'undefined') {
  Chart.register(...registerables);
}

// Dummy revenue data
const monthlyRevenue = [
  { month: 'Jan', amount: 90000 },
  { month: 'Feb', amount: 142500 },
  { month: 'Mar', amount: 225000 },
  { month: 'Apr', amount: 405000 },
  { month: 'May', amount: 300000 },
  { month: 'Jun', amount: 262500 },
  { month: 'Jul', amount: 225000 },
  { month: 'Aug', amount: 285000 },
  { month: 'Sep', amount: 315000 },
  { month: 'Oct', amount: 360000 },
  { month: 'Nov', amount: 390000 },
  { month: 'Dec', amount: 345000 }
];

// Dummy revenue by event data
const revenueByEvent = [
  { event: 'Boston Marathon 2025', amount: 2437500 },
  { event: 'Boston Half Marathon', amount: 768000 },
  { event: 'Freedom Trail 10K', amount: 224000 },
  { event: 'Boston Marathon 2024', amount: 2268000 }
];

// Dummy revenue sources
const revenueSources = [
  { source: 'Registration Fees', percentage: 85 },
  { source: 'Merchandise', percentage: 10 },
  { source: 'Sponsorships', percentage: 5 }
];

// Dummy recent transactions
const recentTransactions = [
  { 
    id: 'tx1',
    date: '2024-05-15',
    description: 'Registration: Boston Marathon 2025', 
    participant: 'Emily Johnson',
    amount: 75.00,
    type: 'credit'
  },
  { 
    id: 'tx2',
    date: '2024-05-14',
    description: 'Registration: Boston Half Marathon', 
    participant: 'Michael Chen',
    amount: 60.00,
    type: 'credit'
  },
  { 
    id: 'tx3',
    date: '2024-05-14',
    description: 'Refund: Freedom Trail 10K', 
    participant: 'James Wilson',
    amount: 40.00,
    type: 'debit'
  },
  { 
    id: 'tx4',
    date: '2024-05-13',
    description: 'Registration: Boston Marathon 2025', 
    participant: 'Sarah Garcia',
    amount: 75.00,
    type: 'credit'
  }
];

export default function RevenuePage() {
  const [dateRange, setDateRange] = useState('year');
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const eventChartRef = useRef<HTMLCanvasElement>(null);
  const sourceChartRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Revenue chart
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: monthlyRevenue.map(d => d.month),
            datasets: [{
              label: 'Monthly Revenue (€)',
              data: monthlyRevenue.map(d => d.amount),
              backgroundColor: 'rgba(59, 130, 246, 0.8)'
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
                  color: '#9ca3af',
                  callback: function(value) {
                    return '€' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
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
  
  useEffect(() => {
    // Event revenue chart
    if (eventChartRef.current) {
      const ctx = eventChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: revenueByEvent.map(d => d.event),
            datasets: [{
              data: revenueByEvent.map(d => d.amount),
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(248, 113, 113, 0.8)'
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#e5e7eb',
                  padding: 15,
                  usePointStyle: true
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const value = context.raw as number;
                    return `€${value.toLocaleString()}`;
                  }
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
  
  useEffect(() => {
    // Revenue sources chart
    if (sourceChartRef.current) {
      const ctx = sourceChartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: revenueSources.map(d => d.source),
            datasets: [{
              data: revenueSources.map(d => d.percentage),
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(236, 72, 153, 0.8)'
              ]
            }]
          },
          options: {
            responsive: true,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#e5e7eb',
                  padding: 15,
                  usePointStyle: true
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const value = context.raw as number;
                    return `${value}%`;
                  }
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

  const totalRevenue = monthlyRevenue.reduce((acc, curr) => acc + curr.amount, 0);
  
  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-6 rounded-xl border border-blue-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-1">€{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            Annual Revenue
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 p-6 rounded-xl border border-indigo-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Average per Event</p>
              <h3 className="text-3xl font-bold text-white mt-1">€{Math.round(totalRevenue / revenueByEvent.length).toLocaleString()}</h3>
            </div>
            <div className="bg-indigo-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            Per Event Average
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-6 rounded-xl border border-purple-800/30 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Average per Participant</p>
              <h3 className="text-3xl font-bold text-white mt-1">€75</h3>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            Per Participant Average
          </div>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-black/30 rounded-lg p-1 inline-block">
        <button 
          className={`px-4 py-2 rounded-md text-sm ${dateRange === 'week' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          onClick={() => setDateRange('week')}
        >
          This Week
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm ${dateRange === 'month' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          onClick={() => setDateRange('month')}
        >
          This Month
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm ${dateRange === 'year' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          onClick={() => setDateRange('year')}
        >
          This Year
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm ${dateRange === 'custom' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          onClick={() => setDateRange('custom')}
        >
          Custom Range
        </button>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Revenue Trend</h3>
          <div className="h-64">
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </div>
        
        <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Revenue by Event</h3>
          <div className="h-64">
            <canvas ref={eventChartRef}></canvas>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-black/50 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Description</th>
                <th className="pb-3 pr-4">Participant</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-800 hover:bg-black/20">
                  <td className="py-4 pr-4">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-4 pr-4">{tx.description}</td>
                  <td className="py-4 pr-4">{tx.participant}</td>
                  <td className={`py-4 pr-4 font-medium ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'credit' ? '+' : '-'}€{tx.amount.toFixed(2)}
                  </td>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
} 
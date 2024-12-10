'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  CreditCardIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

// Sample data - replace with real data from your API
const monthlyData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
]

const dailyUsage = [
  { name: 'Mon', credits: 240 },
  { name: 'Tue', credits: 139 },
  { name: 'Wed', credits: 980 },
  { name: 'Thu', credits: 390 },
  { name: 'Fri', credits: 480 },
  { name: 'Sat', credits: 380 },
  { name: 'Sun', credits: 430 },
]

const userActivity = [
  { name: '00:00', users: 100 },
  { name: '04:00', users: 300 },
  { name: '08:00', users: 800 },
  { name: '12:00', users: 1200 },
  { name: '16:00', users: 900 },
  { name: '20:00', users: 500 },
  { name: '23:59', users: 200 },
]

const stats = [
  {
    name: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: UsersIcon,
  },
  {
    name: 'Credits Used',
    value: '24,981',
    change: '+8.2%',
    trend: 'up',
    icon: CreditCardIcon,
  },
  {
    name: 'Avg. Session Time',
    value: '4.2m',
    change: '-3.1%',
    trend: 'down',
    icon: ClockIcon,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '+2.4%',
    trend: 'up',
    icon: ChartBarIcon,
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-white/60">
          Track your application's performance and user engagement
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-[#111111] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white/60" />
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-white/60 text-sm font-medium">
                {stat.name}
              </h3>
              <p className="text-2xl font-bold text-white mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Monthly Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4ADE80"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Usage Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Credits Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="credits" fill="#FFBE1A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-white mb-6">User Activity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#FFBE1A"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 
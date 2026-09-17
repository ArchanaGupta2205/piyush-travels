'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, Car, CalendarClock, Activity } from 'lucide-react';
import StatCard from './_components/StatCard';
import { fetchAPI } from '@/lib/api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState<{
    revenue: number;
    totalVehicles: number;
    activeBookings: number;
    pendingRequests: number;
    revenueTrend?: number | null;
  }>({
    revenue: 0,
    totalVehicles: 0,
    activeBookings: 0,
    pendingRequests: 0,
    revenueTrend: null,
  });
  const [data, setData] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes, chartRes] = await Promise.allSettled([
          fetchAPI('/admin/dashboard-stats'),
          fetchAPI('/admin/recent-bookings'),
          fetchAPI('/admin/revenue-chart')
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
          setStats(statsRes.value.data);
        }
        if (bookingsRes.status === 'fulfilled' && bookingsRes.value?.success) {
          setRecentBookings(bookingsRes.value.data);
        }
        if (chartRes.status === 'fulfilled' && chartRes.value?.success) {
          setData(chartRes.value.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', color: 'var(--text-primary)' }}>Loading dashboard...</div>;
  }

  const totalChartRevenue = data.reduce((sum, item) => sum + (Number(item.revenue) || 0), 0);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title text-gradient">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Welcome back, here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString('en-IN')}`} 
          icon={IndianRupee} 
          trend={stats.revenueTrend !== null && stats.revenueTrend !== undefined ? stats.revenueTrend : undefined} 
          trendText={stats.revenueTrend !== null && stats.revenueTrend !== undefined ? "vs last month" : undefined}
          colorClass="primary" 
        />
        <StatCard 
          title="Total Vehicles" 
          value={stats.totalVehicles} 
          icon={Car} 
          colorClass="info" 
        />
        <StatCard 
          title="Active Bookings" 
          value={stats.activeBookings} 
          icon={Activity} 
          colorClass="success" 
        />
        <StatCard 
          title="Pending Requests" 
          value={stats.pendingRequests} 
          icon={CalendarClock} 
          trendText={stats.pendingRequests > 0 ? "needs action" : undefined}
          colorClass="warning" 
        />
      </div>

      <div className="dashboard-content">
        <div className="chart-section glass-panel">
          <div className="section-header flex-between" style={{ alignItems: 'flex-start' }}>
            <div>
              <h3>Revenue Overview</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Real-time booking revenue from completed payments
              </p>
            </div>
            {totalChartRevenue === 0 && (
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '4px 10px', 
                borderRadius: '9999px', 
                background: 'rgba(255,255,255,0.06)', 
                color: 'var(--text-muted)',
                border: '1px solid var(--border-glass)' 
              }}>
                Live: ₹0 revenue yet
              </span>
            )}
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" tickFormatter={(val) => `₹${Number(val).toLocaleString('en-IN')}`} />
                <Tooltip 
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} 
                  itemStyle={{ color: 'var(--text-primary)' }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="recent-bookings-section glass-panel">
          <div className="section-header flex-between">
            <h3>Recent Bookings</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.vehicle}</td>
                    <td>
                      <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  newCustomers: number;
  recentOrders: { id: string; total: number; status: string; createdAt: string; user?: { email: string } }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold">€{Number(stats.totalRevenue).toFixed(2)}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">New Customers (30d)</p>
          <p className="text-3xl font-bold">{stats.newCustomers}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Recent Orders</h2>
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Date</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-mono">#{order.id.slice(-8).toUpperCase()}</td>
                <td className="p-3">{order.user?.email || 'Guest'}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{order.status}</span>
                </td>
                <td className="p-3">€{Number(order.total).toFixed(2)}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <Link href={`/admin/orders/${order.id}`} className="underline text-xs">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/admin/orders" className="mt-4 inline-block underline text-sm">View All Orders →</Link>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: { product: { name: string; images: string[] }; quantity: number }[];
}

const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-600',
};

export default function AccountDashboard() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders/my-orders').then((r) => setOrders(r.data.orders)).catch(() => {});
  }, []);

  const recent = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-black text-white rounded-xl px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm mb-1">Welcome back</p>
          <h1 className="text-2xl font-bold">{user?.name ?? user?.email}</h1>
        </div>
        <span className="text-4xl select-none">👋</span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: orders.length },
          {
            label: 'Total Spent',
            value: `€${orders.reduce((s, o) => s + Number(o.total), 0).toFixed(2)}`,
          },
          {
            label: 'Active Orders',
            value: orders.filter((o) => ['PENDING', 'PROCESSING', 'SHIPPED'].includes(o.status)).length,
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-4">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/account/orders', icon: '📦', label: 'My Orders' },
          { href: '/account/profile', icon: '✏️', label: 'Edit Profile' },
          { href: '/account/security', icon: '🔒', label: 'Change Password' },
          { href: '/', icon: '🛍️', label: 'Shop Again' },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="bg-white border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-black transition text-center"
          >
            <span className="text-2xl">{q.icon}</span>
            <span className="text-xs font-medium">{q.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      {recent.length > 0 && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-semibold">Recent Orders</h2>
            <Link href="/account/orders" className="text-xs underline text-gray-500">View all</Link>
          </div>
          <div className="divide-y">
            {recent.map((order) => (
              <div key={order.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-sm">#{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {order.items.map((i) => `${i.product.name} ×${i.quantity}`).join(', ')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[order.status] ?? 'bg-gray-100'}`}>
                    {order.status}
                  </span>
                  <p className="font-semibold text-sm">€{Number(order.total).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

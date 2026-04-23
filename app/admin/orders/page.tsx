'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

const STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  guestEmail?: string;
  user?: { email: string; name: string };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (statusFilter) params.set('status', statusFilter);
    const res = await api.get(`/admin/orders?${params}`);
    setOrders(res.data.orders);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [page, statusFilter]);

  const updateStatus = async (orderId: string, status: string) => {
    await api.patch(`/admin/orders/${orderId}/status`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders ({total})</h1>

      <div className="mb-4 flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Order</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3 font-mono">#{order.id.slice(-8).toUpperCase()}</td>
                  <td className="p-3">{order.user?.email || order.guestEmail || 'Guest'}</td>
                  <td className="p-3">€{Number(order.total).toFixed(2)}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="border px-3 py-1 rounded disabled:opacity-40">Prev</button>
        <span className="px-3 py-1">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="border px-3 py-1 rounded">Next</button>
      </div>
    </div>
  );
}

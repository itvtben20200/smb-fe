'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

const FILTER_STATUSES = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

const POST_APPROVAL_STATUSES = ['PROCESSING', 'DELIVERED', 'REFUNDED'];

const STATUS_LABEL: Record<string, string> = { DELIVERED: 'COMPLETED' };
const getLabel = (s: string) => STATUS_LABEL[s] ?? s;

const STATUS_BADGE: Record<string, string> = {
  PENDING:    'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  DELIVERED:  'bg-green-100 text-green-800',
  CANCELLED:  'bg-red-100 text-red-800',
  REFUNDED:   'bg-gray-100 text-gray-700',
};

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
  const [updating, setUpdating] = useState<string | null>(null);

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
    setUpdating(orderId);
    await api.patch(`/admin/orders/${orderId}/status`, { status });
    await fetchOrders();
    setUpdating(null);
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
          {FILTER_STATUSES.map((s) => <option key={s} value={s}>{getLabel(s)}</option>)}
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
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isUpdating = updating === order.id;
                const isPending = order.status === 'PENDING';
                    const isApproved = POST_APPROVAL_STATUSES.includes(order.status);
                return (
                  <tr key={order.id} className="border-t">
                    <td className="p-3 font-mono">#{order.id.slice(-8).toUpperCase()}</td>
                    <td className="p-3">{order.user?.email || order.guestEmail || 'Guest'}</td>
                    <td className="p-3">€{Number(order.total).toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[order.status] ?? 'bg-gray-100'}`}>
                        {getLabel(order.status)}
                      </span>
                    </td>
                    <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      {isPending ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(order.id, 'PROCESSING')}
                            disabled={isUpdating}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(order.id, 'CANCELLED')}
                            disabled={isUpdating}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                          >
                            Deny
                          </button>
                        </div>
                      ) : isApproved ? (
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          disabled={isUpdating}
                          className="border rounded px-2 py-1 text-xs disabled:opacity-50"
                        >
                          {POST_APPROVAL_STATUSES.map((s) => <option key={s} value={s}>{getLabel(s)}</option>)}
                        </select>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
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

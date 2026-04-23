'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface OrderItem {
  product: { name: string; images: string[] };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  createdAt: string;
  items: OrderItem[];
}

const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-600',
  REFUNDED: 'bg-gray-100 text-gray-600',
};

function downloadReceipt(order: Order) {
  import('jspdf').then(({ jsPDF }) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const ref = order.id.slice(-8).toUpperCase();
    const date = new Date(order.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('SMB Store', 20, 22);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120);
    doc.text('Receipt', 20, 29);
    doc.setTextColor(0);
    doc.text(`Order #${ref}`, 140, 22);
    doc.text(`Date: ${date}`, 140, 28);
    doc.setDrawColor(220);
    doc.line(20, 34, 190, 34);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 38, 170, 7, 'F');
    doc.text('Product', 23, 43.5);
    doc.text('Qty', 130, 43.5);
    doc.text('Unit Price', 148, 43.5);
    doc.text('Total', 172, 43.5);

    doc.setFont('helvetica', 'normal');
    let y = 55;
    order.items.forEach((item) => {
      const unitPrice = Number(item.price);
      doc.text(item.product.name, 23, y);
      doc.text(String(item.quantity), 133, y);
      doc.text(`€${unitPrice.toFixed(2)}`, 148, y);
      doc.text(`€${(unitPrice * item.quantity).toFixed(2)}`, 172, y);
      y += 8;
    });

    doc.setDrawColor(220);
    doc.line(20, y, 190, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal', 140, y);
    doc.text(`€${Number(order.subtotal).toFixed(2)}`, 172, y);
    y += 7;
    doc.text('Shipping', 140, y);
    doc.text(`€${Number(order.shippingCost ?? 0).toFixed(2)}`, 172, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Total', 140, y);
    doc.text(`€${Number(order.total).toFixed(2)}`, 172, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Thank you for your purchase. SMB Store — smbstore.com', 20, 280);
    doc.save(`SMB-Receipt-${ref}.pdf`);
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.get('/orders/my-orders')
      .then((r) => setOrders(r.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-sm text-gray-500 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-medium mb-1">No orders yet</p>
          <p className="text-sm text-gray-500 mb-5">Your purchases will appear here once you complete a checkout.</p>
          <a href="/" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Start Shopping →
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isOpen = expanded === order.id;
            const ref = order.id.slice(-8).toUpperCase();
            return (
              <div key={order.id} className="bg-white border rounded-xl overflow-hidden">
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-sm">#{ref}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 hidden sm:block line-clamp-1 max-w-xs">
                      {order.items.map((i) => `${i.product.name} ×${i.quantity}`).join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium hidden sm:inline-block ${statusColor[order.status] ?? 'bg-gray-100'}`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-sm">€{Number(order.total).toFixed(2)}</p>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t px-5 py-4 bg-gray-50 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[order.status] ?? 'bg-gray-100'}`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="bg-white border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                            <th className="text-left px-4 py-2.5">Product</th>
                            <th className="text-center px-4 py-2.5">Qty</th>
                            <th className="text-right px-4 py-2.5">Unit Price</th>
                            <th className="text-right px-4 py-2.5">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {order.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-3 font-medium">{item.product.name}</td>
                              <td className="px-4 py-3 text-center text-gray-500">{item.quantity}</td>
                              <td className="px-4 py-3 text-right text-gray-500">€{Number(item.price).toFixed(2)}</td>
                              <td className="px-4 py-3 text-right font-medium">€{(Number(item.price) * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="border-t bg-gray-50 text-sm">
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-gray-500">Subtotal</td>
                            <td className="px-4 py-2 text-right">€{Number(order.subtotal).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="px-4 py-1 text-right text-gray-500">Shipping</td>
                            <td className="px-4 py-1 text-right">€{Number(order.shippingCost ?? 0).toFixed(2)}</td>
                          </tr>
                          <tr className="font-bold">
                            <td colSpan={3} className="px-4 py-2.5 text-right">Total</td>
                            <td className="px-4 py-2.5 text-right">€{Number(order.total).toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => downloadReceipt(order)}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
                        </svg>
                        Download Receipt (PDF)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

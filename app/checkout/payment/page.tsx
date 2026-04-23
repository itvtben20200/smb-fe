'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { api } from '@/lib/api';
import { Suspense } from 'react';

function formatCard(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2);
  return digits;
}

function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sid = searchParams.get('sid');
  const { clearCart } = useCartStore();

  const [card, setCard] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    const rawCard = card.replace(/\s/g, '');
    if (rawCard.length < 16) { setError('Enter a valid 16-digit card number.'); return; }
    if (!name.trim()) { setError('Enter the name on card.'); return; }
    const [mm] = expiry.replace(/\s/g, '').split('/');
    if (!mm || parseInt(mm) < 1 || parseInt(mm) > 12) { setError('Enter a valid expiry date (MM / YY).'); return; }
    if (cvc.replace(/\D/g, '').length < 3) { setError('Enter a valid CVV.'); return; }

    setLoading(true);
    try {
      const res = await api.post(`/orders/checkout/mock-confirm?sid=${sid}`);
      clearCart();
      router.push(res.data.url.replace(/^https?:\/\/[^/]+/, ''));
    } catch {
      setError('Payment could not be processed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!sid) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Invalid payment session.</p>
        <Link href="/cart" className="underline text-sm">← Back to cart</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      {/* Test mode banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 mb-8 flex items-center gap-3 text-sm text-amber-800">
        <span className="text-lg">🧪</span>
        <div>
          <strong>Test mode</strong> — No real payment will be taken.
          Enter any card details to proceed.
        </div>
      </div>

      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Payment details</h1>
          <div className="flex gap-1.5">
            <span className="text-xs bg-gray-100 border rounded px-1.5 py-0.5 font-mono">VISA</span>
            <span className="text-xs bg-gray-100 border rounded px-1.5 py-0.5 font-mono">MC</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Card number */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Card number</label>
            <input
              value={card}
              onChange={(e) => setCard(formatCard(e.target.value))}
              placeholder="1234 5678 9012 3456"
              className="w-full border rounded-lg px-4 py-3 font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-black"
              inputMode="numeric"
            />
          </div>

          {/* Name on card */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Name on card</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Expiry</label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM / YY"
                className="w-full border rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
                inputMode="numeric"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">CVV</label>
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                className="w-full border rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
                inputMode="numeric"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 font-semibold text-sm transition mt-2"
          >
            {loading ? 'Processing...' : 'Pay now'}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
          <span>🔒</span>
          <span>Secured by SSL · Powered by Stripe</span>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link href="/cart" className="text-sm text-gray-400 hover:text-black hover:underline transition">
          ← Cancel and return to cart
        </Link>
      </div>
    </div>
  );
}

export default function MockPaymentPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <PaymentForm />
    </Suspense>
  );
}

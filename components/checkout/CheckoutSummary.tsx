'use client';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CheckoutSummary() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Defer rendering until after hydration to avoid SSR/localStorage mismatch
  useEffect(() => { setMounted(true); }, []);

  const orderTotal = mounted ? total() : 0;

  return (
    <div className="border rounded-xl p-6 bg-white sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Order Summary</h2>
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition"
        >
          + Add more
        </Link>
      </div>

      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-start gap-3">
            {item.image && (
              <div className="relative flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg border"
                />
                <span className="absolute -top-1.5 -right-1.5 bg-gray-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-gray-500 mb-1.5">€{Number(item.price).toFixed(2)} / licence</p>
              {/* Quantity +/- */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="w-6 h-6 border rounded text-xs hover:bg-gray-50 transition"
                >−</button>
                <span className="text-xs w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="w-6 h-6 border rounded text-xs hover:bg-gray-50 transition"
                >+</button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="ml-2 text-xs text-gray-400 hover:text-red-500 transition"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="text-sm font-medium flex-shrink-0">
              €{(Number(item.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">
          Your order is empty.{' '}
          <Link href="/" className="underline hover:text-black">Browse solutions</Link>
        </p>
      )}

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>€{Number(orderTotal).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="text-green-600 font-medium">Digital — instant</span>
        </div>
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between font-bold">
        <span>Total</span>
        <span>€{orderTotal.toFixed(2)}</span>
      </div>

      <div className="mt-4 pt-4 border-t space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>🔒</span>
          <span>SSL encrypted · Powered by Stripe</span>
        </div>
        <div className="flex gap-3 text-xs">
          <Link href="/cart" className="text-gray-400 hover:text-black transition hover:underline">← Edit cart</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-gray-400 hover:text-black transition hover:underline">Browse solutions</Link>
        </div>
      </div>
    </div>
  );
}

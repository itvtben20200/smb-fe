'use client';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const subtotal = mounted ? total() : 0;
  const orderTotal = subtotal;

  // Avoid rendering cart contents before hydration (Zustand reads from localStorage on client only)
  if (!mounted) {
    return <div className="text-center py-24 text-gray-300">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some items to get started.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({items.length} item{items.length !== 1 ? 's' : ''})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 border rounded-xl p-4 bg-white">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-gray-500 text-sm">€{Number(item.price).toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="w-8 h-8 border rounded-lg hover:bg-gray-50 transition font-medium"
                >−</button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="w-8 h-8 border rounded-lg hover:bg-gray-50 transition font-medium"
                >+</button>
              </div>
              <p className="font-semibold w-16 text-right">
                €{(Number(item.price) * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-gray-400 hover:text-red-500 transition ml-1"
                aria-label="Remove item"
              >✕</button>
            </div>
          ))}

          <div className="pt-2">
            <Link href="/" className="text-sm text-gray-500 hover:underline">← Continue Shopping</Link>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-80">
          <div className="border rounded-xl p-6 bg-white sticky top-4">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                  <span className="flex-shrink-0">€{(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>€{Number(subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="text-green-600 font-medium">Digital — instant access</span>
              </div>
            </div>

            <div className="border-t my-4" />

            <div className="flex justify-between font-bold text-base mb-5">
              <span>Total</span>
              <span>€{orderTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Proceed to Checkout →
            </Link>
            <p className="text-xs text-gray-400 text-center mt-3">Secure checkout · SSL encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export function Navbar() {
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const { user, logout } = useAuthStore();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">SMB Store</Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/">Shop</Link>
          <Link href="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
                <Link href="/admin/dashboard">Admin</Link>
              )}
              <Link href="/account">My Account</Link>
              <button onClick={logout} className="underline">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register" className="bg-black text-white px-3 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

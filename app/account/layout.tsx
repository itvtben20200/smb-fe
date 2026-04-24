'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

const customerNavItems = [
  { href: '/account', label: 'Dashboard', icon: '🏠' },
  { href: '/account/orders', label: 'Order History', icon: '📦' },
  { href: '/account/profile', label: 'My Profile', icon: '👤' },
  { href: '/account/security', label: 'Password & Security', icon: '🔒' },
];

const adminNavItems = [
  { href: '/account/profile', label: 'My Profile', icon: '👤' },
  { href: '/account/security', label: 'Password & Security', icon: '🔒' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/auth/login');
  }, [user, router]);

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN' || user.role === 'SUPERADMIN';
  const navItems = isAdmin ? adminNavItems : customerNavItems;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          {/* User card */}
          <div className="bg-white border rounded-xl p-5 mb-4">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold mb-3">
              {(user.name ?? user.email)[0].toUpperCase()}
            </div>
            <p className="font-semibold leading-tight">{user.name ?? 'My Account'}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="bg-white border rounded-xl overflow-hidden">
            {navItems.map((item) => {
              const active =
                item.href === '/account'
                  ? pathname === '/account'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm border-b last:border-b-0 transition-colors ${
                    active ? 'bg-black text-white font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-sm border-b text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span>⚙️</span> Admin Panel
              </Link>
            )}
            <button
              onClick={async () => { await logout(); router.push('/'); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span> Log out
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

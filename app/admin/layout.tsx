'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-56 flex-shrink-0">
        <div className="bg-black text-white rounded-xl p-5 mb-4">
          <p className="text-white/60 text-xs mb-1 uppercase tracking-widest">Admin Panel</p>
          <p className="font-bold text-lg">SMB Store</p>
        </div>

        <nav className="bg-white border rounded-xl overflow-hidden">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
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
          <Link
            href="/account"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span>👤</span> My Account
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

import type { Metadata } from 'next';
import './globals.css';

import { Navbar } from '@/components/layout/Navbar';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { FooterSection } from '@/components/marketing/FooterSection';

export const metadata: Metadata = {
  title: 'SMB Store',
  description: 'SMB E-Commerce Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main>
          {/* Only wrap the main content in a container, not full-width sections */}
          {children}
        </main>
        <FooterSection />
        <ChatWidget />
      </body>
    </html>
  );
}

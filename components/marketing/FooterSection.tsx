import React from 'react';

export function FooterSection() {
  return (
    <footer className="w-full bg-[#081d3b] text-gray-400 pt-16 pb-8 px-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-black">IT</span>
              </div>
              <span className="font-bold text-white text-lg">SMB Portal</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">The enterprise SMB platform for manufacturing and service businesses across DACH &amp; Europe.</p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">in</a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">X</a>
              <a href="#" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">yt</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">CRM for Manufacturing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SMB Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automation Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics Add-On</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Service Lite</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bookings Add-On</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About ITVT</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <span>© 2026 IT Vision Technology GmbH · SMB Portal. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">GDPR</a>
            <a href="#" className="hover:text-white transition-colors">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

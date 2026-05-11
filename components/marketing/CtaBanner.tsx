
"use client";
import React from 'react';

export function CtaBanner() {
  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-br from-[#0f2d59] via-[#1a4d8a] to-[#1e3f6e] text-white py-24 px-0"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="pt-2">
            <span className="inline-block bg-white/10 text-blue-200 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 border border-white/10">Get in Touch</span>
            <h2 className="text-4xl xl:text-5xl font-extrabold mb-5 leading-tight">Ready to Build Your<br />Smarter Business?</h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Book a free consultation with our team or create your account today. No credit card, no commitments — just clarity on how SMB Portal fits your business.
            </p>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li className="flex items-center gap-2.5"><span className="text-green-400 font-bold">✓</span> 14-day free trial on all plans</li>
              <li className="flex items-center gap-2.5"><span className="text-green-400 font-bold">✓</span> Dedicated onboarding — included, no extra cost</li>
              <li className="flex items-center gap-2.5"><span className="text-green-400 font-bold">✓</span> GDPR compliant · EU-hosted data centers</li>
              <li className="flex items-center gap-2.5"><span className="text-green-400 font-bold">✓</span> Cancel any time — no lock-in, no penalties</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-800">
            <h3 className="font-extrabold text-[#0f2d59] text-xl mb-1">Book a Consultation</h3>
            <p className="text-gray-500 text-sm mb-6">Or <a href="#" className="text-[#2563eb] font-semibold hover:underline">create a free account</a> and start immediately.</p>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">First Name</label>
                  <input type="text" placeholder="Maria" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Last Name</label>
                  <input type="text" placeholder="Kowalski" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Work Email</label>
                <input type="email" placeholder="maria@company.com" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Company Name</label>
                <input type="text" placeholder="TechFab GmbH" className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">I'm interested in</label>
                <select className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option>CRM for Manufacturing</option>
                  <option>SMB Portal / Operations Hub</option>
                  <option>Automation Tools</option>
                  <option>Analytics &amp; Reporting</option>
                  <option>Customer Service Lite</option>
                  <option>Bookings Add-On</option>
                  <option>Full Platform</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3 pt-1">
                <button type="submit" className="bg-[#0f2d59] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#1a4d8a] transition-colors">
                  Book a Consultation
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">By submitting, you agree to our <a href="#" className="underline">Privacy Policy</a>. No spam, ever.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

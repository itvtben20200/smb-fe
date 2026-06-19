
"use client";
import React from 'react';
import Script from 'next/script';

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
            <div
              data-form-id="34089e9d-366a-f111-a826-7c1e52833fc1"
              data-form-api-url="https://public-eur.mkt.dynamics.com/api/v1.0/orgs/fcd37353-59db-4c57-a5fb-223d41e19fdd/landingpageforms"
              data-cached-form-url="https://assets-eur.mkt.dynamics.com/fcd37353-59db-4c57-a5fb-223d41e19fdd/digitalassets/forms/34089e9d-366a-f111-a826-7c1e52833fc1"
            ></div>
            <Script
              src="https://formui-usa1.mkt.dynamics.com/eur/FormLoader/FormLoader.bundle.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

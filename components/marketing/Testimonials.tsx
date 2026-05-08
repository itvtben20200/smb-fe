import React from 'react';

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[#2563eb] text-sm font-semibold uppercase tracking-widest">Social Proof</span>
          <h2 className="text-4xl font-extrabold text-[#0f2d59] mt-3 mb-3">Trusted by Teams Like Yours</h2>
          <p className="text-gray-400 text-sm">500+ companies growing faster with SMB Portal</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <span className="bg-gray-100 text-gray-500 font-bold text-sm px-5 py-2 rounded-full border border-gray-200">TechFab GmbH</span>
          <span className="bg-gray-100 text-gray-500 font-bold text-sm px-5 py-2 rounded-full border border-gray-200">ProServ AG</span>
          <span className="bg-gray-100 text-gray-500 font-bold text-sm px-5 py-2 rounded-full border border-gray-200">Mittelstand Solutions</span>
          <span className="bg-gray-100 text-gray-500 font-bold text-sm px-5 py-2 rounded-full border border-gray-200">EuroMach Industries</span>
          <span className="bg-gray-100 text-gray-500 font-bold text-sm px-5 py-2 rounded-full border border-gray-200">AlpenTech</span>
          <span className="bg-gray-100 text-gray-500 font-bold text-sm px-5 py-2 rounded-full border border-gray-200">NordBau GmbH</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              "QuickStart MSH transformed how our sales team handles complex manufacturing quotes. What used to take hours now takes minutes. The ROI was undeniable within 30 days."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2563eb] font-bold text-sm flex-shrink-0">MK</div>
              <div>
                <div className="font-semibold text-[#0f2d59] text-sm">Maria K.</div>
                <div className="text-xs text-gray-400">Operations Director, TechFab GmbH</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              "The Operations Hub gives us one place to manage everything. Our entire team was onboarded in a single day — without external consultants. Impressive product, impressive team."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">TB</div>
              <div>
                <div className="font-semibold text-[#0f2d59] text-sm">Thomas B.</div>
                <div className="text-xs text-gray-400">CEO, Mittelstand Solutions</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8">
            <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              "The Analytics Add-On alone paid for the entire platform in the first quarter. We discovered margin leaks we didn't even know existed. I recommend it to every CFO I know."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm flex-shrink-0">SL</div>
              <div>
                <div className="font-semibold text-[#0f2d59] text-sm">Sandra L.</div>
                <div className="text-xs text-gray-400">CFO, ProServ AG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

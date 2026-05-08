'use client';
import Link from 'next/link';

export function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden mb-12 pb-24"
      style={{
        minHeight: '480px',
        width: '100vw',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Background gradient — deep navy → indigo → violet (SaaS / software feel) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)',
        }}
      />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Glowing orbs — decorative depth */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{
          width: '520px',
          height: '520px',
          top: '-140px',
          right: '-80px',
          background: 'radial-gradient(circle, #818cf8 0%, #4f46e5 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          width: '360px',
          height: '360px',
          bottom: '-100px',
          left: '60px',
          background: 'radial-gradient(circle, #a78bfa 0%, #7c3aed 60%, transparent 100%)',
        }}
      />

      {/* ── Centered content container ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 flex items-center" style={{ minHeight: '480px' }}>

      {/* Abstract "screen / dashboard" illustration — right side */}
      <div
        className="absolute right-0 top-1/2 pointer-events-none hidden lg:block"
        style={{ transform: 'translateY(-50%)' }}
      >
        {/* Outer window frame */}
        <div
          className="rounded-xl border border-white/10 shadow-2xl"
          style={{
            width: '340px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-3 text-white/40 text-xs font-mono">smb-dashboard.app</span>
          </div>

          {/* Mock dashboard content */}
          <div className="p-5 space-y-4">
            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Orders', value: '1,284' },
                { label: 'Revenue', value: '€48.2k' },
                { label: 'Products', value: '96' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <p className="text-white/40 text-xs mb-1">{s.label}</p>
                  <p className="text-white font-semibold text-sm">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Chart bar mock */}
            <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="text-white/40 text-xs mb-3">Monthly Sales</p>
              <div className="flex items-end gap-2 h-16">
                {[40, 65, 55, 80, 70, 95, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 5
                          ? 'linear-gradient(to top, #818cf8, #a78bfa)'
                          : 'rgba(129,140,248,0.3)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Order list mock */}
            <div className="space-y-2">
              {['Enterprise Suite', 'Cloud Storage', 'Dev Tools'].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded"
                      style={{ background: 'rgba(129,140,248,0.4)' }}
                    />
                    <span className="text-white/70 text-xs">{name}</span>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: 'rgba(52,211,153,0.15)',
                      color: '#34d399',
                    }}
                  >
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-col justify-center py-16 max-w-xl">
        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 w-fit"
          style={{
            background: 'rgba(129,140,248,0.15)',
            color: '#a5b4fc',
            border: '1px solid rgba(129,140,248,0.3)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#818cf8' }}
          />
          SMB Enterprise Platform
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Powerful Software
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #a5b4fc 0%, #e879f9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Solutions
          </span>{' '}
          for Your Business
        </h1>

        <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
          Streamline your operations with our enterprise-grade suite — secure checkout,
          automated workflows, CRM integration, and real-time analytics. All in one platform.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
            }}
          >
            Browse Products
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:bg-white/10 active:scale-95"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Get Started Free
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-5 mt-10">
          {[
            { icon: '🔒', text: 'Secure Checkout' },
            { icon: '⚡', text: 'Instant Delivery' },
            { icon: '🌍', text: 'EU Compliant' },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-1.5 text-white/45 text-xs">
              <span>{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* end centered container */}
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: '140px' }}
        >
          {/* back wave — slightly transparent for layered depth */}
          <path
            d="M0,90 C180,40 360,120 540,75 C720,30 900,110 1080,65 C1260,20 1380,95 1440,75 L1440,140 L0,140 Z"
            fill="rgba(255,255,255,0.35)"
          />
          {/* front wave */}
          <path
            d="M0,110 C200,55 400,140 600,90 C800,40 1000,125 1200,80 C1320,55 1400,110 1440,100 L1440,140 L0,140 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

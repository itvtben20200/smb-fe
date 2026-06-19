'use client';

import { useState } from 'react';
import { productExtras, type FeatureTier, type ProductExtra } from '@/lib/productContent';

interface Props {
  slug: string;
  features: string[];
}

const TIER_CONFIG: Record<FeatureTier, { label: string; dot: string; badge: string }> = {
  core: {
    label: 'Enthalten',
    dot: 'bg-blue-500',
    badge: 'bg-blue-50 text-blue-700',
  },
  addon: {
    label: 'Modul',
    dot: 'bg-violet-500',
    badge: 'bg-violet-50 text-violet-700',
  },
  enterprise: {
    label: 'KI / Enterprise',
    dot: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700',
  },
};

export function ProductSections({ slug, features }: Props) {
  const extra = productExtras[slug];
  if (!extra) return null;

  return (
    <>
      <BenefitsGrid extra={extra} />
      <WhatsIncluded extra={extra} features={features} />
      <WhoItsFor extra={extra} />
      <ProductFAQ extra={extra} />
      <LeadForm extra={extra} />
    </>
  );
}

// ── Section 3: Benefits Grid ────────────────────────────────────────────────
function BenefitsGrid({ extra }: { extra: ProductExtra }) {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border"
            style={{
              color: extra.accentHex,
              background: extra.accentLightHex,
              borderColor: extra.accentHex + '33',
            }}
          >
            Ihre Vorteile
          </span>
          <h2 className="text-3xl font-extrabold text-[#0f2d59] mb-2">
            Warum QuickStart der richtige Start ist
          </h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Vorkonfiguriert, fixpreisbasiert und in wenigen Tagen einsatzbereit – entwickelt für den deutschen Mittelstand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {extra.benefits.map((b, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border"
              style={{ background: '#fafafa', borderColor: '#ebebeb' }}
            >
              {/* Icon box */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0"
                style={{ background: extra.accentLightHex }}
              >
                {b.icon}
              </div>
              <h3 className="font-bold text-[#0f2d59] mb-2">{b.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 4: What's Included (2-col sticky) ───────────────────────────────
function WhatsIncluded({
  extra,
  features,
}: {
  extra: ProductExtra;
  features: string[];
}) {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left — sticky */}
          <div className="lg:w-[36%] lg:sticky lg:top-24 self-start">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border"
              style={{
                color: extra.accentHex,
                background: extra.accentLightHex,
                borderColor: extra.accentHex + '33',
              }}
            >
              Leistungsumfang
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f2d59] mb-4">Was ist enthalten</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Alle Funktionen sind im monatlichen Fixpreis enthalten. Optionale Module können jederzeit dazugebucht werden.
            </p>

            {/* Tier legend */}
            <div className="space-y-3">
              {(Object.entries(TIER_CONFIG) as [FeatureTier, typeof TIER_CONFIG[FeatureTier]][]).map(
                ([tier, cfg]) => (
                  <div key={tier} className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right — feature list */}
          <div className="flex-1">
            <div className="space-y-2">
              {features.map((f, i) => {
                const tier: FeatureTier = extra.featureTiers[f] ?? 'core';
                const cfg = TIER_CONFIG[tier];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className="text-sm text-gray-700 flex-1">{f}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 5: Who It's For ─────────────────────────────────────────────────
function WhoItsFor({ extra }: { extra: ProductExtra }) {
  return (
    <section
      className="py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)',
        /* full-bleed trick */
        width: '100vw',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-white/20 text-white/60">
            Zielgruppe
          </span>
          <h2 className="text-3xl font-extrabold text-white">Für wen ist diese Lösung?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {extra.whoItsFor.map((w, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="text-5xl font-black text-white/15 block mb-3 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-bold text-white text-sm mb-2">{w.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 6: FAQ (accordion) ──────────────────────────────────────────────
function ProductFAQ({ extra }: { extra: ProductExtra }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left */}
          <div className="lg:w-[36%] lg:sticky lg:top-24 self-start">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border"
              style={{
                color: extra.accentHex,
                background: extra.accentLightHex,
                borderColor: extra.accentHex + '33',
              }}
            >
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f2d59] mb-4">Häufige Fragen</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Sie haben weitere Fragen? Unser Team berät Sie individuell und unverbindlich.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="flex-1 space-y-3">
            {extra.faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-semibold text-[#0f2d59] text-sm">{item.question}</span>
                    <span
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? '300px' : '0px' }}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section 7: Lead Gen Form ────────────────────────────────────────────────
function LeadForm({ extra }: { extra: ProductExtra }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend /leads endpoint
    setSent(true);
  };

  const inputClass =
    'w-full text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition';
  const inputStyle = {
    background: '#fafafa',
    border: '1.5px solid #ebe6dc',
    borderRadius: '10px',
  };

  return (
    <section className="py-20 px-4" style={{ background: '#f5f2ee' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left — sticky */}
          <div className="lg:w-[42%] lg:sticky lg:top-24 self-start">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border"
              style={{
                color: extra.accentHex,
                background: extra.accentLightHex,
                borderColor: extra.accentHex + '33',
              }}
            >
              Kontakt
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f2d59] mb-4 leading-tight">
              Haben Sie eine Frage?<br />Schreiben Sie uns.
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Unser Team beantwortet Ihre Fragen zu Funktionsumfang, Implementierung und Preisen – persönlich, transparent und ohne Verkaufsdruck.
            </p>
            <ul className="space-y-2.5">
              {[
                'Individuelle Beratung ohne Verpflichtung',
                'Antwort innerhalb von 1 Werktag',
                'Live-Demo auf Wunsch buchbar',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                    style={{ background: extra.accentHex }}>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-bold text-[#0f2d59] text-lg mb-2">Nachricht erhalten!</h3>
                <p className="text-gray-500 text-sm">Wir melden uns innerhalb von 1 Werktag bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Maria Müller"
                    className={inputClass}
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Work E-Mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="maria@unternehmen.de"
                    className={inputClass}
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Unternehmen
                  </label>
                  <input
                    type="text"
                    placeholder="TechFab GmbH"
                    className={inputClass}
                    style={inputStyle}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Ihre Nachricht
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Beschreiben Sie kurz Ihre Anforderungen oder Fragen…"
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'none' }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition hover:opacity-90 active:scale-95"
                  style={{ background: extra.accentHex }}
                >
                  Nachricht senden
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Mit dem Absenden stimmen Sie unserer{' '}
                  <a href="#" className="underline">Datenschutzerklärung</a> zu. Kein Spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

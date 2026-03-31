'use client';

import { useState } from 'react';

export default function Affiliate() {
  const [openFaq, setOpenFaq] = useState<number>(0); // First FAQ open by default

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <main className="bg-white w-full">
      {/* HERO SECTION */}
      <section className="min-h-[56vh] bg-[var(--cchu-black)] flex items-center relative overflow-hidden px-6 md:px-10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(192,57,43,0.18)_0%,transparent_55%),radial-gradient(circle_at_85%_30%,rgba(192,57,43,0.08)_0%,transparent_40%)]" />
        
        {/* Crossed Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="hero-c grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <div className="hero-tag text-xs font-semibold tracking-[2px] uppercase text-white/40 mb-4">
                Affiliate Program
              </div>

              <h1 className="font-display font-black text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-white mb-6">
                Refer clients.<br />
                <span className="text-[var(--cchu-red)]">Earn for life.</span>
              </h1>

              <p className="hero-sub text-lg text-white/65 leading-relaxed max-w-lg">
                Join the C-Chu Media Affiliate Program and earn commission every time someone you refer places a print order — forever. 
                No stock. No investment. Just refer.
              </p>

              <a 
                href="/auth/new" 
                className="mt-10 inline-flex items-center gap-3 px-10 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-2xl transition-all text-lg"
              >
                Join Free — Get Your Link →
              </a>
            </div>

            {/* Commission Tiers */}
            <div className="tiers space-y-4">
              <div className="tier bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 hover:bg-red-950/30 hover:border-red-900/30 transition-all">
                <div className="tier-pct font-display text-5xl font-black text-white">10%</div>
                <div>
                  <div className="tier-orders text-white/50 text-xs font-semibold tracking-widest">ORDERS 1 – 5</div>
                  <div className="tier-desc text-white/80">High reward phase. Earn 10% on every order your client places in their first 5 orders.</div>
                </div>
              </div>

              <div className="tier bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 hover:bg-red-950/30 hover:border-red-900/30 transition-all">
                <div className="tier-pct font-display text-5xl font-black text-white">5%</div>
                <div>
                  <div className="tier-orders text-white/50 text-xs font-semibold tracking-widest">ORDERS 6 – 10</div>
                  <div className="tier-desc text-white/80">Growth phase. Your referral keeps ordering — you keep earning 5% on the next 5 orders.</div>
                </div>
              </div>

              <div className="tier tier-forever bg-black/30 border border-white/20 rounded-2xl p-6 flex gap-6">
                <div className="tier-pct font-display text-5xl font-black text-white">3%</div>
                <div className="flex-1">
                  <div className="tier-orders text-white/60 text-xs font-semibold tracking-widest">ORDER 11 ONWARDS — FOREVER</div>
                  <div className="tier-desc text-white/80">Lifetime passive income. Earn 3% on every single order they place.</div>
                </div>
                <div className="tier-inf text-4xl">∞</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="sec py-24 px-6 md:px-10">
        <div className="si max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="stag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Simple process</div>
            <h2 className="sh1 font-display font-black text-4xl md:text-5xl tracking-tight">How it works in 4 steps</h2>
            <p className="ssub text-[var(--cchu-gray)] text-lg max-w-xl mx-auto">
              Getting started takes less than 5 minutes. Here&apos;s how you go from sign-up to earning your first commission.
            </p>
          </div>

          <div className="steps4 grid md:grid-cols-4 gap-6">
            {[
              { num: "01", icon: "✍️", title: "Register Free", desc: "Create your free PrintHub account and opt into the affiliate program. No fees." },
              { num: "02", icon: "🔗", title: "Get Your Unique Link", desc: "Receive your unique affiliate link and code instantly." },
              { num: "03", icon: "🤝", title: "Refer Businesses", desc: "Share your link via WhatsApp, social media, or in person." },
              { num: "04", icon: "💰", title: "Earn Commission", desc: "When your referral pays for an order, your commission is credited automatically." }
            ].map((step, i) => (
              <div key={i} className="step bg-[var(--cchu-light)] border border-[var(--cchu-border)] rounded-3xl p-8 hover:border-[var(--cchu-red)] hover:-translate-y-2 transition-all">
                <div className="step-n font-display text-7xl text-[var(--cchu-red)] opacity-10 absolute top-6 right-6">{step.num}</div>
                <div className="step-icon text-4xl mb-6">{step.icon}</div>
                <div className="step-t font-display font-bold text-xl mb-3">{step.title}</div>
                <p className="step-d text-[var(--cchu-gray)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EARNINGS EXAMPLES */}
      <section className="sec earn-bg bg-[var(--cchu-light)] py-24 px-6 md:px-10">
        <div className="si max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="stag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">See what you could earn</div>
            <h2 className="sh1 font-display font-black text-3xl md:text-4xl md:text-5xl tracking-tight">Real commission examples</h2>
            <p className="ssub text-[var(--cchu-gray)] text-lg max-w-xl mx-auto">
              Based on typical C-Chu Media job values. One referred client can generate earnings for years.
            </p>
          </div>

          <div className="earn-grid grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Branding Package Client",
                value: "₦120,000",
                earnings: [
                  "Orders 1–5 (10%) → ₦60,000",
                  "Orders 6–10 (5%) → ₦30,000",
                  "Orders 11+ (3%) → ₦3,600 per order",
                  "First 10 orders total → ₦90,000"
                ]
              },
              {
                title: "Election Campaign Client",
                value: "₦200,000",
                earnings: [
                  "Orders 1–5 (10%) → ₦100,000",
                  "Orders 6–10 (5%) → ₦50,000",
                  "Orders 11+ (3%) → ₦6,000 per order",
                  "First 10 orders total → ₦150,000"
                ]
              },
              {
                title: "School / Institution Client",
                value: "₦150,000",
                earnings: [
                  "Orders 1–5 (10%) → ₦75,000",
                  "Orders 6–10 (5%) → ₦37,500",
                  "Orders 11+ (3%) → ₦4,500 per order",
                  "First 10 orders total → ₦112,500"
                ]
              }
            ].map((item, i) => (
              <div key={i} className="earn-card bg-white border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:border-[var(--cchu-red)] hover:shadow-xl transition-all">
                <div className="earn-head p-6 border-b border-[var(--cchu-border)]">
                  <div className="earn-title font-display font-bold text-xl">{item.title}</div>
                  <div className="earn-pkg text-[var(--cchu-gray)] text-sm">Average job value: {item.value}</div>
                </div>
                <div className="earn-body p-6">
                  {item.earnings.map((row, idx) => (
                    <div key={idx} className="earn-row flex justify-between py-3 border-b border-[var(--cchu-border)] last:border-none">
                      <span className="earn-label text-[var(--cchu-gray)]">{row.split('→')[0]}</span>
                      <span className={`earn-val ${idx === 3 ? 'earn-total text-[var(--cchu-red)] font-semibold' : ''}`}>
                        {row.split('→')[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section className="sec py-24 px-6 md:px-10">
        <div className="si max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="stag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Open to everyone</div>
            <h2 className="sh1 font-display font-black text-4xl md:text-5xl tracking-tight">Who should join?</h2>
            <p className="ssub text-[var(--cchu-gray)] text-lg max-w-xl mx-auto">
              If you know people who need printing, branding, or publishing — this program is for you.
            </p>
          </div>

          <div className="who-grid grid md:grid-cols-4 gap-6">
            {[
              { icon: "👩‍💼", title: "Entrepreneurs", desc: "You know other business owners. Turn those connections into lifetime income." },
              { icon: "🎓", title: "Students & Graduates", desc: "No job yet? Earn commissions from your phone with zero investment." },
              { icon: "👩‍🍼", title: "Stay-at-Home Mums", desc: "Work from home. Refer businesses in your community and get paid." },
              { icon: "🌐", title: "Network Marketers", desc: "You already know how to refer people. Now do it for a service everyone needs." }
            ].map((item, i) => (
              <div key={i} className="who-card bg-white border border-[var(--cchu-border)] rounded-3xl p-10 text-center hover:border-[var(--cchu-red)] hover:shadow-xl transition-all">
                <div className="who-icon text-6xl mb-6">{item.icon}</div>
                <div className="who-title font-display font-bold text-xl mb-4">{item.title}</div>
                <p className="who-desc text-[var(--cchu-gray)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec py-24 px-6 md:px-10 bg-[var(--cchu-light)]">
        <div className="si max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="stag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Questions answered</div>
            <h2 className="sh1 font-display font-black text-4xl md:text-5xl tracking-tight">Frequently asked questions</h2>
            <p className="ssub text-[var(--cchu-gray)] text-lg max-w-xl mx-auto">Everything you need to know before joining the program.</p>
          </div>

          <div className="faq-list space-y-3">
            {[
              {
                q: "How do I track my referrals and earnings?",
                a: "Once you register on PrintHub and join the affiliate program, you receive a unique referral link and code. Your dashboard shows all referred clients, their orders, and your earned commissions in real time."
              },
              {
                q: "When and how do I get paid?",
                a: "Commission is calculated on completed and fully paid orders. Payouts are processed monthly via bank transfer. Minimum payout threshold is ₦5,000."
              },
              {
                q: "Is there a limit to how many people I can refer?",
                a: "No limit at all. Refer as many businesses and individuals as you like. Every single one earns you commission on their orders — forever."
              },
              {
                q: "What services qualify for affiliate commission?",
                a: "All C-Chu Media services qualify — banners, business cards, souvenirs, signage, product labels, book publishing, election campaign materials, business starter kits, and more."
              },
              {
                q: "Does the 'for life' commission expire?",
                a: "No expiry. As long as your referred client continues placing orders with C-Chu Media, you continue earning 3% on every order. There is no time limit."
              },
              {
                q: "Is it free to join?",
                a: "Yes — completely free. Simply register on PrintHub, activate your affiliate account, and start sharing your unique link. There are no fees, no targets, and no obligations."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item border border-[var(--cchu-border)] rounded-2xl overflow-hidden ${openFaq === index ? 'open' : ''}`}>
                <div 
                  className="faq-q flex justify-between items-center px-8 py-5 font-medium cursor-pointer hover:bg-white"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.q}
                  <span className={`hidden faq-arrow text-xl transition-transform ${openFaq === index ? 'rotate-180 text-[var(--cchu-red)]' : ''}`}>▼</span>
                </div>
                <div className="faq-a px-8 pb-8 text-[var(--cchu-gray)] leading-relaxed">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-sec bg-[var(--cchu-red)] py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="cta-t font-display font-black text-5xl md:text-6xl text-white tracking-tight leading-tight">
            Ready to start earning?
          </h2>
          <p className="cta-s text-white/80 text-lg mt-6">
            Join free today. Get your unique link. Start referring. Start earning — for life.
          </p>

          <div className="cta-btns flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a 
              href="/auth/new" 
              className="bw inline-flex items-center justify-center px-12 py-4 bg-white text-[var(--cchu-red)] font-display font-bold rounded-2xl hover:bg-black hover:text-white transition-all"
            >
              Join the Affiliate Program Free →
            </a>
            <a 
              href="https://wa.me/2348052929523" 
              className="bwg inline-flex items-center justify-center px-12 py-4 border border-white/40 text-white hover:border-white hover:text-white rounded-2xl transition-all"
            >
              Ask us a question first
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
'use client';

export default function StarterKits() {
  return (
    <main className="bg-white w-full">
      {/* HERO SECTION */}
      <section className="min-h-[52vh] bg-[var(--cchu-black)] flex items-center relative overflow-hidden px-6 md:px-10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(192,57,43,0.15)_0%,transparent_50%)]" />
        
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

        <div className="max-w-5xl mx-auto relative z-10 text-center md:text-left">
          <div className="text-xs font-semibold tracking-[2px] uppercase text-white/40 mb-4">
            Business Starter Kits
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-white mb-6">
            Everything you need to look<br />
            <span className="text-[var(--cchu-red)]">professional from day one.</span>
          </h1>

          <p className="text-lg text-white/65 max-w-2xl mx-auto md:mx-0 mb-10">
            One package. One price. Zero stress. Business cards, letterheads, flyers, 
            and ID cards — all designed and printed for your new or rebranding business.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a 
              href="#kits" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-2xl transition-all text-lg"
            >
              Choose Your Kit →
            </a>
            <a target="_blank" rel="noopener noreferrer"
              href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20know%20more%20about%20the%20Business%20Starter%20Kit"
              className="inline-flex items-center px-10 py-4 border border-white/30 hover:border-white/60 text-white/80 hover:text-white rounded-2xl transition-all text-lg"
            >
              Ask us a question
            </a>
          </div>
        </div>
      </section>

      {/* KITS SECTION */}
      <section className="py-24 px-6 md:px-10" id="kits">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Three tiers</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Pick the kit that fits your business</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl">
              From solo entrepreneurs just starting out to established SMEs looking to rebrand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Kit */}
            <div className="kit border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all flex flex-col">
              <div className="kit-head p-8">
                <span className="kit-badge inline-block bg-[#F0F0EC] text-[#555] text-xs font-semibold px-5 py-1.5 rounded-full">Starter</span>
                <div className="kit-name font-display font-black text-3xl mt-6">Basic Kit</div>
                <div className="flex flex-col kit-price font-display text-4xl font-black text-[var(--cchu-red)] mt-3">
                  ₦35,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small>
                </div>
                <p className="kit-tagline text-[var(--cchu-gray)] mt-5 italic">&quot;You just registered your business. Now look like one&quot;</p>
              </div>

              <div className="kit-items flex-1 bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Business cards — 100 pcs · double-sided",
                  "Letterhead — 50 sheets · A4",
                  "Flyers — 100 pcs · A5 single-sided",
                  "Logo design — 1 concept · 2 revisions",
                  "All files delivered digitally"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="kit-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />
                    <div className="kit-item-text">{item}</div>
                  </div>
                ))}
                <div className="pt-4 text-sm text-[var(--cchu-dark)] font-medium">⏱ Turnaround: 5–7 working days</div>
                <div className="text-xs text-[var(--cchu-gray)] italic">Best for: Solo entrepreneurs &amp; new registrations</div>
              </div>

              <div className="kit-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20discuss%20the%20Basic%20Kit" className="btn-kit block text-center py-4 border border-[var(--cchu-border)] hover:border-[var(--cchu-red)] hover:text-[var(--cchu-red)] rounded-2xl font-display font-bold transition-all">
                  Order Basic Kit
                </a>
              </div>
            </div>

            {/* Standard Kit - Featured */}
            <div className="kit featured border-2 border-[var(--cchu-red)] rounded-3xl overflow-hidden shadow-2xl scale-[1.03] flex flex-col">
              <div className="kit-head p-8">
                <div className="flex items-center gap-3">
                  <span className="kit-badge inline-block bg-[var(--cchu-red-pale)] text-[var(--cchu-red)] text-xs font-semibold px-5 py-1.5 rounded-full">Standard</span>
                  <span className="kit-pop bg-[var(--cchu-red)] text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-wider">Most Popular</span>
                </div>
                <div className="kit-name font-display font-black text-3xl mt-6">Business Kit</div>
                <div className="flex flex-col kit-price font-display text-4xl font-black text-[var(--cchu-red)] mt-3">
                  ₦65,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small>
                </div>
                <p className="kit-tagline text-[var(--cchu-gray)] mt-5 italic">&quot;Look established from day one&quot;</p>
              </div>

              <div className="kit-items flex-1 bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Business cards — 200 pcs · premium thick card",
                  "Letterhead — 100 sheets · A4 + digital",
                  "Flyers — 250 pcs · A5 double-sided",
                  "Staff ID cards — 5 pcs · PVC + lanyards",
                  "Logo design — 2 concepts · 3 revisions",
                  "Brand colour & font guide"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="kit-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />
                    <div className="kit-item-text">{item}</div>
                  </div>
                ))}
                <div className="pt-4 text-sm text-[var(--cchu-dark)] font-medium">⏱ Turnaround: 7–10 working days</div>
                <div className="kit-save text-xs italic text-[var(--cchu-gray)]">Save ~₦20,000 vs ordering items separately</div>
              </div>

              <div className="kit-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20discuss%20the%20Business%20Kit" className="btn-kit block text-center py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white rounded-2xl font-display font-bold transition-all">
                  Order Business Kit
                </a>
              </div>
            </div>

            {/* Premium Kit */}
            <div className="kit border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all flex flex-col">
              <div className="kit-head p-8">
                <span className="kit-badge inline-block bg-[#FBF5E6] text-[#8B6914] text-xs font-semibold px-5 py-1.5 rounded-full">Premium</span>
                <div className="kit-name font-display font-black text-3xl mt-6">Corporate Kit</div>
                <div className="flex flex-col kit-price font-display text-4xl font-black text-[var(--cchu-red)] mt-3">
                  ₦120,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small>
                </div>
                <p className="kit-tagline text-[var(--cchu-gray)] mt-5 italic">&quot;Arrive in every room looking like a million naira&quot;</p>
              </div>

              <div className="kit-items flex-1 bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Business cards — 500 pcs · laminated",
                  "Letterhead — 200 sheets + envelope design",
                  "Flyers — 500 pcs A5 + A4 version",
                  "Staff ID cards — 15 pcs + template",
                  "Logo design — 3 concepts · unlimited revisions",
                  "Full brand identity guide (PDF booklet)",
                  "4-page company profile design",
                  "Roll-up banner — 1 pc"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="kit-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />
                    <div className="kit-item-text">{item}</div>
                  </div>
                ))}
                <div className="pt-4 text-sm text-[var(--cchu-dark)] font-medium">⏱ Turnaround: 10–14 working days</div>
                <div className="kit-save text-xs italic text-[var(--cchu-gray)]">Save ~₦45,000 vs ordering items separately</div>
              </div>

              <div className="kit-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a target="_blank" rel="noopener noreferrer" href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20discuss%20the%20Corporate%20Kit" className="btn-kit block text-center py-4 bg-[var(--cchu-black)] hover:bg-zinc-800 text-white rounded-2xl font-display font-bold transition-all">
                  Order Corporate Kit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cchu-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Side by side</div>
            <h2 className="font-display font-black text-3xl md:text-4xl md:text-5xl tracking-tight">Quick comparison</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4">See exactly what you get in each kit before you order.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[var(--cchu-border)]">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr>
                  <th className="bg-[var(--cchu-black)] text-white p-5 text-left font-display text-xs tracking-widest uppercase">What&apos;s included</th>
                  <th className="bg-[#444] text-white p-5 text-left font-display text-xs tracking-widest uppercase">Basic · ₦35,000</th>
                  <th className="bg-[var(--cchu-red)] text-white p-5 text-left font-display text-xs tracking-widest uppercase">Business · ₦65,000</th>
                  <th className="bg-[#111] text-white p-5 text-left font-display text-xs tracking-widest uppercase">Corporate · ₦120,000</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Business cards", "100 pcs", "200 pcs", "500 pcs (laminated)"],
                  ["Letterhead (A4)", "50 sheets", "100 sheets + digital", "200 sheets + envelope"],
                  ["Flyers", "100 pcs A5", "250 pcs A5", "500 pcs A5 + A4"],
                  ["Staff ID cards", "—", "5 pcs + lanyards", "15 pcs + template"],
                  ["Logo design", "1 concept", "2 concepts", "3 concepts + all formats"],
                  ["Brand guide", "—", "1-page style sheet", "Full PDF booklet"],
                  ["Company profile design", "—", "—", "4-page design"],
                  ["Roll-up banner", "—", "—", "✓ Included"],
                  ["Turnaround time", "5–7 days", "7–10 days", "10–14 days"],
                  ["Savings vs separate", "—", "~₦20,000", "~₦45,000"]
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[var(--cchu-light)]"}>
                    <td className="p-5 font-medium border-t border-[var(--cchu-border)]">{row[0]}</td>
                    <td className="p-5 border-t border-[var(--cchu-border)]">{row[1]}</td>
                    <td className="p-5 border-t border-[var(--cchu-border)]">{row[2]}</td>
                    <td className="p-5 border-t border-[var(--cchu-border)]">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* UPSELL PATH */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">What comes next</div>
            <h2 className="font-display font-black text-3xl md:text-4xl md:text-5xl tracking-tight">Your kit is just the beginning</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl">
              Most of our starter kit clients go on to order more. Here&apos;s the natural progression.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-[var(--cchu-border)] rounded-3xl overflow-hidden">
            {[
              { step: "Step 1", title: "Order your Starter Kit", desc: "Your brand identity is set — cards, letterhead, flyers, and IDs delivered." },
              { step: "Step 2", title: "Brand your space", desc: "Upgrade to signage, office branding and installation across Abuja FCT." },
              { step: "Step 3", title: "Brand your team", desc: "Order branded shirts, caps, souvenirs, and corporate gifts." },
              { step: "Step 4", title: "Earn from referrals", desc: "Join our affiliate program and earn commission when you refer others." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 hover:bg-[var(--cchu-red-pale)] transition-colors group">
                <div className="text-xs font-semibold tracking-widest text-[var(--cchu-gray)] mb-3">{item.step}</div>
                <div className="font-display font-bold text-xl mb-4 group-hover:text-[var(--cchu-red)] transition-colors">{item.title}</div>
                <p className="text-[var(--cchu-gray)] text-sm leading-relaxed">{item.desc}</p>
                {i < 3 && <div className="text-3xl text-[var(--cchu-red)] mt-8">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--cchu-red)] py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-5xl md:text-6xl text-white leading-tight tracking-tight">
            Ready to look professional?
          </h2>
          <p className="text-white/80 text-lg mt-6">
            Order your Business Starter Kit today. Everything your business needs in one package, delivered fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a 
              href="#kits" 
              className="px-12 py-4 bg-white text-[var(--cchu-red)] font-display font-bold rounded-2xl hover:bg-black hover:text-white transition-all"
            >
              Choose Your Kit →
            </a>
            <a target="_blank" rel="noopener noreferrer"
              href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20order%20a%20Business%20Starter%20Kit"
              className="px-12 py-4 border border-white/40 text-white hover:border-white hover:text-white font-medium rounded-2xl transition-all"
            >
              WhatsApp us to order
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
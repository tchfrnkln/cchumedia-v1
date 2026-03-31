'use client';

export default function ElectionCampaign() {
  return (
    <main className="bg-white w-full">
      {/* URGENCY BAR */}
      <div className="bg-[var(--cchu-red)] text-white text-center py-4 text-sm font-semibold tracking-wider">
        🗳️ Election Season is Open — Now till January 2027. Order your campaign materials now before peak season rush.
      </div>

      {/* HERO SECTION */}
      <section className="min-h-[62vh] bg-[var(--cchu-black)] flex items-center relative overflow-hidden px-6 md:px-10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_60%,rgba(192,57,43,0.2)_0%,transparent_50%),radial-gradient(circle_at_90%_20%,rgba(192,57,43,0.08)_0%,transparent_40%)]" />
        
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

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-xs font-semibold tracking-[2px] uppercase text-white/40 mb-4">
            Election Campaign Materials · 2025 – 2027
          </div>

          <h1 className="font-display font-black text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-white mb-6">
            Win the visibility battle<br />
            before you <span className="text-[var(--cchu-red)]">win the election.</span>
          </h1>

          <p className="text-lg text-white/65 max-w-2xl mb-10">
            Billboards, banners, flyers, branded shirts, vehicle decals — everything your campaign needs, 
            produced fast and delivered bold. One call handles it all.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="https://wa.me/2348052929523?text=Hello%2C%20I%20need%20election%20campaign%20materials"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-2xl transition-all text-lg"
            >
              📞 Get an Urgent Quote Now
            </a>
            <a 
              href="#packages" 
              className="inline-flex items-center px-10 py-4 border border-white/30 hover:border-white/60 text-white/80 hover:text-white rounded-2xl transition-all text-lg"
            >
              View Campaign Packages
            </a>
          </div>

          <div className="flex flex-wrap gap-10 text-white">
            <div>
              <div className="font-display text-4xl font-black">48hr</div>
              <div className="text-xs text-white/50 mt-1">Fast turnaround available</div>
            </div>
            <div>
              <div className="font-display text-4xl font-black">13+</div>
              <div className="text-xs text-white/50 mt-1">Years of print experience</div>
            </div>
            <div>
              <div className="font-display text-4xl font-black">₦50k+</div>
              <div className="text-xs text-white/50 mt-1">Starter packages from</div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS SECTION */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">What we produce</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">All your campaign materials,<br />under one roof</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl">
              From ward-level campaigns to governorship races — we produce every material your campaign needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏗️", title: "Billboards & Large Banners", desc: "Large-format outdoor banners and billboard prints. Bold, weather-resistant, high-visibility.", note: "Indoor & outdoor · All sizes" },
              { icon: "📄", title: "Campaign Flyers & Posters", desc: "A4/A5 flyers, A3 posters, and wall bills in full colour. Order from 500 to 100,000+ copies.", note: "From ₦3,000 · Fast turnaround" },
              { icon: "👕", title: "Branded Shirts, Caps & Bags", desc: "High-quality branded campaign souvenirs that your supporters will wear and use beyond election day.", note: "Bulk orders · All colours" },
              { icon: "🚗", title: "Vehicle Branding & Decals", desc: "Full vehicle wraps, partial branding, and decals. Turn every car into a moving billboard.", note: "Cars · Buses · Vans" }
            ].map((item, i) => (
              <div key={i} className="mat-card bg-white border border-[var(--cchu-border)] rounded-2xl p-8 hover:border-[var(--cchu-red)] hover:shadow-xl transition-all group">
                <div className="mat-icon text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="mat-title font-display font-bold text-xl mb-3">{item.title}</div>
                <p className="mat-desc text-[var(--cchu-gray)] text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="mat-note text-[var(--cchu-red)] text-xs font-semibold">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGN PACKAGES */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cchu-light)]" id="packages">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Campaign packages</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Choose your campaign level</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl">
              Packages designed for every level — from ward and LGA to state and national assembly races.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ward Level */}
            <div className="pkg border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
              <div className="pkg-head p-8">
                <span className="pkg-badge inline-block bg-[var(--cchu-light)] text-[var(--cchu-dark)] text-xs font-semibold px-5 py-1.5 rounded-full">Ward / LGA Level</span>
                <div className="pkg-name font-display font-black text-3xl mt-6">Campaign Starter</div>
                <div className="flex flex-col md:flex-row pkg-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-3">
                  ₦50,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small>
                </div>
                <p className="pkg-tag text-[var(--cchu-gray)] mt-5">&quot;Get your name and face in front of every voter in your ward&quot;</p>
              </div>

              <div className="pkg-items flex-1 bg-white p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "500 A5 campaign flyers (full colour)",
                  "2 large outdoor banners (4×8ft)",
                  "50 branded campaign shirts",
                  "Campaign logo / identity design",
                  "Turnaround: 5–7 working days"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3"><div className="pkg-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />{item}</div>
                ))}
              </div>

              <div className="pkg-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20the%20Campaign%20Starter%20Package" 
                   className="btn-pkg block text-center py-4 border border-[var(--cchu-border)] hover:border-[var(--cchu-red)] hover:text-[var(--cchu-red)] rounded-2xl font-display font-bold transition-all">
                  Order Campaign Starter
                </a>
              </div>
            </div>

            {/* State Assembly - Most Popular */}
            <div className="pkg featured border-2 border-[var(--cchu-red)] rounded-3xl overflow-hidden shadow-2xl scale-[1.03] flex flex-col">
              <div className="pkg-head p-8">
                <div className="flex items-center gap-3">
                  <span className="pkg-badge inline-block bg-[var(--cchu-red-pale)] text-[var(--cchu-red)] text-xs font-semibold px-5 py-1.5 rounded-full">State Assembly / House of Reps</span>
                  <span className="pkg-pop bg-[var(--cchu-red)] text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-wider">Most Popular</span>
                </div>
                <div className="pkg-name font-display font-black text-3xl mt-6">Campaign Visibility</div>
                <div className="flex flex-col md:flex-row pkg-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-3">
                  ₦200,000 <small className="text-base font-normal text-[var(--cchu-gray)]">custom quote</small>
                </div>
                <p className="pkg-tag text-[var(--cchu-gray)] mt-5">&quot;Dominate every street, market, and community in your constituency&quot;</p>
              </div>

              <div className="pkg-items flex-1 bg-white p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "2,000 A5 flyers + 500 A4 posters",
                  "10 large outdoor banners (various sizes)",
                  "200 branded shirts + 100 caps",
                  "4 vehicle brandings / decals",
                  "Campaign full identity design",
                  "48–72hr fast turnaround available"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3"><div className="pkg-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />{item}</div>
                ))}
              </div>

              <div className="pkg-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20the%20Campaign%20Visibility%20Package" 
                   className="btn-pkg block text-center py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white rounded-2xl font-display font-bold transition-all">
                  Get Visibility Package
                </a>
              </div>
            </div>

            {/* Governorship / Senate */}
            <div className="pkg border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
              <div className="pkg-head p-8">
                <span className="pkg-badge inline-block bg-[#FBF5E6] text-[#8B6914] text-xs font-semibold px-5 py-1.5 rounded-full">Governorship / Senate</span>
                <div className="pkg-name font-display font-black text-3xl mt-6">Full Campaign Suite</div>
                <div className="flex flex-col md:flex-row pkg-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-3">
                  Custom <small className="text-base font-normal text-[var(--cchu-gray)]">quote based on scope</small>
                </div>
                <p className="pkg-tag text-[var(--cchu-gray)] mt-5">&quot;A complete, coordinated campaign visual presence across every LGA&quot;</p>
              </div>

              <div className="pkg-items flex-1 bg-white p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Bulk flyers (10,000–100,000 copies)",
                  "Billboard production (multiple locations)",
                  "Mass branded souvenirs (500–5,000 pcs)",
                  "Full convoy vehicle branding",
                  "Event backdrops & stage banners",
                  "Dedicated project manager assigned",
                  "Priority production & delivery"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3"><div className="pkg-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />{item}</div>
                ))}
              </div>

              <div className="pkg-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20discuss%20the%20Full%20Campaign%20Suite" 
                   className="btn-pkg block text-center py-4 bg-[var(--cchu-black)] hover:bg-zinc-800 text-white rounded-2xl font-display font-bold transition-all">
                  Request Custom Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:text-left mb-12">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Why campaigns choose us</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">We understand what campaigns need</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl">
              Speed, boldness, and reliability. Three things you can&apos;t compromise on during an election campaign.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Speed You Can Rely On", desc: "Campaign timelines are non-negotiable. We offer 48–72 hour turnaround on urgent orders." },
              { icon: "🎨", title: "Bold, High-Impact Prints", desc: "Your materials need to stand out from a distance. Vivid colour printing that doesn't fade." },
              { icon: "📦", title: "One Vendor, Everything", desc: "Banners, flyers, shirts, vehicle decals — handled by one team. One call, one invoice." },
              { icon: "🏛️", title: "Proven with Political Clients", desc: "We've produced materials for Labour Party, ADC Party and many others." },
              { icon: "🔒", title: "Confidential & Professional", desc: "Your campaign strategy and materials are handled with full discretion." },
              { icon: "📍", title: "Abuja-Based, Nigeria-Ready", desc: "Based in Karu, Abuja — quick collection for FCT campaigns and nationwide shipping." }
            ].map((item, i) => (
              <div key={i} className="why-card bg-[var(--cchu-light)] border border-[var(--cchu-border)] rounded-2xl p-8 hover:border-[var(--cchu-red)] transition-all">
                <div className="why-icon text-4xl mb-6">{item.icon}</div>
                <div className="why-t font-display font-bold text-xl mb-4">{item.title}</div>
                <p className="why-d text-[var(--cchu-gray)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--cchu-black)] py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-5xl md:text-6xl text-white leading-tight tracking-tight">
            Your campaign starts with<br />
            <span className="text-[var(--cchu-red)]">being seen.</span>
          </h2>
          <p className="text-white/70 text-lg mt-6 max-w-md mx-auto">
            Don&apos;t wait until peak season when production slots fill up. Contact us today for your campaign materials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a 
              href="https://wa.me/2348052929523?text=Hello%2C%20I%20need%20urgent%20campaign%20materials"
              className="px-12 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-2xl transition-all"
            >
              📞 WhatsApp for Urgent Quote
            </a>
            <a 
              href="/auth/new" 
              className="px-12 py-4 border border-white/40 text-white hover:border-white hover:text-white rounded-2xl transition-all"
            >
              Order on PrintHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
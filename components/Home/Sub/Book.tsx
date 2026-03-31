'use client';

export default function BookPublishing() {
  return (
    <main className="bg-white w-full">
      {/* HERO SECTION */}
      <section className="min-h-[62vh] bg-[var(--cchu-black)] flex items-center relative overflow-hidden px-6 md:px-10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(192,57,43,0.15)_0%,transparent_50%)]" />
        
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
          <div className="hero-c grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-20 items-center">
            <div>
              <div className="text-xs font-semibold tracking-[2px] uppercase text-white/40 mb-4">
                Book Publishing
              </div>

              <h1 className="font-display font-black text-3xl md:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-white mb-6">
                You wrote it.<br />
                Let us turn it into<br />
                a <span className="text-[var(--cchu-red)]">real, professional book.</span>
              </h1>

              <p className="text-lg text-white/65 leading-relaxed max-w-lg">
                Full end-to-end publishing — cover design, interior layout, typesetting, 
                printing, and binding. From manuscript to finished book, we handle everything.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a 
                  href="https://wa.me/2348052929523?text=Hello%2C%20I%20would%20like%20a%20free%20book%20publishing%20consultation"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-2xl transition-all text-lg"
                >
                  Get a Free Consultation →
                </a>
                <a 
                  href="#packages" 
                  className="inline-flex items-center px-10 py-4 border border-white/30 hover:border-white/60 text-white/80 hover:text-white rounded-2xl transition-all text-lg"
                >
                  View Publishing Packages
                </a>
              </div>
            </div>

            {/* Proof Card */}
            <div className="proof-card bg-white/5 border border-white/10 rounded-3xl p-10 text-center hidden md:block">
              <div className="text-7xl mb-6">📚</div>
              <div className="proof-title font-display font-bold text-white text-2xl">The Crypto Investors Playbook</div>
              <div className="proof-sub text-white/60 mt-4 leading-relaxed">
                Published by Silas Umekwe, CEO of C-Chu Media.<br />
                We know publishing — because we do it ourselves.
              </div>
              <div className="mt-8 inline-block bg-[var(--cchu-red)] text-white text-xs font-semibold px-6 py-2 rounded-full">
                Published by C-Chu Media
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">The publishing journey</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">From manuscript to finished book</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl mx-auto">
              Our proven 5-step process takes you from a raw document to a professionally published book you&apos;ll be proud to hold.
            </p>
          </div>

          <div className="process relative grid md:grid-cols-5 gap-8 md:gap-0">
            {/* Connecting Line - visible only on desktop */}
            <div className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-[3px] bg-gradient-to-r from-transparent via-[var(--cchu-red)] to-transparent" />

            {[
              { icon: "📝", title: "Manuscript Review", desc: "Send us your manuscript. We review it and provide a clear publishing roadmap and quote." },
              { icon: "🎨", title: "Cover Design", desc: "Our designers create a professional cover (front, back, spine) that grabs attention on any shelf." },
              { icon: "📐", title: "Layout & Typesetting", desc: "Interior pages are laid out professionally with proper fonts, spacing, and chapter structure." },
              { icon: "🖨️", title: "Print & Bind", desc: "Your book is printed on premium paper and bound to professional publishing standards." },
              { icon: "📦", title: "Delivery", desc: "Collect your author copies or have them delivered. Bulk orders available for book launches." }
            ].map((step, i) => (
              <div key={i} className="proc-step text-center">
                <div className="proc-circle mx-auto w-20 h-20 flex items-center justify-center text-4xl bg-white border-2 border-[var(--cchu-red)] rounded-full shadow-lg">
                  {step.icon}
                </div>
                <div className="proc-t font-display font-bold text-lg mt-4">{step.title}</div>
                <p className="proc-d text-[var(--cchu-gray)] text-sm mt-3 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cchu-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Who we publish for</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Every author has a story worth publishing</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl mx-auto">
              Whether it&apos;s your first book or your tenth — we have the expertise to make it professional.
            </p>
          </div>

          <div className="who-grid grid md:grid-cols-4 gap-6">
            {[
              { icon: "⛪", title: "Pastors & Ministers", desc: "Devotionals, sermon collections, spiritual guides, and theological writings." },
              { icon: "💼", title: "Business Coaches & Consultants", desc: "Business books, leadership guides, and professional development resources." },
              { icon: "🎓", title: "Academics & Researchers", desc: "Research publications, academic texts, journals, and institutional reports." },
              { icon: "✍️", title: "First-Time Authors", desc: "We guide you through every step. If you have a manuscript and a dream, we'll make it real." }
            ].map((item, i) => (
              <div key={i} className="who-card bg-white border border-[var(--cchu-border)] rounded-2xl p-8 hover:border-[var(--cchu-red)] hover:-translate-y-1 transition-all text-center">
                <div className="who-icon text-5xl mb-6">{item.icon}</div>
                <div className="who-t font-display font-bold text-xl mb-4">{item.title}</div>
                <p className="who-d text-[var(--cchu-gray)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLISHING PACKAGES */}
      <section className="py-24 px-6 md:px-10" id="packages">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Publishing packages</div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight">Choose your publishing package</h2>
            <p className="text-[var(--cchu-gray)] text-lg mt-4 max-w-2xl mx-auto">
              Every package includes professional design, quality printing, and expert support.
            </p>
          </div>

          <div className="pkgs grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="pkg border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
              <div className="pkg-head p-8">
                <span className="pkg-badge inline-block bg-[var(--cchu-light)] text-[var(--cchu-dark)] text-xs font-semibold px-5 py-1.5 rounded-full">Author Starter</span>
                <div className="pkg-name font-display font-black text-3xl mt-6">Basic Publish</div>
                <div className="pkg-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-3">
                  ₦80,000 <small className="text-base font-normal text-[var(--cchu-gray)]">from</small>
                </div>
                <p className="pkg-tag text-[var(--cchu-gray)] mt-5">&quot;Your first book, professionally produced&quot;</p>
              </div>

              <div className="pkg-items flex-1 bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Cover design (front, back, spine)",
                  "Interior layout & typesetting",
                  "Up to 150 pages",
                  "50 printed copies, perfect bound",
                  "Digital files (PDF print-ready)",
                  "2 cover design concepts",
                  "Turnaround: 10–14 working days"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3"><div className="pkg-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />{item}</div>
                ))}
              </div>

              <div className="pkg-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20the%20Basic%20Publish%20Package" 
                   className="btn-pkg block text-center py-4 border border-[var(--cchu-border)] hover:border-[var(--cchu-red)] hover:text-[var(--cchu-red)] rounded-2xl font-display font-bold">
                  Get Started
                </a>
              </div>
            </div>

            {/* Pro - Most Popular */}
            <div className="pkg featured border-2 border-[var(--cchu-red)] rounded-3xl overflow-hidden shadow-2xl scale-[1.03] flex flex-col">
              <div className="pkg-head p-8">
                <div className="flex items-center gap-3">
                  <span className="pkg-badge inline-block bg-[var(--cchu-red-pale)] text-[var(--cchu-red)] text-xs font-semibold px-5 py-1.5 rounded-full">Professional Author</span>
                  <span className="pkg-pop bg-[var(--cchu-red)] text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-wider">Most Popular</span>
                </div>
                <div className="pkg-name font-display font-black text-3xl mt-6">Pro Publish</div>
                <div className="pkg-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-3">
                  ₦150,000 <small className="text-base font-normal text-[var(--cchu-gray)]">from</small>
                </div>
                <p className="pkg-tag text-[var(--cchu-gray)] mt-5">&quot;A complete, polished book launch package&quot;</p>
              </div>

              <div className="pkg-items flex-1 bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Cover design — 3 concepts, unlimited revisions",
                  "Interior layout & professional typesetting",
                  "Up to 300 pages",
                  "100 printed copies, premium binding",
                  "Proofreading support included",
                  "Author bio page design",
                  "Digital & print-ready files",
                  "ISBN guidance & back cover copy",
                  "Turnaround: 14–21 working days"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3"><div className="pkg-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />{item}</div>
                ))}
              </div>

              <div className="pkg-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20the%20Pro%20Publish%20Package" 
                   className="btn-pkg block text-center py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white rounded-2xl font-display font-bold">
                  Publish Professionally
                </a>
              </div>
            </div>

            {/* Institutional */}
            <div className="pkg border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col">
              <div className="pkg-head p-8">
                <span className="pkg-badge inline-block bg-[#FBF5E6] text-[#8B6914] text-xs font-semibold px-5 py-1.5 rounded-full">Institutions & Bulk</span>
                <div className="pkg-name font-display font-black text-3xl mt-6">Institutional Publish</div>
                <div className="pkg-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-3">
                  Custom <small className="text-base font-normal text-[var(--cchu-gray)]">quote</small>
                </div>
                <p className="pkg-tag text-[var(--cchu-gray)] mt-5">&quot;Textbooks, manuals, and training materials at scale&quot;</p>
              </div>

              <div className="pkg-items flex-1 bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] space-y-4 text-sm">
                {[
                  "Schools — textbooks & curriculum guides",
                  "Churches — devotionals & manuals",
                  "NGOs & corporates — reports & handbooks",
                  "Bulk printing (200–5,000+ copies)",
                  "Volume discounts on print runs",
                  "Dedicated project manager",
                  "Delivery to your institution"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3"><div className="pkg-dot w-2 h-2 mt-1.5 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />{item}</div>
                ))}
              </div>

              <div className="pkg-footer p-6 border-t border-[var(--cchu-border)] bg-white mt-auto">
                <a href="https://wa.me/2348052929523?text=Hello%2C%20I%20need%20an%20institutional%20publishing%20quote" 
                   className="btn-pkg block text-center py-4 bg-[var(--cchu-black)] hover:bg-zinc-800 text-white rounded-2xl font-display font-bold">
                  Request Bulk Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / PROOF SECTION */}
      <section className="trust-strip bg-[var(--cchu-black)] py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_3fr] gap-12 items-center">
          <div>
            <div className="ts-title font-display font-black text-4xl text-white leading-tight">
              Our CEO is a published author.<br />We know what it takes.
            </div>
            <div className="ts-sub text-white/50 mt-6">
              Silas Umekwe has published books distributed across 15+ nations. 
              We don&apos;t just print — we understand the full publishing process from the inside.
            </div>
          </div>

          <div className="ts-proof grid md:grid-cols-3 gap-6">
            {[
              { quote: "The cover design and print quality was world-class. I was proud to hand my book to anyone.", author: "— Published author, Abuja" },
              { quote: "They guided me through every step. From my rough manuscript to a finished book in 3 weeks.", author: "— Pastor, FCT" },
              { quote: "We printed 500 copies of our school textbook. Quality was excellent, delivery was on time.", author: "— School Principal, Abuja" }
            ].map((item, i) => (
              <div key={i} className="ts-card bg-white/5 border border-white/10 rounded-2xl p-8">
                <p className="text-white/80 italic leading-relaxed">“{item.quote}”</p>
                <div className="text-white/50 text-sm mt-8 font-medium">{item.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-sec bg-[var(--cchu-red)] py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-black text-5xl md:text-6xl text-white leading-tight tracking-tight">
            Your book deserves to exist.
          </h2>
          <p className="text-white/80 text-lg mt-6">
            Don&apos;t let your manuscript sit on your hard drive. Book a free consultation today and let us walk you through the publishing process.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a 
              href="https://wa.me/2348052929523?text=Hello%2C%20I%20would%20like%20a%20free%20book%20publishing%20consultation"
              className="px-12 py-4 bg-white text-[var(--cchu-red)] font-display font-bold rounded-2xl hover:bg-black hover:text-white transition-all"
            >
              Book Free Consultation →
            </a>
            <a 
              href="#packages" 
              className="px-12 py-4 border border-white/40 text-white hover:border-white hover:text-white rounded-2xl transition-all"
            >
              View packages again
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
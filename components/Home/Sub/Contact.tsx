'use client';

export default function Contact() {
  return (
    <main className="bg-white w-full">
      {/* HERO SECTION */}
      <section className="min-h-[40vh] bg-[var(--cchu-black)] flex items-center relative overflow-hidden px-6 md:px-10 py-20">
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

        <div className="hero-c max-w-4xl mx-auto relative z-10 text-center md:text-left">
          <div className="hero-tag text-xs font-semibold tracking-[2px] uppercase text-white/40 mb-4">
            Contact us
          </div>

          <h1 className="hero-h1 font-display font-black text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em] text-white">
            Let&apos;s talk about<br />
            <span className="text-[var(--cchu-red)]">your next project.</span>
          </h1>

          <p className="hero-sub text-lg text-white/65 mt-6 max-w-md mx-auto md:mx-0">
            Whether you have a question, need a quote, or are ready to place an order — 
            we are here Monday to Saturday, 8am–7pm.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="sec py-24 px-6 md:px-10">
        <div className="si max-w-6xl mx-auto">
          <div className="contact-grid grid md:grid-cols-2 gap-16">
            
            {/* CONTACT FORM */}
            <div>
              <div className="form-card bg-[var(--cchu-light)] border border-[var(--cchu-border)] rounded-3xl p-10 md:p-12">
                <div className="form-title font-display font-bold text-3xl mb-2">Send us a message</div>
                <div className="form-sub text-[var(--cchu-gray)] mb-10">
                  We&apos;ll respond within 2 hours during business hours.
                </div>

                <form className="space-y-6">
                  <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label block text-sm font-medium text-[var(--cchu-dark)] mb-2">Your name</label>
                      <input 
                        type="text" 
                        className="form-input w-full px-5 py-3 border border-[var(--cchu-border)] rounded-2xl focus:border-[var(--cchu-red)] focus:ring-2 focus:ring-[var(--cchu-red-pale)] outline-none" 
                        placeholder="e.g. Amaka Johnson" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label block text-sm font-medium text-[var(--cchu-dark)] mb-2">Phone number</label>
                      <input 
                        type="tel" 
                        className="form-input w-full px-5 py-3 border border-[var(--cchu-border)] rounded-2xl focus:border-[var(--cchu-red)] focus:ring-2 focus:ring-[var(--cchu-red-pale)] outline-none" 
                        placeholder="+234 800 000 0000" 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-[var(--cchu-dark)] mb-2">Email address</label>
                    <input 
                      type="email" 
                      className="form-input w-full px-5 py-3 border border-[var(--cchu-border)] rounded-2xl focus:border-[var(--cchu-red)] focus:ring-2 focus:ring-[var(--cchu-red-pale)] outline-none" 
                      placeholder="you@example.com" 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-[var(--cchu-dark)] mb-2">What do you need?</label>
                    <select className="form-select w-full px-5 py-3 border border-[var(--cchu-border)] rounded-2xl focus:border-[var(--cchu-red)] focus:ring-2 focus:ring-[var(--cchu-red-pale)] outline-none bg-white">
                      <option value="">Select a service...</option>
                      <option>Banners & Large Format Printing</option>
                      <option>Business Starter Kit</option>
                      <option>Branded Souvenirs</option>
                      <option>Signage & Installation (FCT)</option>
                      <option>Product Labels & Stickers</option>
                      <option>Book Publishing</option>
                      <option>Election Campaign Materials</option>
                      <option>Graphic Design</option>
                      <option>Affiliate Program</option>
                      <option>Other / General Inquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label block text-sm font-medium text-[var(--cchu-dark)] mb-2">Your message</label>
                    <textarea 
                      className="form-input w-full px-5 py-3 border border-[var(--cchu-border)] rounded-3xl focus:border-[var(--cchu-red)] focus:ring-2 focus:ring-[var(--cchu-red-pale)] outline-none min-h-[140px]" 
                      placeholder="Tell us about your project, quantity needed, deadline, etc."
                    ></textarea>
                  </div>

                  <button 
                  disabled
                    type="submit"
                    className="btn-submit w-full py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-2xl transition-all text-lg"
                  >
                    Send Message →
                  </button>
                </form>
              </div>
            </div>

            {/* CONTACT INFORMATION */}
            <div className="contact-info space-y-6">
              {/* WhatsApp - Highlighted */}
              <a 
                href="https://wa.me/2348052929523?text=Hello%2C%20I%20want%20to%20discuss%20a%20print%20project"
                className="info-card wa-card bg-[var(--cchu-black)] border border-[var(--cchu-black)] hover:border-[#25D366] p-8 rounded-3xl flex gap-6 items-start group"
              >
                <div className="wa-icon-wrap bg-[#25D366] w-14 h-14 flex items-center justify-center text-3xl rounded-full flex-shrink-0">
                  💬
                </div>
                <div>
                  <div className="wa-label text-xs font-semibold tracking-widest text-white/50">Fastest response</div>
                  <div className="wa-value text-white text-xl font-medium mt-1 leading-tight">
                    WhatsApp us directly<br />
                    +234 805 292 9523
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="info-card bg-white border border-[var(--cchu-border)] p-8 rounded-3xl flex gap-6 hover:border-[var(--cchu-red)] transition-all">
                <div className="info-icon text-3xl">📞</div>
                <div>
                  <div className="info-label text-xs font-semibold tracking-widest text-[var(--cchu-gray)]">Phone</div>
                  <div className="info-value mt-2">
                    <a href="tel:+2349015599370" className="hover:text-[var(--cchu-red)]">+234 901 559 9370</a><br />
                    <a href="tel:+2348063753209" className="hover:text-[var(--cchu-red)]">+234 806 375 3209</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="info-card bg-white border border-[var(--cchu-border)] p-8 rounded-3xl flex gap-6 hover:border-[var(--cchu-red)] transition-all">
                <div className="info-icon text-3xl">📧</div>
                <div>
                  <div className="info-label text-xs font-semibold tracking-widest text-[var(--cchu-gray)]">Email</div>
                  <div className="info-value mt-2">
                    <a href="mailto:info@cchumedia.com" className="hover:text-[var(--cchu-red)]">info@cchumedia.com</a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="info-card bg-white border border-[var(--cchu-border)] p-8 rounded-3xl flex gap-6 hover:border-[var(--cchu-red)] transition-all">
                <div className="info-icon text-3xl">📍</div>
                <div>
                  <div className="info-label text-xs font-semibold tracking-widest text-[var(--cchu-gray)]">Physical outlet</div>
                  <div className="info-value mt-2 leading-relaxed">
                    Suite 38, Mazfallah Shopping Complex<br />
                    Karu, AMAC 900110, Abuja FCT, Nigeria
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="info-card bg-white border border-[var(--cchu-border)] p-8 rounded-3xl flex gap-6 hover:border-[var(--cchu-red)] transition-all">
                <div className="info-icon text-3xl">🕐</div>
                <div>
                  <div className="info-label text-xs font-semibold tracking-widest text-[var(--cchu-gray)]">Opening hours</div>
                  <div className="info-value mt-2">
                    Monday – Saturday: 8:00 AM – 7:00 PM<br />
                    Sunday: Closed
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="map-placeholder bg-[var(--cchu-light)] border border-[var(--cchu-border)] rounded-3xl h-[220px] flex flex-col items-center justify-center gap-4 text-center">
                <span className="text-5xl">🗺️</span>
                <div className="text-[var(--cchu-gray)]">Suite 38, Mazfallah Shopping Complex, Karu, Abuja</div>
                <a 
                  href="https://www.google.com/maps" 
                  target="_blank"
                  className="text-[var(--cchu-red)] font-medium text-sm hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
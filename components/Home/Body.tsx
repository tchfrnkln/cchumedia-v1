import Image from 'next/image'
import React from 'react'
import { AutoSlideshow } from './Header/Carousel'
import Link from 'next/link'
import Dashboard from '../Dashboard/Main'

const Body = () => {

    const whyChooseImages = [
        {src:"/images/Table.jpg", alt:"why choose cchu media"},
        {src:"/images/Shirts.jpg", alt:"why choose cchu media"},
        {src:"/images/Signage.jpg", alt:"why choose cchu media"},
    ] 
    
    const competitivePricing = [
        {src:"/images/banner.jpeg", alt:"cchu media competitive pricing", price:"5k", name:"Banner", description:"Large/Small Scale banner printings"},
        {src:"/images/paper.jpeg", alt:"cchu media competitive pricing", price:"3k", name:"Papers", description:"Catalogues, Flyers and all Papers Sizes"},
        {src:"/images/sticker.jpeg", alt:"cchu media competitive pricing", price:"4k", name:"SAV", description:"Stickers (SELF-Adhesive Vinyl)"},
    ] 

    const expertise = [
        {src:"/images/Table.jpg", alt:"World-Class Expertise", name:"Printing & Publication", description:"Vibrant business cards, banners, posters, custom nylons, stickers, large-format prints, plus professional book production—editing, design, and premium printing to bring your story or brand to life."},
        {src:"/images/Shirts.jpg", alt:"World-Class Expertise", name:"Graphic Design & Videography", description:"Eye-catching logos, marketing visuals, digital graphics, and professional video production—events, promos, brand stories, corporate videos—with expert editing and motion graphics."},
        {src:"/images/Shirts.jpg", alt:"World-Class Expertise", name:"Photography", description:"High-impact product, portrait, event, and commercial shots—beautifully lit, composed, and edited to tell your story with clarity and style."},
        {src:"/images/shirts2.jpeg", alt:"World-Class Expertise", name:"Branding", description:"Strong, cohesive identities: brand stories, visual systems, custom elements (acrylic signs, fabric branding, labels, ID cards, backdrops), and integrated print/digital/video assets that make you stand out."},
    ] 

  return (
    <div className="p-12 w-full h-max bg-[#DCD8EF] text-[#2A2840]">
        {/* Why Choose Us */}
        <div className='flex flex-col gap-3 items-center justify-center text-center'>
            <h1 className='font-bold text-md md:text-xl flex gap-1'>Why <p className='text-[#B91C1C]'>Choose</p></h1>
            <h1 className='font-bold text-2xl md:text-5xl'>C-Chu Media</h1>
            <p className='w-full md:w-1/2'>Since our founding in 2011 and official incorporation in 2013, C-Chu Media Limited has become a go-to name for top-notch media services and solutions. We’re dedicated to delivering excellence to individuals, businesses, and organizations around the world. Our focus on quality and speed ensures that every project is completed on time, with no compromise on value. Our mission is to offer cutting-edge services with outstanding quality, quick turnaround, and fair pricing, making us a standout player in the media industry. Whether you need printing, branding, or digital media services, we’re committed to exceeding your expectations and leading the way in innovation.</p>

            <div className='grid grid-cols-3 gap-5 py-10'>
                {whyChooseImages.map((image, index) => (
                    <Image className='object-cover w-full h-23 md:h-110 rounded-t-full' key={index} src={image.src} alt={image.alt} width={300} height={200}></Image>
                ))}
            </div>
        </div>

        <div className="divider"></div>
        {/* Competitive Prices */}
        <div className='flex flex-col gap-3 items-center justify-center py-3 md:py-10'>
            <h1 className='font-bold text-md md:text-xl flex gap-1 w-full md:w-1/2'>Unbeatable <p className='text-[#B91C1C]'>Competitive</p></h1>
            <h1 className='font-bold text-2xl md:text-5xl w-full md:w-1/2'>Pricing</h1>
            <p className='w-full md:w-1/2'>Quality craftsmanship shouldn’t break the bank. At our studio, we deliver competitive pricing that fits your vision and budget, ensuring every project balances affordability with unmatched excellence. Whether it’s custom signs, branded fabrics, or intricate designs, we offer flexible rates that make premium results accessible—without ever compromising on detail or durability. Let’s bring your ideas to life at a price that works for you.</p>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 py-10 md:p-10'>
                {competitivePricing.map((image, index) => (
                    <div key={index}>
                        <Image className='object-cover w-full h-25 md:h-80 rounded-tl-[50px] rounded-tr-lg'  src={image.src} alt={image.alt} width={300} height={200}></Image>
                        <div className='w-full h-max bg-[#dcd8efe6] flex items-end justify-between py-3'>
                            <div>
                                <p className='font-bold md:text-lg'>{image.name}</p>
                                <p className="text-xs">{image.description}</p>
                            </div>
                            <p className='font-bold md:text-lg text-green-600 underline'>₦{image.price}+</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="divider"></div>
        
        {/* World-Class Expertise */}
        <div className='flex flex-col gap-3 items-center justify-center'>
            <h1 className='font-bold text-md md:text-xl flex gap-1 w-full md:w-1/2'>World <p className='text-[#B91C1C]'>Class</p></h1>
            <h1 className='font-bold text-2xl md:text-5xl w-full md:w-1/2'>Expertise</h1>
            <p className='w-full md:w-1/2'>From bold table markers and event signage to elegant branded apparel, professional labels, high-quality videography, and beyond, our expertise at C-Chu Media Limited spans a comprehensive range of creative solutions tailored for businesses, events, individuals, and organizations worldwide.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-10 md:p-10'>
                {expertise.map((image, index) => (
                    <div key={index} className='flex flex-col md:flex-row justify-center items-center'>
                        <Image className='object-cover w-full md:w-50 h-30 md:h-80 rounded-tl-[50px] rounded-bl-lg'  src={image.src} alt={image.alt} width={300} height={200}></Image>
                        <div className='w-full bg-[#dcd8efe6] flex items-start justify-between mt-4 md:mt-0 md:px-6'>
                            <div>
                                <p className='font-bold text-xl md:text-2xl mb-3'>{`${index+1}. ${image.name}`}</p>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="divider"></div>
            
        {/* Us */}
        <div className='flex gap-3 flex-col-reverse md:flex-row items-center md:items-end justify-center py-10'>
            <div className='w-full md:w-1/2 mt-6 md:mt-0'>
                <div className="flex flex-col justify-center items-start mb-3">
                    <h1 className='font-bold text-md md:text-xl flex gap-1'>Visionary <p className='text-[#B91C1C]'>Media</p></h1>
                    <h1 className='font-bold text-2xl md:text-5xl w-max'>Solutions</h1>
                </div>
                <p>Our team excels at turning concepts into tangible, high-impact pieces—whether vibrant acrylic signs, premium fabric branding (like napkins and shirts in rich hues), industrial room labels, custom ID cards, full event backdrops, captivating photographs, or polished video content—that elevate your brand or occasion with unmatched precision, quick turnaround, and a commitment to exceeding expectations. Whatever your need—from everyday prints and stunning stills to cinematic videos and visionary projects—we’re equipped to deliver standout, value-driven results that birth your imagination into reality.</p>
            </div>
            <AutoSlideshow/>
        </div>
    </div>
  )
}

export default Body

export function Body2() {
  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="min-h-[92vh] md:max-h-[92vh] bg-[var(--cchu-black)] flex items-center relative overflow-hidden px-6 md:px-10 py-20">
  
        {/* Gradient radial patterns (kept from original) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(192,57,43,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(192,57,43,0.08)_0%,transparent_40%)]" />

        {/* Crossed Grid Lines - This is the "crossed boxes" effect you want */}
        <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
            backgroundImage: `
                linear-gradient(to bottom, #ffffff 1px, transparent 1px),
                linear-gradient(to right, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
            }}
        />

        <div className="w-full md:max-w-7xl mx-auto flex md:grid md:grid-cols-2 md:gap-12 items-center relative z-10">
          <div className="hero-content flex flex-col w-full">
            <div className="hero-badge inline-flex md:items-center gap-2 bg-red-950/50 border border-red-900/50 text-[#F5B7B1] text-xs font-medium px-5 py-2 rounded-full mb-6 md:mb-0">
              <div className="hero-badge-dot w-2 h-2 bg-[var(--cchu-red)] rounded-full animate-pulse" />
              Now live — Order printing online
            </div>

            <h1 className="font-display font-black text-5xl md:text-7xl leading-[1.05] tracking-[-0.02em] text-white mb-6 md:mb-2">
              Your print orders,<br />
              <em className="text-[var(--cchu-red)] not-italic">handled online.</em>
            </h1>

            <p className="hero-sub text-lg md:text-xl text-white/65 max-w-lg mb-10 font-light md:mb-1">
              Browse, book, and manage all your printing needs from your phone or laptop. 
              Banners, branding, souvenirs, books and more — trusted by 3,000+ clients since 2011.
            </p>

            <div className="w-full hero-ctas flex flex-wrap justify-start gap-4 mb-12 md:mb-2">
              <Link 
                href="/dashboard" 
                className="btn-hero-primary inline-flex items-center gap-3 px-8 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold rounded-xl transition-all active:scale-95"
              >
                Place Your Order →
              </Link>
              <a 
                href="#services" 
                className="btn-hero-secondary px-8 py-4 border border-white/30 text-white/80 hover:border-white/60 hover:text-white rounded-xl transition-all"
              >
                See all services
              </a>
            </div>

            <div className="hero-stats flex flex-wrap gap-10 text-white">
              <div>
                <div className="hero-stat-num font-display text-4xl font-black">13+</div>
                <div className="hero-stat-label text-xs text-white/50 mt-1">Years in business</div>
              </div>
              <div className="hero-stat-divider w-px bg-white/10" />
              <div>
                <div className="hero-stat-num font-display text-4xl font-black">3,000+</div>
                <div className="hero-stat-label text-xs text-white/50 mt-1">Jobs delivered</div>
              </div>
              <div className="hero-stat-divider w-px bg-white/10" />
              <div>
                <div className="hero-stat-num font-display text-4xl font-black">₦3k+</div>
                <div className="hero-stat-label text-xs text-white/50 mt-1">Starting price</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual hidden md:flex justify-center">
            <div className="hero-card-stack relative w-[340px] h-[420px]">
              <div className="hero-card hero-card-accent absolute top-0 left-0 w-[220px] h-[260px] bg-gradient-to-br from-[var(--cchu-red)] to-[var(--cchu-red-dark)] rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center">
                <div className="price-tag bg-[var(--cchu-gold)] text-[var(--cchu-black)] font-display font-black text-3xl px-6 py-2 rounded-xl">
                  ₦35,000
                </div>
                <div className="price-label text-white/80 mt-4 text-sm">Business Starter Kit</div>
                <div className="price-label text-white/60 text-xs mt-1 text-center">Cards · Letterhead · Flyers · ID</div>
              </div>

              <div className="hero-card hero-card-main absolute bottom-0 right-0 w-[300px] h-[380px] bg-gradient-to-br from-[#2C2C2C] to-[#1A1A1A] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center gap-6 text-center">
                <div className="text-white/50 text-xs tracking-widest uppercase">Order online</div>
                <div className="text-white font-display text-2xl font-bold">Book. Print. Delivered.</div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Banners', 'Signage', 'Souvenirs', 'Books', 'Labels'].map((item) => (
                    <span key={item} className="bg-red-900/30 text-[#F5B7B1] text-xs px-4 py-1 rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="text-white/30 text-xs mt-4">printhub.cchumedia.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dashboard initialSearch='Card'/>

      {/* TRUST BAR */}
      <div className="hidden trust-bar bg-[var(--cchu-light)] border-b border-[var(--cchu-border)] py-5 px-6 md:px-10 flex items-center gap-8 overflow-hidden">
        <div className="trust-label text-xs font-semibold uppercase tracking-widest text-[var(--cchu-gray)] whitespace-nowrap">Trusted by</div>
        <div className="trust-divider w-px h-7 bg-[var(--cchu-border)]" />
        <div className="trust-logos flex gap-8 items-center overflow-x-auto pb-1">
          {['EFCC', 'FRSC', 'NAMA', 'Living Faith Church', 'Labour Party', 'Hallmark Insurance', 'ADC Party', 'CIRA Juice'].map((name) => (
            <div key={name} className="trust-logo bg-white border border-[var(--cchu-border)] px-5 py-2 rounded-lg text-sm font-medium text-[var(--cchu-gray)] whitespace-nowrap">
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section py-24 px-6 md:px-10" id="how-it-works">
        <div className="section-inner max-w-6xl mx-auto">
          <div className="section-tag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Simple process</div>
          <h2 className="section-title font-display font-black text-4xl md:text-5xl leading-tight tracking-[-0.02em] mb-4">
            Order your printing<br />in three easy steps
          </h2>
          <p className="section-sub text-[var(--cchu-gray)] text-lg max-w-md">
            No more running around. Place your order online and we handle everything from production to delivery.
          </p>

          <div className="steps grid md:grid-cols-3 gap-6 mt-16">
            {[
              { num: "01", icon: "📋", title: "Register & Browse", desc: "Create your free account, browse our services, upload your design or let us create one for you." },
              { num: "02", icon: "🖨️", title: "We Print & Produce", desc: "Our team reviews your order and produces with precision at our Karu, Abuja studio." },
              { num: "03", icon: "🚀", title: "Pick up or Deliver", desc: "Collect from our Abuja outlet or get nationwide delivery. Installation available in FCT." }
            ].map((step, i) => (
              <div key={i} className="step-card bg-[var(--cchu-light)] border border-[var(--cchu-border)] rounded-3xl p-10 hover:border-[var(--cchu-red)] relative">
                <div className="step-num font-display text-7xl text-[var(--cchu-red)] opacity-10 absolute top-8 right-8">{step.num}</div>
                <div className="step-icon w-14 h-14 bg-[var(--cchu-red-pale)] rounded-2xl flex items-center justify-center text-3xl mb-6">
                  {step.icon}
                </div>
                <div className="step-title font-display font-bold text-2xl mb-3">{step.title}</div>
                <p className="step-desc text-[var(--cchu-gray)] text-[15px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-bg bg-[var(--cchu-light)] py-24 px-6 md:px-10" id="services">
        <div className="section-inner max-w-6xl mx-auto">
          <div className="section-tag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">What we print</div>
          <h2 className="section-title font-display font-black text-4xl md:text-5xl leading-tight tracking-[-0.02em] mb-4">
            Everything your brand needs,<br />all in one place
          </h2>
          <p className="section-sub text-[var(--cchu-gray)] text-lg max-w-md">
            From a single flyer to full corporate branding — we handle it all with speed and quality.
          </p>

          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { icon: "🏷️", name: "Banners & Large Format", desc: "Indoor & outdoor banners, roll-ups, backdrops.", price: "From ₦5,000", item:'Banner' },
              { icon: "👕", name: "Branded Souvenirs", desc: "Custom shirts, caps, mugs, bags & corporate gifts.", price: "Get a quote", item:'Branded' },
              { icon: "📄", name: "Papers & Stationery", desc: "Business cards, letterheads, flyers & catalogues.", price: "From ₦3,000", item:'Paper' },
              { icon: "🏷️", name: "Stickers & Labels", desc: "Product labels, SAV stickers & custom packaging.", price: "From ₦4,000", item:'Sticker' },
              { icon: "🪧", name: "Signage & Installation", desc: "Professional signage with on-site installation.", price: "From ₦80,000", item:'Signage' },
              { icon: "📚", name: "Book Publishing", desc: "End-to-end book design, printing & binding.", price: "From ₦80,000", item:'Book' },
              { icon: "🗳️", name: "Campaign Materials", desc: "Election packages with fast turnaround.", price: "From ₦50,000", item:'Campaign' },
              // { icon: "🎨", name: "Graphic Design", desc: "Logos, brand identity & marketing visuals.", price: "Get a quote" },
            ].map((service, i) => (
              <a target='_blank' href={`/dashboard?item=${service.item}`} key={i} className="service-card bg-white border border-[var(--cchu-border)] rounded-2xl p-8 hover:border-[var(--cchu-red)] hover:shadow-xl transition-all group">
                <div className="service-icon text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <div className="service-name font-display font-bold text-xl mb-3">{service.name}</div>
                <p className="service-desc text-[var(--cchu-gray)] text-sm leading-relaxed flex-1">{service.desc}</p>
                <div className="service-price mt-6 text-[var(--cchu-red)] font-semibold">{service.price}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STARTER KITS */}
      <section className="section py-24 px-6 md:px-10" id="starter-kits">
        <div className="section-inner max-w-6xl mx-auto">
          <div className="section-tag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">New business? Start here</div>
          <h2 className="section-title font-display font-black text-4xl md:text-5xl leading-tight tracking-[-0.02em]">Business Starter Kits</h2>
          <p className="section-sub text-[var(--cchu-gray)] text-lg max-w-md mt-4">
            Everything a new business needs to look professional from day one.
          </p>

          <div className="kits-grid grid md:grid-cols-3 gap-8 mt-16">
            {/* Basic Kit */}
            <div className="kit-card border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="kit-header p-8">
                <span className="kit-badge basic bg-[#F0F0EC] text-[#666] text-xs font-semibold px-4 py-1 rounded-full">Starter</span>
                <div className="kit-name font-display font-black text-3xl mt-4">Basic Kit</div>
                <div className="kit-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-2">₦35,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small></div>
                <p className="kit-tagline text-[var(--cchu-gray)] mt-4">&quot;You just registered your business. Now look like one.&quot;</p>
              </div>
              <div className="kit-items bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] flex-1">
                {["Business cards (100 pcs)", "Letterhead (50 sheets)", "Flyers (100 pcs A5)", "Logo design (1 concept)", "All files delivered digitally"].map((item, i) => (
                  <div key={i} className="kit-item flex gap-3 mb-4">
                    <div className="kit-item-dot w-2 h-2 mt-2 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />
                    <div className="kit-item-text text-sm">{item}</div>
                  </div>
                ))}
              </div>
              <div className="kit-footer p-6 border-t border-[var(--cchu-border)] bg-white">
                <a target='_blank' href="https://wa.me/2348052929523?text=Hi!%20I%20want%20to%20order%20the%20Basic%20Starter%20kit%20(%E2%82%A635%2C000)" className="btn-kit basic block text-center py-4 border border-[var(--cchu-border)] hover:border-[var(--cchu-red)] hover:text-[var(--cchu-red)] rounded-xl font-display font-bold">Order Starter Kit</a>
              </div>
            </div>

            {/* Standard Kit - Featured */}
            <div className="kit-card featured border-2 border-[var(--cchu-red)] rounded-3xl overflow-hidden shadow-xl scale-105">
              <div className="kit-header p-8">
                <div>
                  <span className="kit-badge standard bg-[var(--cchu-red-pale)] text-[var(--cchu-red)] text-xs font-semibold px-4 py-1 rounded-full">Standard</span>
                  <span className="kit-popular ml-2 bg-[var(--cchu-red)] text-white text-[10px] px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <div className="kit-name font-display font-black text-3xl mt-4">Business Kit</div>
                <div className="kit-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-2">₦65,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small></div>
                <p className="kit-tagline text-[var(--cchu-gray)] mt-4">&quot;Look established from day one.&quot;</p>
              </div>
              <div className="kit-items bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] flex-1">
                {["Business cards (200 pcs)", "Letterhead (100 sheets)", "Flyers (250 pcs A5)", "Staff ID cards (5 pcs)", "Logo design (2 concepts)", "Brand colour & font guide", "Save ~₦20,000"].map((item, i) => (
                  <div key={i} className="kit-item flex gap-3 mb-4">
                    <div className="kit-item-dot w-2 h-2 mt-2 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />
                    <div className="kit-item-text text-sm">{item}</div>
                  </div>
                ))}
              </div>
              <div className="kit-footer p-6 border-t border-[var(--cchu-border)] bg-white">
                <a target='_blank' href="https://wa.me/2348052929523?text=Hi!%20I%20want%20to%20order%20the%20Business%20Pro%20kit%20(%E2%82%A665%2C000)" className="btn-kit standard block text-center py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white rounded-xl font-display font-bold">Order Business Kit</a>
              </div>
            </div>

            {/* Premium Kit */}
            <div className="kit-card border border-[var(--cchu-border)] rounded-3xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="kit-header p-8">
                <span className="kit-badge premium bg-[#FBF5E6] text-[#8B6914] text-xs font-semibold px-4 py-1 rounded-full">Premium</span>
                <div className="kit-name font-display font-black text-3xl mt-4">Corporate Kit</div>
                <div className="kit-price font-display text-4xl md:text-5xl font-black text-[var(--cchu-red)] mt-2">₦120,000 <small className="text-base font-normal text-[var(--cchu-gray)]">flat fee</small></div>
                <p className="kit-tagline text-[var(--cchu-gray)] mt-4">&quot;Arrive in every room looking like a million naira.&quot;</p>
              </div>
              <div className="kit-items bg-[var(--cchu-light)] p-8 border-t border-[var(--cchu-border)] flex-1">
                {["Business cards (500 pcs laminated)", "Letterhead + envelope", "Flyers (500 pcs)", "Staff ID cards (15 pcs)", "Logo (3 concepts)", "Full brand identity guide", "Roll-up banner (1 pc)"].map((item, i) => (
                  <div key={i} className="kit-item flex gap-3 mb-4">
                    <div className="kit-item-dot w-2 h-2 mt-2 bg-[var(--cchu-red)] rounded-full flex-shrink-0" />
                    <div className="kit-item-text text-sm">{item}</div>
                  </div>
                ))}
              </div>
              <div className="kit-footer p-6 border-t border-[var(--cchu-border)] bg-white">
                <a target='_blank' href="https://wa.me/2348052929523?text=Hi!%20I%20want%20to%20order%20the%20Corporate%20Suite%20kit%20(%E2%82%A6120%2C000)" className="btn-kit premium block text-center py-4 bg-[var(--cchu-black)] hover:bg-zinc-800 text-white rounded-xl font-display font-bold">Order Corporate Kit</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="clients-section bg-[var(--cchu-black)] py-20 px-6 md:px-10">
        <div className="clients-inner max-w-6xl mx-auto">
          <div className="clients-top flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="clients-title font-display font-black text-3xl md:text-5xl text-white">Trusted by Nigeria&apos;s<br />leading organisations</h2>
              <p className="clients-sub text-white/50 mt-3">From government agencies to churches and businesses</p>
            </div>
            <div className="clients-stat text-right">
              <div className="clients-stat-num font-display  text-5xl md:text-6xl font-black text-[var(--cchu-red)]">3,000+</div>
              <div className="clients-stat-label text-white/50 text-sm">Jobs delivered since 2011</div>
            </div>
          </div>

          <div className="clients-logos grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['EFCC','FRSC','NAMA','Living Faith Church','Labour Party','ADC Party','Hallmark Insurance','CIRA Juice','Fairplay Hotel','Whiteball Lounge','Glory Intl School','Highgrade School'].map((client) => (
              <div key={client} className="client-logo-card bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/60 hover:bg-red-950/30 hover:border-red-900/30 hover:text-white/90 transition-all text-sm font-medium">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AFFILIATE */}
      <section className="affiliate-section bg-[var(--cchu-red)] py-24 px-6 md:px-10" id="affiliate">
        <div className="affiliate-inner max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="affiliate-tag text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">Affiliate program</div>
            <h2 className="affiliate-title font-display font-black text-5xl leading-tight text-white">Refer clients.<br />Earn for life.</h2>
            <p className="affiliate-sub text-white/80 text-lg mt-6">Join our affiliate program and earn commission on every order your referrals place — forever.</p>
            <Link href="/auth/new" className="btn-affiliate inline-block mt-8 bg-white text-[var(--cchu-red)] hover:bg-black hover:text-white font-display font-bold px-10 py-4 rounded-2xl">Join free — Get your link →</Link>
          </div>

          <div className="commission-cards space-y-4">
            {[
              { pct: "10%", range: "Orders 1 – 5", desc: "Earn 10% on the 1st 5 orders" },
              { pct: "5%", range: "Orders 6 – 10", desc: "5% on the next 5 orders" },
              { pct: "3%", range: "Order 11 onwards — forever", desc: "True passive income on every order", highlight: true }
            ].map((comm, i) => (
              <div key={i} className={`commission-card flex items-center gap-6 p-8 rounded-2xl border ${comm.highlight ? 'bg-black/30 border-white/30' : 'bg-black/15 border-white/15'}`}>
                <div className="commission-pct font-display text-4xl md:text-5xl font-black text-white min-w-[80px]">{comm.pct}</div>
                <div className="flex flex-col w-full">
                    <div>
                    <div className="commission-orders text-white/70 text-xs font-semibold tracking-widest uppercase">{comm.range}</div>
                    <div className="commission-desc text-white/90 mt-1">{comm.desc}</div>
                    </div>
                    <div className="commission-arrow text-3xl text-white/40">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section py-24 px-6 md:px-10">
        <div className="section-inner max-w-6xl mx-auto">
          <div className="section-tag text-[var(--cchu-red)] text-xs font-semibold tracking-widest uppercase mb-3">Client feedback</div>
          <h2 className="section-title font-display font-black text-4xl md:text-5xl leading-tight tracking-[-0.02em]">What our clients say</h2>
          <p className="section-sub text-[var(--cchu-gray)] text-lg max-w-md mt-4">Over 3,000 jobs delivered across Nigeria.</p>

          <div className="testimonials-grid grid md:grid-cols-3 gap-8 mt-16">
            {[
              { name: "Mama Tiara", role: "Event Organiser, Abuja", text: "C-Chu Media delivered our event banners and branded shirts with incredible quality. Everything was ready ahead of schedule." },
              { name: "Lawrence Luke", role: "Business Owner, Abuja", text: "From business cards to our office signage installation — C-Chu Media handled everything professionally." },
              { name: "Adeola Okafor", role: "Author, Lagos", text: "I published my first book with C-Chu Media and the result was stunning. The team are true professionals." }
            ].map((t, i) => (
              <div key={i} className="testimonial-card bg-[var(--cchu-light)] border border-[var(--cchu-border)] rounded-3xl p-10">
                <div className="testimonial-stars text-[var(--cchu-gold)] text-2xl mb-6">★★★★★</div>
                <p className="testimonial-text text-[15px] leading-relaxed italic">“{t.text}”</p>
                <div className="testimonial-author flex items-center gap-4 mt-10">
                  <div className="testimonial-avatar w-12 h-12 bg-[var(--cchu-red)] rounded-full flex items-center justify-center text-white font-display font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="testimonial-name font-semibold">{t.name}</div>
                    <div className="testimonial-role text-xs text-[var(--cchu-gray)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-banner bg-[var(--cchu-black)] py-24 px-6 md:px-10 text-center">
        <div className="cta-inner max-w-2xl mx-auto">
          <h2 className="cta-title font-display font-black text-4xl md:text-5xl md:text-6xl leading-tight text-white tracking-[-0.02em]">
            Ready to <em className="text-[var(--cchu-red)] not-italic">print</em><br />something great?
          </h2>
          <p className="cta-sub text-white/60 text-lg mt-6">Register free on PrintHub and place your first order today.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link 
              href="/auth/new" 
              className="inline-flex items-center justify-center px-10 py-4 bg-[var(--cchu-red)] hover:bg-[var(--cchu-red-dark)] text-white font-display font-bold text-lg rounded-2xl transition-all"
            >
              Register Free & Order →
            </Link>
            <Link 
              href="https://wa.me/2348052929523" 
              target="_blank"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/30 hover:border-white/60 text-white/90 hover:text-white rounded-2xl transition-all text-lg"
            >
              WhatsApp us first
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
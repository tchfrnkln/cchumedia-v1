// ================================================================
// PRINTHUB — lib/data.js
// All catalogue, config & static data
// ================================================================

export const CONFIG = {
  siteName: 'PrintHub',
  tagline: 'by C-Chu Media Ltd',
  phone1: '+234 806 375 3209',
  phone2: '+234 805 292 9523',
  whatsapp: '2348052929523',
  email: 'info@cchumedia.com',
  address: 'Suite 38, Mazfallah Shopping Complex, Karu, Abuja FCT',
  hours: 'Mon – Sat: 8:00 AM – 7:00 PM',
  wa: (msg) => `https://wa.me/2348052929523?text=${encodeURIComponent(msg)}`,
  currency: '₦',
  loyaltyRate: 0.02,
};

export const CATEGORIES = [
  { id: 'all',        label: 'All Products',          icon: '🛒' },
  { id: 'banners',    label: 'Banners & Large Format', icon: '🏷️'  },
  { id: 'cards',      label: 'Business Cards',         icon: '💼'  },
  { id: 'flyers',     label: 'Flyers & Leaflets',      icon: '📄'  },
  { id: 'apparel',    label: 'Branded Apparel',        icon: '👕'  },
  { id: 'books',      label: 'Book Publishing',        icon: '📚'  },
  { id: 'signage',    label: 'Signage & Installation', icon: '🪧'  },
  { id: 'souvenirs',  label: 'Souvenirs & Gifts',      icon: '🎁'  },
  { id: 'stickers',   label: 'Stickers & Labels',      icon: '🏷️'  },
  { id: 'events',     label: 'Event Materials',        icon: '🎪'  },
  { id: 'campaign',   label: 'Campaign Materials',     icon: '🗳️'  },
  { id: 'nylon',      label: 'Custom Nylon Bags',      icon: '🛍️'  },
  { id: 'packaging',  label: 'Packaging & Boxes',      icon: '📦'  },
  { id: 'stationery', label: 'Office Stationery',      icon: '📋'  },
];

export const PRODUCTS = [
  // BANNERS
  { id:'p001', name:'Standard Roll-up Banner', cat:'banners', icon:'🏷️', basePrice:8000, origPrice:10000, rating:4.9, reviews:234, badge:'Bestseller', desc:'85×200cm · Single or double-sided · Includes aluminium stand. UV-resistant print, durable for indoor and outdoor events.', featured:true },
  { id:'p002', name:'Pull-up X Banner', cat:'banners', icon:'📢', basePrice:6000, origPrice:null, rating:4.8, reviews:156, badge:'Popular', desc:'60×160cm · Lightweight and portable · Ideal for exhibitions. Comes with carry bag.', featured:true },
  { id:'p003', name:'Flex Banner Print (per sqm)', cat:'banners', icon:'🎌', basePrice:5000, origPrice:null, rating:4.7, reviews:312, badge:'Sale', desc:'Any custom size · Outdoor-grade flex material · UV & weather resistant ink.', featured:false },
  { id:'p004', name:'Step & Repeat Backdrop', cat:'banners', icon:'🎭', basePrice:35000, origPrice:42000, rating:5.0, reviews:89, badge:'Premium', desc:'2×2m standard size · High resolution print · Red carpet event ready. Includes stand.', featured:true },
  { id:'p005', name:'Mesh/Perforated Banner', cat:'banners', icon:'🌬️', basePrice:12000, origPrice:null, rating:4.6, reviews:67, badge:null, desc:'Fence or window display · Wind resistant perforated mesh.', featured:false },
  { id:'p006', name:'Teardrop Feather Flag', cat:'banners', icon:'🎏', basePrice:18000, origPrice:22000, rating:4.8, reviews:43, badge:'New', desc:'4.5m outdoor wind flag · With ground spike · Full colour sublimation.', featured:false },
  { id:'p007', name:'Cloth Backdrop (Event)', cat:'banners', icon:'🎬', basePrice:22000, origPrice:28000, rating:4.9, reviews:55, badge:'Popular', desc:'3×2m fabric banner · Wrinkle-resistant · Luxury feel for events.', featured:false },
  { id:'p008', name:'Billboard Print (Flex)', cat:'banners', icon:'🏗️', basePrice:45000, origPrice:null, rating:4.7, reviews:34, badge:null, desc:'Large format billboard · Any size · Delivered rolled, ready for mounting.', featured:false },
  // CARDS
  { id:'p009', name:'Premium Business Cards (100pcs)', cat:'cards', icon:'💼', basePrice:3500, origPrice:5000, rating:4.9, reviews:567, badge:'Bestseller', desc:'100 pcs · 400gsm thick card · Glossy or matte finish · Double-sided full colour.', featured:true },
  { id:'p010', name:'Matte Laminated Cards (100pcs)', cat:'cards', icon:'🃏', basePrice:4500, origPrice:null, rating:4.8, reviews:234, badge:'Popular', desc:'100 pcs · Soft-touch matte lamination · Premium feel.', featured:false },
  { id:'p011', name:'Spot UV Business Cards (100pcs)', cat:'cards', icon:'✨', basePrice:7500, origPrice:10000, rating:4.9, reviews:123, badge:'Premium', desc:'100 pcs · Selective UV coating on design elements · Luxury texture.', featured:true },
  { id:'p012', name:'Folded Business Cards (100pcs)', cat:'cards', icon:'📎', basePrice:5000, origPrice:null, rating:4.7, reviews:89, badge:null, desc:'100 pcs · Folds to credit card size · Extra space for services.', featured:false },
  { id:'p013', name:'Rounded Corner Cards (100pcs)', cat:'cards', icon:'🪪', basePrice:4200, origPrice:null, rating:4.8, reviews:145, badge:null, desc:'100 pcs · 350gsm · Rounded corners for a modern look.', featured:false },
  { id:'p014', name:'Mini Business Cards (100pcs)', cat:'cards', icon:'🔖', basePrice:3000, origPrice:null, rating:4.6, reviews:78, badge:null, desc:'100 pcs · 55×35mm · Great for creatives and personal brands.', featured:false },
  // FLYERS
  { id:'p015', name:'A5 Flyers Full Colour (250pcs)', cat:'flyers', icon:'📄', basePrice:3000, origPrice:4000, rating:4.8, reviews:445, badge:'Bestseller', desc:'250 pcs · 130gsm coated · Double-sided full colour. Perfect for events.', featured:true },
  { id:'p016', name:'A4 Poster / Flyer (100pcs)', cat:'flyers', icon:'📋', basePrice:4500, origPrice:null, rating:4.7, reviews:234, badge:'Popular', desc:'100 pcs · 170gsm gloss · Vivid full colour · Single or double-sided.', featured:false },
  { id:'p017', name:'DL Leaflet / Trifold (250pcs)', cat:'flyers', icon:'📰', basePrice:5500, origPrice:7000, rating:4.8, reviews:156, badge:'Sale', desc:'250 pcs · Tri-fold or Z-fold · 150gsm coated.', featured:false },
  { id:'p018', name:'A6 Postcard Flyers (500pcs)', cat:'flyers', icon:'📬', basePrice:2500, origPrice:null, rating:4.7, reviews:189, badge:null, desc:'500 pcs · 350gsm postcard weight · Compact marketing.', featured:false },
  { id:'p019', name:'A3 Poster (50pcs)', cat:'flyers', icon:'🖼️', basePrice:6000, origPrice:null, rating:4.6, reviews:98, badge:null, desc:'50 pcs · 170gsm · Large and attention-grabbing.', featured:false },
  // APPAREL
  { id:'p020', name:'Branded Cotton T-Shirt', cat:'apparel', icon:'👕', basePrice:2500, origPrice:3500, rating:4.9, reviews:789, badge:'Bestseller', desc:'Per piece · 180gsm ringspun cotton · Screen print or heat transfer.', featured:true },
  { id:'p021', name:'Polo Shirt (Embroidery)', cat:'apparel', icon:'👔', basePrice:4500, origPrice:null, rating:4.8, reviews:234, badge:'Popular', desc:'Per piece · Pique cotton polo · Embroidered logo · Corporate uniforms.', featured:true },
  { id:'p022', name:'Baseball Cap (Print)', cat:'apparel', icon:'🧢', basePrice:2800, origPrice:4000, rating:4.7, reviews:167, badge:'Sale', desc:'Per piece · 6-panel structured cap · Front print or embroidery.', featured:false },
  { id:'p023', name:'Branded Hoodie', cat:'apparel', icon:'🧥', basePrice:6500, origPrice:null, rating:4.8, reviews:89, badge:'Premium', desc:'Per piece · Heavyweight fleece · Screen print or embroidery.', featured:false },
  { id:'p024', name:'Corporate Jacket', cat:'apparel', icon:'🥼', basePrice:9000, origPrice:12000, rating:4.8, reviews:56, badge:null, desc:'Per piece · Branded windbreaker or softshell jacket.', featured:false },
  { id:'p025', name:'Branded Vest / Bib', cat:'apparel', icon:'🦺', basePrice:3500, origPrice:null, rating:4.7, reviews:78, badge:null, desc:'Per piece · Reflective or plain · Screen print.', featured:false },
  { id:'p026', name:'Branded Apron', cat:'apparel', icon:'👨‍🍳', basePrice:4000, origPrice:null, rating:4.6, reviews:45, badge:null, desc:'Per piece · Canvas or poly cotton · Embroidered or printed logo.', featured:false },
  // BOOKS
  { id:'p027', name:'Perfect Bound Book', cat:'books', icon:'📚', basePrice:80000, origPrice:100000, rating:5.0, reviews:45, badge:'Premium', desc:'Full design + typesetting + print. 100–300 pages. Soft cover perfect binding.', featured:true },
  { id:'p028', name:'Spiral Bound Notebook', cat:'books', icon:'📓', basePrice:15000, origPrice:null, rating:4.8, reviews:123, badge:'Popular', desc:'50 pcs minimum · Custom cover design · A4 or A5.', featured:false },
  { id:'p029', name:'Saddle-Stitched Booklet', cat:'books', icon:'📒', basePrice:8000, origPrice:null, rating:4.7, reviews:89, badge:null, desc:'Any size · 8–48 pages · Full colour cover and interior.', featured:false },
  { id:'p030', name:'Hard Cover Book', cat:'books', icon:'📗', basePrice:150000, origPrice:null, rating:5.0, reviews:23, badge:'Luxury', desc:'Hardcover casebound · Premium finish · Full design + print.', featured:false },
  // SIGNAGE
  { id:'p031', name:'Acrylic Signage Board', cat:'signage', icon:'🪧', basePrice:45000, origPrice:60000, rating:4.9, reviews:67, badge:'Premium', desc:'Custom size · Wall or freestanding · Backlit or non-lit.', featured:true },
  { id:'p032', name:'Aluminium Composite Sign', cat:'signage', icon:'🔲', basePrice:25000, origPrice:null, rating:4.8, reviews:89, badge:'Popular', desc:'Outdoor durable ACP board · Any size · UV print · Mounted.', featured:false },
  { id:'p033', name:'3D Channel Lettering', cat:'signage', icon:'🔤', basePrice:80000, origPrice:null, rating:5.0, reviews:34, badge:'Premium', desc:'Illuminated or non-lit · Any font and colour · Fabricated metal letters.', featured:false },
  { id:'p034', name:'Foamboard / Foam Sign', cat:'signage', icon:'📌', basePrice:8000, origPrice:null, rating:4.6, reviews:112, badge:null, desc:'Lightweight foam board · Any size · Full colour print.', featured:false },
  { id:'p035', name:'Office Door Signs', cat:'signage', icon:'🚪', basePrice:5000, origPrice:null, rating:4.7, reviews:78, badge:null, desc:'Acrylic or metal plate · Custom text/logo · Multiple finish options.', featured:false },
  // SOUVENIRS
  { id:'p036', name:'Branded Ceramic Mug', cat:'souvenirs', icon:'☕', basePrice:2000, origPrice:2800, rating:4.8, reviews:345, badge:'Bestseller', desc:'Per piece · 11oz ceramic · Full colour sublimation print.', featured:true },
  { id:'p037', name:'Custom Tote Bag', cat:'souvenirs', icon:'👜', basePrice:1800, origPrice:null, rating:4.7, reviews:234, badge:'Popular', desc:'Per piece · Natural cotton canvas · Screen print one or both sides.', featured:false },
  { id:'p038', name:'Branded Pen', cat:'souvenirs', icon:'🖊️', basePrice:500, origPrice:700, rating:4.6, reviews:567, badge:'Sale', desc:'Per piece · Metal or plastic body · Laser engraved or pad printed logo.', featured:false },
  { id:'p039', name:'Branded Umbrella', cat:'souvenirs', icon:'☂️', basePrice:5000, origPrice:7000, rating:4.8, reviews:89, badge:null, desc:'Per piece · Full size with sleeve · Custom printed canopy.', featured:false },
  { id:'p040', name:'Branded Keyring', cat:'souvenirs', icon:'🔑', basePrice:800, origPrice:null, rating:4.5, reviews:234, badge:null, desc:'Per piece · Metal or acrylic · Laser engraved or printed logo.', featured:false },
  { id:'p041', name:'Executive Notebook Set', cat:'souvenirs', icon:'📝', basePrice:3500, origPrice:5000, rating:4.8, reviews:89, badge:'Premium', desc:'Per set · A5 notebook + pen · Branded box packaging.', featured:false },
  // STICKERS
  { id:'p042', name:'SAV Cut Stickers', cat:'stickers', icon:'🏷️', basePrice:4000, origPrice:null, rating:4.8, reviews:234, badge:'Popular', desc:'Any shape · Outdoor vinyl · Waterproof and UV resistant.', featured:false },
  { id:'p043', name:'Product Labels (Roll 500pcs)', cat:'stickers', icon:'🔖', basePrice:6000, origPrice:8000, rating:4.9, reviews:156, badge:'Bestseller', desc:'500 pcs per roll · Custom size · Gloss or matte lamination.', featured:true },
  { id:'p044', name:'Bumper / Car Stickers', cat:'stickers', icon:'🚗', basePrice:3000, origPrice:null, rating:4.6, reviews:89, badge:null, desc:'Custom size · Heavy duty vinyl · Weatherproof.', featured:false },
  { id:'p045', name:'Wall / Window Sticker', cat:'stickers', icon:'🪟', basePrice:5000, origPrice:null, rating:4.7, reviews:67, badge:null, desc:'Clear or white vinyl · Any size · Full colour.', featured:false },
  // EVENTS
  { id:'p046', name:'Conference ID Tags (50pcs)', cat:'events', icon:'🪪', basePrice:1500, origPrice:null, rating:4.7, reviews:234, badge:'Popular', desc:'50 pcs · Full colour PVC card · With printed lanyard.', featured:false },
  { id:'p047', name:'Event Programme Booklet (100pcs)', cat:'events', icon:'📋', basePrice:12000, origPrice:15000, rating:4.8, reviews:89, badge:null, desc:'100 pcs · A5 · Full colour cover + text pages · Saddle stitched.', featured:false },
  { id:'p048', name:'Backdrop + Red Carpet', cat:'events', icon:'🎬', basePrice:55000, origPrice:70000, rating:5.0, reviews:34, badge:'Premium', desc:'3×2m printed backdrop + 5m red carpet. Complete event entrance setup.', featured:true },
  { id:'p049', name:'Table Numbers & Placards', cat:'events', icon:'🍽️', basePrice:3000, origPrice:null, rating:4.6, reviews:78, badge:null, desc:'20 pcs · Acrylic or card base · Printed numbers or names.', featured:false },
  { id:'p050', name:'Waist Sash / Ribbon', cat:'events', icon:'🎗️', basePrice:2000, origPrice:null, rating:4.5, reviews:55, badge:null, desc:'Per piece · Satin or silk · Full colour print.', featured:false },
  // CAMPAIGN
  { id:'p051', name:'Campaign T-Shirts (Bulk)', cat:'campaign', icon:'🗳️', basePrice:2000, origPrice:2800, rating:4.8, reviews:234, badge:'Popular', desc:'Per piece · Bulk order pricing · 3-colour print available · Rush turnaround.', featured:true },
  { id:'p052', name:'Campaign Flyers (1000pcs)', cat:'campaign', icon:'📢', basePrice:15000, origPrice:20000, rating:4.9, reviews:156, badge:'Sale', desc:'1000 pcs A5 · Full colour · Fast 48hr turnaround available.', featured:false },
  { id:'p053', name:'Campaign Banners (Bulk)', cat:'campaign', icon:'📣', basePrice:6000, origPrice:null, rating:4.8, reviews:89, badge:null, desc:'Per banner · Any size · Full colour · Rush production available.', featured:false },
  { id:'p054', name:'Vehicle Branding / Decal', cat:'campaign', icon:'🚐', basePrice:25000, origPrice:null, rating:4.9, reviews:45, badge:'Premium', desc:'Full or partial vehicle wrap · Cars, buses and vans.', featured:false },
];

export const TRUST_ITEMS = [
  { icon: '🚚', text: 'Same-day Abuja delivery' },
  { icon: '✅', text: 'Free design review' },
  { icon: '🔬', text: '300 DPI quality check' },
  { icon: '💳', text: 'Paystack · Bank Transfer · Whatapp' },
  { icon: '📦', text: 'Nationwide shipping' },
  { icon: '🔄', text: 'Free reprint guarantee' },
];

export const DELIVERY_OPTIONS = [
  { id: 'pickup',     label: 'Pickup at Karu, Abuja',  icon: '🏪', sub: 'Suite 38, Mazfallah Complex · Ready same day (orders before 2PM)', fee: 0 },
  { id: 'abuja',      label: 'Abuja Delivery',         icon: '🚗', sub: 'Delivered within Abuja FCT · 1–2 business days', fee: 2000 },
  { id: 'nationwide', label: 'Nationwide Courier',      icon: '📦', sub: 'GIG Logistics / DHL · 2–5 business days nationwide', fee: 5000 },
];

export const PAYMENT_OPTIONS = [
  { id: 'transfer', label: 'Bank Transfer', icon: '🏦', sub: 'Transfer to our GTBank account · Manual confirmation' },
  { id: 'paystack', label: 'Paystack (Card / USSD)', icon: '💳', sub: 'Secure online card payment · Instant confirmation' },
  { id: 'whatsapp', label: 'Pay via WhatsApp', icon: '💬', sub: 'Send payment proof on WhatsApp · We confirm within 30 mins' },
];

export function formatNaira(n) {
  return '₦' + Number(n).toLocaleString('en-NG');
}

export function calcProductPrice(basePrice, size, material, finishing, turnaround, qty, price) {
  let unit;
  if(price){
    unit = price
  } else{
    unit = basePrice;
  }

  const sizeM = { 'A5':1, 'A4':1.4, 'A3':1.8, 'A2':2.5, 'A1':3.5, 'Custom':2 };
  const matM  = { 'Standard':1, 'Premium':1.3, 'Luxury':1.6 };
  const finM  = { 'None':1, 'Gloss Lamination':1.15, 'Matte Lamination':1.15, 'Spot UV':1.35 };
  const trnM  = { 'Standard (5-7 days)':1, 'Express (3 days)':1.25, 'Rush (24hrs)':1.5 };
  if (size && sizeM[size]) unit *= sizeM[size];
  if (material && matM[material]) unit *= matM[material];
  if (finishing && finM[finishing]) unit *= finM[finishing];
  if (turnaround && trnM[turnaround]) unit *= trnM[turnaround];
  const qtyDisc = qty >= 500 ? 0.8 : qty >= 250 ? 0.88 : qty >= 100 ? 0.93 : qty >= 50 ? 0.97 : 1;
  unit = Math.round(unit * qtyDisc);
  const total = unit * qty;
  const discount = qty >= 50 ? Math.round((basePrice * qty) - total) : 0;
  return { unit, total, discount };
}

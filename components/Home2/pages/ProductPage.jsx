'use client';
import { useState } from 'react';
import { Heart, ShoppingCart, MessageCircle, Share2, Check } from 'lucide-react';
import { useStore } from '../../../lib/store';
import { PRODUCTS, CATEGORIES, CONFIG, formatNaira, calcProductPrice } from '../../../lib/data';
import ProductCard from '../ui/ProductCard';
import Badge from '../ui/Badge';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { useProductStore } from '@/store/productStore';
import Image from 'next/image';

const badgeVariant = b => ({ Bestseller:'brand', Premium:'dark', Luxury:'luxury', Sale:'sale', Popular:'accent', New:'green' }[b] || 'brand');

  const Chip = ({ options, field, config, setConfig }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} onClick={() => {
          const setC = (k, v) => setConfig(prev => ({ ...prev, [k]: v }));
          setC(field, opt)
        }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${config[field] === opt ? 'bg-brand text-white border-brand' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand'}`}>
          {opt}
        </button>
      ))}
    </div>
  );

export default function ProductPage() {
  const { route, navigate, addToCart, toggleWishlist, wishlist, showToast, openModal } = useStore();
  const {products} = useProductStore();
  var product = PRODUCTS.find(p => p.id === route.params?.id);

  if (!product) product = products.find(p => p.id === route.params?.id);

  const [config, setConfig] = useState({ size: 'A4', material: 'Standard', finishing: 'None', turnaround: 'Standard (5-7 days)' });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="max-w-[1380px] mx-auto px-6 py-20 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="font-display font-black text-2xl mb-4">Product not found</h2>
      <Button onClick={() => navigate('shop')}>Browse Products</Button>
    </div>
  );

  const spec = product.specs ? product.specs : null;

  console.log("Spec", spec);
  

  const cat = CATEGORIES.find(c => c.id === product.cat);
  const related = products.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const { unit, total, discount } = calcProductPrice(product.basePrice, config.size, config.material, config.finishing, config.turnaround, qty, product.price);
  const isWished = wishlist.includes(product.id);
  const discount2 = product.origPrice ? Math.round((1 - product.basePrice / product.origPrice) * 100) : null;

  // const setC = (k, v) => setConfig(prev => ({ ...prev, [k]: v }));

  const handleAddToCart = () => {
    addToCart(product, config, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="max-w-[1380px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <button onClick={() => navigate('home')} className="hover:text-brand transition-colors">Home</button>
            <span>›</span>
            <button onClick={() => navigate('shop', { cat: product.cat })} className="hover:text-brand transition-colors">{cat?.label}</button>
            <span>›</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left: Image & trust */}
          <div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl h-72 flex items-center justify-center text-[120px] mb-4 relative">
              {product.icon ? product.icon: <Image src={product?.image_url} alt={product?.name} width={200} height={200} className="w-full h-full object-contain" />}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:scale-110 transition-transform"
              >
                <Heart size={16} fill={isWished ? '#D42B2B' : 'none'} stroke={isWished ? '#D42B2B' : 'currentColor'} />
              </button>
            </div>
            {/* Thumbs */}
            {product.icon ? <div className="flex gap-2 mb-6">
              {[product.icon, product.icon, product.icon].map((ic, i) => (
                <div key={i} className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl cursor-pointer border-2 transition-all ${i === 0 ? 'border-brand bg-red-50 dark:bg-red-950' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-brand'}`}>
                  {ic}
                </div>
              ))}
            </div>:
            <div className="flex gap-2 mb-6">
              {[product.image_url, product.image_url, product.image_url].map((ic, i) => (
                <Image src={ic} alt={product.name}  key={i} className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl cursor-pointer border-2 transition-all object-contain`} width={64} height={64}/>
              ))}
            </div>}

            {/* Trust badges */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
              {[
                ['✅', 'Free Design Review', 'Expert preflight check on every file'],
                ['📦', 'Abuja Same-Day Delivery', 'For orders before 2PM'],
                ['⚡', 'Rush 24hr', 'Express production available'],
                ['🔄', 'Free Reprint', "If it doesn't match your proof"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <div className="font-display font-bold text-xs">{title}</div>
                    <div className="text-xs text-gray-400">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info + Configurator */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badge && <Badge variant={badgeVariant(product.badge)}>{product.badge}</Badge>}
              {discount2 && <Badge variant="sale">Save {discount2}%</Badge>}
              <Badge variant="green">In Stock</Badge>
            </div>

            <h1 className="font-display font-black text-3xl leading-tight mb-3">{product.name}</h1>
            <StarRating rating={product.rating} reviews={product.reviews} size="md" />

            <div className="flex items-baseline gap-3 my-4">
              <span className="font-display font-black text-3xl text-brand">{product.basePrice ?formatNaira(product.basePrice): formatNaira(product.price)}</span>
              {product.origPrice ? (
                <span className="text-gray-400 line-through text-lg">{formatNaira(product.origPrice)}</span>
              ):
                <span className="text-gray-400 line-through text-lg">{formatNaira(product.price + (product.price * 0.25))}</span>
              }
              <span className="text-gray-400 text-sm">from (per unit/piece)</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{product.desc}</p>

            {/* Configurator */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 space-y-4 mb-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-gray-500">Configure Your Order</h3>
              {
                spec && Object.entries(spec).map(([key, options]) => (
                  <div key={key}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      {key}
                    </label>
                    <Chip options={options} field={key} config={config} setConfig={setConfig} />
                  </div>
                ))
              }
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-lg font-bold hover:text-brand transition-colors">−</button>
                    <span className="px-4 font-bold text-sm">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-lg font-bold hover:text-brand transition-colors">+</button>
                  </div>
                  {qty >= 50 && (
                    <span className="text-xs text-green-600 font-bold bg-green-50 dark:bg-green-950 px-2 py-1 rounded-lg">
                      {qty >= 500 ? '20%' : qty >= 250 ? '12%' : qty >= 100 ? '7%' : '3%'} bulk discount!
                    </span>
                  )}
                </div>
              </div>

              {/* Price breakdown */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Unit price:</span>
                  <span className="font-bold">{formatNaira(unit)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-600">Bulk discount:</span>
                    <span className="font-bold text-green-600">-{formatNaira(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg">
                  <span className="font-display font-black">Total ({qty} pcs):</span>
                  <span className="font-display font-black text-brand">{formatNaira(total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-4">
              <Button className="flex-1" onClick={handleAddToCart}>
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </Button>
              <Button variant="wa" href={CONFIG.wa(`Hi! I want to order: ${product.name} (${qty} pcs)`)} target="_blank">
                <MessageCircle size={16} />
              </Button>
              <button
                onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Link copied!', 'success'); }}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>

            <button
              onClick={() => { addToCart(product, config, qty); navigate('checkout'); }}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-display font-black rounded-xl hover:opacity-90 transition-opacity"
            >
              Buy Now →
            </button>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display font-black text-2xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

'use client';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useStore } from '../../../lib/store';
import { formatNaira } from '../../../lib/data';
import Badge from './Badge';
import StarRating from './StarRating';
import Image from 'next/image';

const badgeVariant = (badge) => {
  const map = { Bestseller: 'brand', Premium: 'dark', Luxury: 'luxury', Sale: 'sale', Popular: 'accent', New: 'green' };
  return map[badge] || 'brand';
};

export default function ProductCard({ product }) {
  const { navigate, openModal, toggleWishlist, wishlist, addToCartFront, showToast } = useStore();
  const isWished = wishlist.includes(product.id);
  const discount = product.origPrice
    ? Math.round((1 - product.basePrice / product.origPrice) * 100)
    : null;

  return (
    <div className="product-card group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      {/* Image area */}
      <div
        className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-6xl cursor-pointer"
        onClick={() => navigate('product', { id: product?.id })}
      >
        {product?.icon ? product.icon : 
          <Image src={product?.image_url} alt={product?.name} width={200} height={200} className="w-full h-full object-contain" />
        }
        {/* Hover actions */}
        <div className="product-card-actions absolute inset-0 flex items-center justify-center gap-2 bg-black/10">
          <button
            className="p-2.5 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:bg-brand hover:text-white transition-colors"
            onClick={e => { e.stopPropagation(); navigate('product', { id: product.id }); }}
            title="Quick View"
          >
            <Eye size={16} />
          </button>
          <button
            className="p-2.5 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:bg-brand hover:text-white transition-colors hidden"
            onClick={e => { 
              e.stopPropagation(); 
              const defautSpecs = Object.fromEntries(
                Object.entries(product.specs).map(([key, values]) => [key, values[0]])
              );
              let totalPrice = product.order * product.price 
              addToCartFront(product, defautSpecs, product.order, totalPrice);
             }}
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && <Badge variant={badgeVariant(product.badge)}>{product.badge}</Badge>}
          {discount && <Badge variant="sale">-{discount}%</Badge>}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-900 rounded-xl shadow hover:scale-110 transition-transform"
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
        >
          <Heart size={14} fill={isWished ? '#D42B2B' : 'none'} stroke={isWished ? '#D42B2B' : 'currentColor'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.cat}</p>
        <h3
          className="font-display font-bold text-sm leading-tight cursor-pointer hover:text-brand transition-colors line-clamp-2 mb-2"
          onClick={() => navigate('product', { id: product.id })}
        >
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-display font-black text-brand text-lg">{product.basePrice ? formatNaira(product.basePrice): formatNaira(product.price)}</span>
          {product.origPrice ? (
            <span className="text-xs text-gray-400 line-through">{formatNaira(product.origPrice)}</span>
          ) : 
            <span className="text-xs text-gray-400 line-through">{formatNaira(product.price + (product.price * 0.25))}</span>
          }
        </div>
        <button
          className="mt-3 w-full py-2 bg-brand text-white text-xs font-display font-bold rounded-lg hover:bg-brand-dark transition-colors"
          onClick={() => navigate('product', { id: product.id })}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

'use client';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../../lib/store';
import { formatNaira } from '../../lib/data';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, removeFromCart, updateCartQty, getCartTotal, navigate, closeModal, modal } = useStore();
  if (!modal || modal.type !== 'cart') return null;

  const total = getCartTotal();
  
  const cleanLabel = (value) => {
    return value.replace(/([+-]\d+)%/, '').trim();
  };

  return (
    <div className="fixed inset-0 z-[400] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
      <div className="relative cart-drawer bg-white dark:bg-gray-950 shadow-2xl animate-slide-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-brand" />
            <span className="font-display font-black text-base">Your Cart</span>
            <span className="ml-1 px-2 py-0.5 bg-brand text-white text-xs rounded-full font-bold">{cart.length}</span>
          </div>
          <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
              <div className="text-6xl">🛒</div>
              <div className="text-center">
                <p className="font-display font-black text-lg">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some products to get started</p>
              </div>
              <Button onClick={() => { navigate('shop'); closeModal(); }}>Browse Products</Button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map(item => (
                <div key={item.cartId} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <Image className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl shrink-0" src={item.image} alt={item.name} width={56} height={56} />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm leading-tight line-clamp-2">{item.name}</p>
                    {item.config?.size && <p className="text-xs text-gray-400 mt-0.5">{item.config.size} · {item.config.material}</p>}
                    {Object.entries(item.config).map(([key, option]) => (
                      <p key={key} className="text-xs text-gray-400 mt-0.5">{key} · {cleanLabel(option)}</p>
                    ))}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => updateCartQty(item.cartId, item.qty - 1)}
                          className="hidden p-1.5 hover:text-brand transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.cartId, item.qty + 1)}
                          className="hidden p-1.5 hover:text-brand transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-display font-black text-brand text-sm">{formatNaira(item.total)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-start"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-display font-black text-xl text-brand">{formatNaira(total)}</span>
            </div>
            <p className="text-xs text-gray-400">Delivery fee calculated at checkout</p>
            <Button
              className="w-full"
              onClick={() => { navigate('checkout'); closeModal(); }}
            >
              Checkout <ArrowRight size={14} />
            </Button>
            <button
              onClick={() => { navigate('shop'); closeModal(); }}
              className="w-full text-center text-sm text-gray-400 hover:text-brand transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

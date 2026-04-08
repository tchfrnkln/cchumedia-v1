'use client';

import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

import { useProductStore } from '@/store/productStore';
import { useProductDetailStore } from '@/store/productDetailStore';

import CartDrawer, { Cart } from './CartDrawer';
import { useDesignPopoverStore } from '@/store/popOver';
import DesignPopover from './PopOver';
import { useEffect } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { products, isLoading: productsLoading } = useProductStore();

  const {
    setQuantity,
    getQuantity,
    setDefaultSpecs,
    setSpec,
    getSpec,
    getUnitPrice,
    getTotalPrice,
  } = useProductDetailStore();

  const { openPopover } = useDesignPopoverStore();

  const product = products.find((p) => p.id === productId);

  const minQty = product?.order ?? 1;
  const quantity = getQuantity(productId, minQty);

  /**
   * Extract percentage (used in store too — could be moved inside store if preferred)
   */
  // const extractPercentage = (value: string) => {
  //   const match = value.match(/([+-]\d+)%/);
  //   return match ? Number(match[1]) : 0;
  // };

  const cleanLabel = (value: string) => {
    return value.replace(/([+-]\d+)%/, '').trim();
  };

  // Set default specs once product is available
  // Still using useEffect only for initialization
  useEffect(() => {
    if (product && product.specs) {
      const defaults: Record<string, string> = {};
      Object.entries(product.specs).forEach(([key, options]) => {
        defaults[key] = options[0];
      });
      setDefaultSpecs(product.id, defaults);
    }
  }, [product, setDefaultSpecs]);

  if (!productsLoading && !product) {
    toast.error('Product not found');
    router.replace('/dashboard');
    return null;
  }

  if (productsLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleQuantityChange = (newQty: number) => {
    if (newQty >= minQty) {
      setQuantity(productId, newQty);
    }
  };

  // ────────────────────────────────────────────────
  // Prices are now computed fresh on every render
  // No useEffect → instant reaction to spec/quantity changes
  // ────────────────────────────────────────────────
  const unitPrice = getUnitPrice(productId, product);
  const totalPrice = getTotalPrice(productId, product, minQty);

  return (
    <div className="w-full">
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center px-6">
        <button
          className="btn btn-ghost mb-6 text-xs md:text-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <Cart />
      </div>

      {/* Main Layout */}
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-evenly items-center px-6">
        {/* Image Section */}
        <div className="w-full flex md:flex-col justify-center items-center">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={350}
              height={350}
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 md:h-125 bg-base-300 flex items-center justify-center">
              No Image Available
            </div>
          )}

          <button
            className="hidden md:flex w-75 mt-4 btn bg-(--cchu-lilac) btn-lg flex-1 gap-2 text-xs p-4 text-white"
            onClick={openPopover}
            disabled={quantity < minQty}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between w-full mt-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>

            {/* PRICE */}
            <div className="badge badge-lg badge-(--cchu-light-lilac) bg-(--cchu-light-lilac) text-(--cchu-black) mb-4">
              ₦{Number(unitPrice.toFixed(2)).toLocaleString()} per unit
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <div className="prose prose-neutral max-w-none">
                <p>{product.description || 'No detailed description available.'}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Specifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.specs &&
                  Object.entries(product.specs).map(([specKey, options]) => {
                    const value = getSpec(productId, specKey, options[0]);

                    return (
                      <select
                        key={specKey}
                        className="select select-bordered w-auto"
                        value={value}
                        onChange={(e) => setSpec(productId, specKey, e.target.value)}
                      >
                        <option disabled>
                          {specKey.charAt(0).toUpperCase() + specKey.slice(1)}
                        </option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {cleanLabel(opt)}
                          </option>
                        ))}
                      </select>
                    );
                  })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8 w-full">
              <h3 className="text-xl font-semibold mb-3">Order Quantity</h3>

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="flex md:items-center gap-2">
                  <button
                    className="btn btn-outline btn-square"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= minQty}
                  >
                    <Minus size={18} />
                  </button>

                  <input
                    type="number"
                    className="input input-bordered w-24 text-center text-xl"
                    value={quantity}
                    disabled
                  />

                  <button
                    className="btn btn-outline btn-square"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="text-sm opacity-70">
                  Min. order: {minQty.toLocaleString()} units
                </div>
              </div>

              {/* TOTAL */}
              <div className="stats w-full">
                <div className="stat md:place-items-center">
                  <div className="stat-title">Total Amount</div>
                  <div className="stat-value text-(--cchu-lilac)">
                    ₦{Number(totalPrice.toFixed(2)).toLocaleString()}
                  </div>
                  <div className="stat-desc">
                    {quantity.toLocaleString()} units × ₦
                    {Number(unitPrice.toFixed(2)).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden w-[70%] bottom-4 left-4 flex-col sm:flex-row mb-12">
            <button
              className="btn btn-primary btn-lg flex-1 gap-2 text-xs p-4"
              onClick={openPopover}
              disabled={quantity < minQty}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <CartDrawer />
      <DesignPopover id={product.id} />
    </div>
  );
}
// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, ShoppingCart, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Product, useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { useUserRoleStore } from '@/store/authRole';
import Image from 'next/image';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { role, getUserRole } = useUserRoleStore();
  const { products, isLoading: productsLoading, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { items, addToCart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<{ name: string; description: string; price: number; image: File | null }>({
    name: '',
    description: '',
    price: 0,
    image: null,
  });

  useEffect(() => {
    if (user) {
      getUserRole();
      fetchProducts();
    }
  }, [user, getUserRole, fetchProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAdminOrStaff = role === 'admin' || role === 'staff';

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // optional chaining → undefined if null/empty
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

  const handleAdd = async () => {
    await addProduct(formData.name, formData.description, formData.price, formData.image);
    setShowAddModal(false);
    setFormData({ name: '', description: '', price: 0, image: null });
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: null,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editProduct) return;
    await updateProduct(editProduct.id, formData.name, formData.description, formData.price, formData.image);
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteProduct(id);
    }
  };

  if (!user) {
    return; 
    // <div className="min-h-screen flex items-center justify-center">
    //     Please login to access dashboard.
    
    // </div>;
  }

  return (
    <div className="w-full min-h-screen bg-base-200 p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="md:text-3xl font-bold">All Products</h1>
          <div className="flex items-center gap-4">
            <button className="btn btn-outline" onClick={() => setShowCartDrawer(true)}>
              <ShoppingCart size={20} /> Cart ({items.length})
            </button>
            {isAdminOrStaff && (
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                <Plus size={20} /> Add Product
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="form-control mb-6">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-2/5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="p-4 btn mx-4 hidden">
                <p>Search</p>
                <Search size={15} />
            </button>
          </div>
        </div>

        {/* Product List - Responsive Cards */}
        {productsLoading ? (
          <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card bg-base-100 shadow-xl">
                <figure>
                  {product.image_url ? (
                    // <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover" />
                    <Image src={product.image_url} alt={product.name} width={300} height={200} className="h-48 w-full object-cover"/>
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">No Image</div>
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description || 'No description'}</p>
                  <p className="font-bold hidden">₦{product.price.toFixed(2)}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product.id, product.name, product.price)}
                    >
                      Order Now
                    </button>
                    {isAdminOrStaff && (
                      <>
                        <button className="btn btn-outline" onClick={() => handleEdit(product)}>
                          <Edit size={16} />
                        </button>
                        <button className="btn btn-error btn-outline" onClick={() => handleDelete(product.id)}>
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        <input type="checkbox" id="add-modal" className="modal-toggle" checked={showAddModal} onChange={() => setShowAddModal(!showAddModal)} />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Product</h3>
            <form className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={handleFormChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleFormChange}
                required
              />
              <input type="file" className="file-input file-input-bordered w-full" onChange={handleImageChange} accept="image/*" />
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd} disabled={productsLoading}>
                {productsLoading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <input type="checkbox" id="edit-modal" className="modal-toggle" checked={showEditModal} onChange={() => setShowEditModal(!showEditModal)} />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Product</h3>
            <form className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={handleFormChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleFormChange}
                required
              />
              <input type="file" className="file-input file-input-bordered w-full" onChange={handleImageChange} accept="image/*" />
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpdate} disabled={productsLoading}>
                {productsLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
            {/* Cart Drawer – Fully controlled */}
        <div className="drawer drawer-end z-50">
            <input
                id="cart-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={showCartDrawer}
                onChange={(e) => setShowCartDrawer(e.target.checked)} 
            />
            <div className="drawer-content">
                {/* Your main page content is here – no change needed */}
            </div>

            <div className="drawer-side">
                <label
                htmlFor="cart-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
                onClick={() => setShowCartDrawer(false)} 
                ></label>

                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => setShowCartDrawer(false)}
                    >
                    ✕
                    </button>
                </div>

                {items.length === 0 ? (
                    <p className="text-center py-8">Cart is empty.</p>
                ) : (
                    items.map((item) => (
                    <li key={item.productId} className="mb-3 border-b pb-2">
                        <div className="flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-semibold">₦{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </li>
                    ))
                )}

                {items.length > 0 && (
                    <div className="mt-6">
                    <button
                        className="btn btn-outline w-full"
                        onClick={() => {
                        useCartStore.getState().clearCart();
                        // Optional: toast.success('Cart cleared');
                        }}
                    >
                        Clear Cart
                    </button>
                    </div>
                )}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}
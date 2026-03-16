'use client';

import { useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';
import { useUserRoleStore } from '@/store/authRole';
import { useDashboardStore } from '@/store/dashboardStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CartDrawer, { Cart } from './CartDrawer';
import AddProducts, { EditProducts } from './AlterProducts';

export default function Dashboard() {
  const router = useRouter();

  const { user } = useAuthStore();
  const { role } = useUserRoleStore();

  const {
    products,
    isLoading: productsLoading
  } = useProductStore();

  const {
    searchQuery,
    // showEditModal,
    // formData,
    setSearchQuery,
    openAddModal,
    openEditModal,
    // closeEditModal,
    // setFormData,
    // handleUpdateProduct,
    handleDeleteProduct,
    initialize
  } = useDashboardStore();

  useEffect(() => {
    if (user) initialize();
  }, [user, initialize]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAdminOrStaff = role === 'admin' || role === 'staff';

  if (!user) return null;

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="md:text-3xl font-bold">All Products</h1>

          <div className="flex items-center gap-4">
            <Cart/>

            {isAdminOrStaff && (
              <button
                className="btn btn-primary"
                onClick={openAddModal}
              >
                <Plus size={20} />
                Add Product
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

        {/* Products */}

        {productsLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card bg-base-100 shadow-xl cursor-pointer" 
                        onClick={() =>
                          router.push(`/products/${product.id}`)
                        }>
                <figure>
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>

                  <p className='line-clamp-3'>{product.description || 'No description'}</p>

                  <div className="card-actions justify-end">

                    {isAdminOrStaff ? (
                      <>
                        <button
                          className="btn btn-outline"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          className="btn btn-error btn-outline"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          router.push(`/products/${product.id}`)
                        }
                      >
                        Order Now
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Modal */}
        <AddProducts/>

        {/* Edit Modal */}

        <EditProducts/>

        {/* Cart Drawer */}
        <CartDrawer/>

      </div>
    </div>
  );
}
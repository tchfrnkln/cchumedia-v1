'use client';

import { useEffect } from 'react';
import { Plus, Edit, Trash2, Search, ListOrdered, UserRound, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';
import { useUserRoleStore } from '@/store/authRole';
import { useDashboardStore } from '@/store/dashboardStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CartDrawer, { Cart } from './Products/CartDrawer';
import AddProducts, { EditProducts } from './Products/AlterProducts';
import Link from 'next/link';

interface DashboardProps {
  initialSearch?: string;   // ← New optional prop
}

export default function Dashboard({ initialSearch = '' }: DashboardProps) {
  const router = useRouter();

  const { user } = useAuthStore();
  const { role } = useUserRoleStore();

  const {
    products,
    isLoading: productsLoading,
  } = useProductStore();

  const {
    searchQuery,
    currentPage,
    itemsPerPage,
    setSearchQuery,
    openAddModal,
    openEditModal,
    handleDeleteProduct,
    initialize,
    setCurrentPage,
  } = useDashboardStore();

  // Initialize data
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Set initial search query if provided (only on first render)
  useEffect(() => {
    if (initialSearch && initialSearch.trim() !== '') {
      setSearchQuery(initialSearch.trim());
    }
  }, [initialSearch, setSearchQuery]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToview = () => {
    setTimeout(() => {
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const isAdminOrStaff = role === 'admin' || role === 'staff';
  const isAdmin = role === 'admin';

  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div id="product-grid" className="flex justify-between items-center mb-6">
          <h1 className="md:text-3xl font-bold">{initialSearch != '' ? initialSearch : `All Products`}</h1>

          <div className="flex items-center gap-4">
            <Cart />

            {isAdminOrStaff && (
              <button
                className="btn btn-primary"
                onClick={openAddModal}
              >
                <Plus size={20} />
                Add Product
              </button>
            )}

            {isAdmin && (
              <Link href="/dashboard/admin" className="btn bg-(--cchu-gold) text-white">
                <ListOrdered size={20} />
                Orders
              </Link>
            )}
            {user && (
              <Link href="/dashboard/profile" className="btn bg-(--cchu-lilac) text-white">
                <UserRound size={20} />
                Profile
              </Link>
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
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="card bg-base-100 shadow-xl cursor-pointer"
                  onClick={() => {
                    if (!isAdminOrStaff) {
                      router.push(`/dashboard/products/${product.id}`);
                    }
                  }}
                >
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

                    <p className="line-clamp-3">{product.description || 'No description'}</p>

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
                          className="btn bg-[#9B96C8] text-white"
                          onClick={() => router.push(`/dashboard/products/${product.id}`)}
                        >
                          Order Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10 mb-6">
                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    scrollToview();
                  }}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    scrollToview();
                  }}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Modals & Drawer */}
        <AddProducts />
        <EditProducts />
        <CartDrawer />
      </div>
    </div>
  );
}
import { create } from 'zustand';
import { Product } from './productStore';
import { useProductStore } from './productStore';
import { useUserRoleStore } from './authRole';

type FormData = {
  name: string;
  description: string;
  price: number;
  order: number;
  image: File | null;
  specs: Record<string, string[]>; // dynamic specs: key → array of options/values
};

interface DashboardState {
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;

  showAddModal: boolean;
  showEditModal: boolean;
  showCartDrawer: boolean;

  editProduct: Product | null;

  formData: FormData;

  initialize: () => Promise<void>;

  setSearchQuery: (value: string) => void;
  setCurrentPage: (page: number) => void;

  openAddModal: () => void;
  closeAddModal: () => void;

  openEditModal: (product: Product) => void;
  closeEditModal: () => void;

  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  setFormData: (data: Partial<FormData>) => void;

  handleAddProduct: () => Promise<void>;
  handleUpdateProduct: () => Promise<void>;
  handleDeleteProduct: (id: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 12, // can be 6, 9, 12, 15, etc. — feel free to adjust

  showAddModal: false,
  showEditModal: false,
  showCartDrawer: false,

  editProduct: null,

  formData: {
    name: '',
    description: '',
    price: 0,
    order: 0,
    image: null,
    specs: {},
  },

  initialize: async () => {
    // Load user role first (needed for permissions)
    await useUserRoleStore.getState().getUserRole();
    // Then fetch products
    await useProductStore.getState().fetchProducts();
  },

  setSearchQuery: (value) => set({ searchQuery: value }),

  setCurrentPage: (page) => set({ currentPage: Math.max(1, page) }),

  openAddModal: () => set({ showAddModal: true }),

  closeAddModal: () =>
    set({
      showAddModal: false,
      formData: {
        name: '',
        description: '',
        price: 0,
        order: 0,
        image: null,
        specs: {},
      },
    }),

  openEditModal: (product) =>
    set({
      showEditModal: true,
      editProduct: product,
      formData: {
        name: product.name,
        description: product.description || '',
        price: product.price,
        order: product.order ?? 0,
        image: null, // new image upload — old one stays unless replaced
        specs: product.specs || {}, // load existing specs if any
      },
    }),

  closeEditModal: () =>
    set({
      showEditModal: false,
      editProduct: null,
      // Do **not** reset formData here — it might be useful for add modal
    }),

  openCartDrawer: () => set({ showCartDrawer: true }),
  closeCartDrawer: () => set({ showCartDrawer: false }),

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  handleAddProduct: async () => {
    const { formData } = get();

    await useProductStore.getState().addProduct(
      formData.name,
      formData.description,
      formData.price,
      formData.order,
      formData.image,
      formData.specs
    );

    set({
      showAddModal: false,
      formData: {
        name: '',
        description: '',
        price: 0,
        order: 0,
        image: null,
        specs: {},
      },
    });
  },

  handleUpdateProduct: async () => {
    const { editProduct, formData } = get();
    if (!editProduct) return;

    await useProductStore.getState().updateProduct(
      editProduct.id,
      formData.name,
      formData.description,
      formData.price,
      formData.order,
      formData.image, // null = keep existing, File = replace
      formData.specs
    );

    set({
      showEditModal: false,
      editProduct: null,
    });
  },

  handleDeleteProduct: async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    await useProductStore.getState().deleteProduct(id);
  },
}));
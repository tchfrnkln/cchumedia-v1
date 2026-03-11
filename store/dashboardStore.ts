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
  specs: Record<string, string[]>; // <-- added for dynamic specs
};

interface DashboardState {
  searchQuery: string;
  showAddModal: boolean;
  showEditModal: boolean;
  showCartDrawer: boolean;

  editProduct: Product | null;

  formData: FormData;

  initialize: () => Promise<void>;

  setSearchQuery: (value: string) => void;

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
    specs: {}, // <-- initialize specs
  },

  initialize: async () => {
    await useUserRoleStore.getState().getUserRole();
    await useProductStore.getState().fetchProducts();
  },

  setSearchQuery: (value) => set({ searchQuery: value }),

  openAddModal: () => set({ showAddModal: true }),
  closeAddModal: () =>
    set({
      showAddModal: false,
      formData: { name: '', description: '', price: 0, order: 0, image: null, specs: {} },
    }),

  openEditModal: (product) =>
    set({
      showEditModal: true,
      editProduct: product,
      formData: {
        name: product.name,
        description: product.description || '',
        price: product.price,
        order: product.order,
        image: null,
        specs: product.specs || {}, // <-- load existing specs
      },
    }),

  closeEditModal: () =>
    set({
      showEditModal: false,
      editProduct: null,
    }),

  openCartDrawer: () => set({ showCartDrawer: true }),
  closeCartDrawer: () => set({ showCartDrawer: false }),

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  handleAddProduct: async () => {
    const { formData } = get();

    await useProductStore
      .getState()
      .addProduct(
        formData.name,
        formData.description,
        formData.price,
        formData.order,
        formData.image,
        formData.specs // <-- pass specs to product store
      );

    set({
      showAddModal: false,
      formData: { name: '', description: '', price: 0, order: 0, image: null, specs: {} },
    });
  },

  handleUpdateProduct: async () => {
    const { editProduct, formData } = get();
    if (!editProduct) return;

    await useProductStore
      .getState()
      .updateProduct(
        editProduct.id,
        formData.name,
        formData.description,
        formData.price,
        formData.order,
        formData.image,
        formData.specs // <-- pass specs to update
      );

    set({
      showEditModal: false,
      editProduct: null,
    });
  },

  handleDeleteProduct: async (id) => {
    if (confirm('Are you sure?')) {
      await useProductStore.getState().deleteProduct(id);
    }
  },
}));
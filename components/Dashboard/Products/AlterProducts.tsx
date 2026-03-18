'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useProductStore } from '@/store/productStore';

const AddProducts = () => {
  const {
    showAddModal,
    closeAddModal,
    formData,
    setFormData,
    handleAddProduct,
  } = useDashboardStore();

  const { isLoading: productsLoading } = useProductStore();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      [name]:
        name === 'price' || name === 'order' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ image: file });
  };

  /** Update spec options */
  const handleSpecOptionsChange = (specKey: string, value: string) => {
    const options = value.split(',').map((opt) => opt.trim());
    setFormData({
      specs: {
        ...formData.specs,
        [specKey]: options,
      },
    });
  };

  /** Update spec name (key) */
  const handleSpecNameChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    const specs = { ...formData.specs };
    specs[newKey] = specs[oldKey]; // copy values
    delete specs[oldKey]; // remove old key
    setFormData({ specs });
  };

  /** Add a new spec */
  const addNewSpec = () => {
    const newKey = `spec${Object.keys(formData.specs || {}).length + 1}`;
    setFormData({
      specs: {
        ...formData.specs,
        [newKey]: ['Option1'],
      },
    });
  };

  /** Remove a spec */
  const removeSpec = (specKey: string) => {
    const specs = { ...formData.specs };
    delete specs[specKey];
    setFormData({ specs });
  };

  return (
    <div>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showAddModal}
        readOnly
      />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg">Add Product</h3>
          <form className="space-y-4 mt-4">

            {/* Basic Details */}
            <input
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleFormChange}
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
            />
            <input
              type="number"
              name="order"
              placeholder="Min Order"
              className="input input-bordered w-full"
              value={formData.order}
              onChange={handleFormChange}
            />
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
              accept="image/*"
            />

            {/* Specifications */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Specifications</h3>

              {Object.entries(formData.specs || {}).map(([key, options], index) => (
                <div key={index} className="mb-2 flex gap-2 items-center">
                  {/* Editable spec name */}
                  <input
                    type="text"
                    value={key}
                    className="input input-bordered w-1/3"
                    onChange={(e) =>
                      handleSpecNameChange(key, e.target.value)
                    }
                  />
                  {/* Editable options */}
                  <input
                    type="text"
                    value={options.join(', ')}
                    placeholder="Comma separated options"
                    className="input input-bordered w-2/3"
                    onChange={(e) =>
                      handleSpecOptionsChange(key, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-error"
                    onClick={() => removeSpec(key)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-outline mt-2"
                onClick={addNewSpec}
              >
                Add Spec
              </button>
            </div>
          </form>

          <div className="modal-action">
            <button className="btn" onClick={closeAddModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddProduct}
              disabled={productsLoading}
            >
              {productsLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;



export const EditProducts = () => {
  
  const {
    showEditModal,
    formData,
    closeEditModal,
    setFormData,
    handleUpdateProduct,
  } = useDashboardStore();

  const { isLoading: productsLoading } = useProductStore();

  // Basic form changes
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      [name]: name === 'price' || name === 'order' ? parseFloat(value) : value,
    });
  };

  // Image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData({ image: file });
  };

  // Specs handlers
  const handleSpecNameChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    const newSpecs: Record<string, string[]> = { ...formData.specs };
    newSpecs[newKey] = newSpecs[oldKey];
    delete newSpecs[oldKey];
    setFormData({ specs: newSpecs });
  };

  const handleSpecOptionsChange = (key: string, value: string) => {
    const options = value.split(',').map((opt) => opt.trim());
    setFormData({
      specs: {
        ...formData.specs,
        [key]: options,
      },
    });
  };

  const addNewSpec = () => {
    const newKey = `spec${Object.keys(formData.specs || {}).length + 1}`;
    setFormData({
      specs: {
        ...formData.specs,
        [newKey]: ['Option1'],
      },
    });
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData({ specs: newSpecs });
  };

  return (
    <div>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showEditModal}
        readOnly
      />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg">Update Product</h3>

          <form className="space-y-4 mt-4">

            {/* Basic Details */}
            <input
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleFormChange}
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
            />
            <input
              type="number"
              name="order"
              placeholder="Min Order"
              className="input input-bordered w-full"
              value={formData.order}
              onChange={handleFormChange}
            />
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
              accept="image/*"
            />

            {/* Specifications */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Specifications</h3>
              {Object.entries(formData.specs || {}).map(([key, options], index) => (
                <div key={index} className="mb-2 flex gap-2 items-center">
                  {/* Editable spec name */}
                  <input
                    type="text"
                    value={key}
                    className="input input-bordered w-1/3"
                    onChange={(e) => handleSpecNameChange(key, e.target.value)}
                  />

                  {/* Editable options */}
                  <input
                    type="text"
                    value={options.join(', ')}
                    placeholder="Comma separated options"
                    className="input input-bordered w-2/3"
                    onChange={(e) => handleSpecOptionsChange(key, e.target.value)}
                  />

                  {/* Remove spec button */}
                  <button
                    type="button"
                    className="btn btn-sm btn-error"
                    onClick={() => removeSpec(key)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-outline mt-2"
                onClick={addNewSpec}
              >
                Add Spec
              </button>
            </div>
          </form>

          <div className="modal-action">
            <button className="btn" onClick={closeEditModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdateProduct}
              disabled={productsLoading}
            >
              {productsLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
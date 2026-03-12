'use client';

import { useCartStore } from '@/store/cartStore';
import { useDesignPopoverStore } from '@/store/popOver';
import { useProductDetailStore } from '@/store/productDetailStore';
import { useProductStore } from '@/store/productStore';
import {
  Upload,
  Palette,
  X,
  ImageIcon,
  Building2,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  id: string;
}

export default function DesignPopover({ id }: Props) {
  const { products } = useProductStore();
  const {
    isOpen,
    closePopover,
    reset,

    designType,
    setDesignType,

    designFile,
    designFileUrl,
    setDesignFile,
    uploadDesignFile,

    businessName,
    description,
    setBusinessName,
    setDescription,

    logo,
    logoUrl,
    setLogo,
    noLogo,
    toggleNoLogo,
    uploadLogoFile
  } = useDesignPopoverStore();

  const { addToCart } = useCartStore();
  const { clearQuantity, getAllSpecs, clearSpecs, getQuantity } = useProductDetailStore();

  const product = products.find((p) => p.id === id);
  if (!product) return null;

  const minQty = product.order ?? 1;
  const quantity = getQuantity(id, minQty);

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    closePopover();
  };

  const handleBack = () => setDesignType(null);

  const handleContinue = async () => {
    // Validation
    if (designType === 'have-design' && !designFile) {
      toast.error('Please upload your design file');
      return;
    }
    if (designType === 'design-for-me' && !businessName) {
      toast.error('Please provide your business name');
      return;
    }

    // Upload files
    let uploadedDesignUrl = designFileUrl;
    let uploadedLogoUrl = logoUrl;

    if (designType === 'have-design' && designFile && !designFileUrl) {
      await uploadDesignFile(designFile);
      uploadedDesignUrl = useDesignPopoverStore.getState().designFileUrl;
    }

    if (designType === 'design-for-me' && logo && !logoUrl) {
      await uploadLogoFile(logo);
      uploadedLogoUrl = useDesignPopoverStore.getState().logoUrl;
    }

    const designDetails = {
      type: designType,
      designFile: uploadedDesignUrl,
      businessName,
      description,
      logo: uploadedLogoUrl,
      noLogo
    };

    const specs = getAllSpecs(id);

    addToCart(
      product.id,
      product.name,
      product.price,
      quantity,
      specs,
      designDetails
    );

    toast.success(`Added ${quantity} × ${product.name} to cart`);

    clearQuantity(id);
    clearSpecs(id);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popover Container */}
      <div className="relative card w-full max-w-xl bg-base-100 shadow-2xl border z-50">
        <div className="card-body space-y-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {designType && (
                <button className="btn btn-sm btn-circle btn-ghost" onClick={handleBack}>
                  <ArrowLeft size={16} />
                </button>
              )}
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Palette size={20} /> Design Details
              </h2>
            </div>
            <button className="btn btn-sm btn-circle" onClick={handleClose}>
              <X size={16} />
            </button>
          </div>

          {/* STEP 1 — DESIGN TYPE */}
          {!designType && (
            <div className="space-y-4">
              <p className="text-sm opacity-70">
                Choose how you want to provide your design
              </p>

              <button
                className="btn btn-outline w-full justify-start gap-3"
                onClick={() => setDesignType('have-design')}
              >
                <Upload size={18} /> I Have a Design
              </button>

              <button
                className="btn btn-primary w-full justify-start gap-3"
                onClick={() => setDesignType('design-for-me')}
              >
                <Palette size={18} /> Design For Me
              </button>
            </div>
          )}

          {/* STEP 2 — USER HAS DESIGN */}
          {designType === 'have-design' && (
            <div className="space-y-4">
              <label className="label">
                <span className="label-text">Upload Your Design File</span>
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept=".psd,.cdr,.ai,.pdf,.png,.jpg,.jpeg,.svg"
                onChange={(e) => setDesignFile(e.target.files?.[0] || null)}
              />

              {designFile && (
                <div className="alert alert-success text-sm">
                  File Selected: {designFile.name}
                </div>
              )}

              <button className="btn btn-primary w-full" onClick={handleContinue} disabled={!designFile}>
                Continue
              </button>
            </div>
          )}

          {/* STEP 3 — REQUEST DESIGN */}
          {designType === 'design-for-me' && (
            <div className="space-y-4">
              <div className="flex flex-col form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <Building2 size={16} /> Business Name
                  </span>
                </label>
                <input
                  className="input input-bordered"
                  placeholder="Enter business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <div className="flex flex-col form-control">
                <label className="label">
                  <span className="label-text">Describe Your Design</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Describe what you want designed"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {!noLogo && (
                <div className="flex flex-col form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <ImageIcon size={16} /> Upload Logo
                    </span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={(e) => setLogo(e.target.files?.[0] || null)}
                  />
                </div>
              )}

              <label className="label cursor-pointer gap-3 justify-start">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={noLogo}
                  onChange={toggleNoLogo}
                />
                <span className="label-text">I do not have a logo</span>
              </label>

              <button className="btn btn-primary w-full" 
              onClick={handleContinue}
              disabled={
                    !businessName.trim() ||
                    !description.trim() ||
                    (!noLogo && !logo)
                }
              >
                Continue
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
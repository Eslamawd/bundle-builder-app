import React from "react";
import { useBundle } from "../../context/BundleContext";
import { Stepper } from "../ui/Stepper";
import type { Product } from "../../types/bundle";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, setQuantity, setActiveVariant } = useBundle();

  const activeColor =
    state.activeVariants[product.id] || product.variants?.[0]?.id || "default";

  const currentQty = state.cart[product.id]?.[activeColor] || 0;

  const hasSelectedAny = Object.values(state.cart[product.id] || {}).some(
    (q) => q > 0,
  );

  return (
    <div
      onClick={() => {
        if (currentQty > 0) {
          setQuantity(product.id, activeColor, 0);
        } else {
          setQuantity(product.id, activeColor, 1);
        }
      }}
      className={`p-4 rounded-xl border-2 bg-white flex flex-col justify-between transition-all cursor-pointer relative select-none ${
        hasSelectedAny
          ? "border-indigo-600 shadow-md ring-1 ring-indigo-600"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      <div>
        <div className="flex flex-row xl:flex-col items-start xl:items-center gap-4 lg:gap-2 mb-2 w-full">
          <div className="flex flex-col items-start md:items-start xl:items-center gap-1.5 ">
            {product.badge ? (
              <span className="bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block text-center max-w-max">
                {product.badge}
              </span>
            ) : (
              // placeholder Badge to maintain consistent spacing when no badge is present
              <div className=" hidden lg:block" />
            )}

            <div className="w-22 h-22 xl:w-full xl:h-full rounded-lg overflow-hidden  border-neutral-100 flex items-center justify-center">
              {product.imageSrc ? (
                // we can use image selected by Variant
                <img
                  src={product.imageSrc}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-400">
                  No Img
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col text-left lg:text-center lg:w-full mt-1 lg:mt-2">
            <h4 className="font-bold text-neutral-900 text-sm line-clamp-2">
              {product.title}
            </h4>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2 lg:line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            <div className="lg:text-center">
              <a
                href={product.learnMoreUrl}
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-indigo-600 font-medium hover:underline inline-block mt-1.5"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="flex justify-start lg:justify-center gap-1.5 mt-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVariant(product.id, v.id);
                }}
                className={`w-5 h-5 rounded-full border transition-all ${
                  activeColor === v.id
                    ? "border-indigo-600 ring-2 ring-indigo-100 scale-110"
                    : "border-neutral-300 hover:scale-105"
                }`}
                style={{ backgroundColor: v.colorCode }}
                title={v.label}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5 pt-3 border-t border-neutral-100 w-full">
        <div className="flex flex-col text-left">
          {product.baseCompareAtPrice && (
            <span className="text-[11px] text-red-400 line-through leading-none mb-0.5">
              ${product.baseCompareAtPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm font-bold text-neutral-900 leading-none">
            ${product.baseActivePrice.toFixed(2)}
          </span>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <Stepper
            quantity={currentQty}
            onChange={(value) => setQuantity(product.id, activeColor, value)}
          />
        </div>
      </div>
    </div>
  );
};

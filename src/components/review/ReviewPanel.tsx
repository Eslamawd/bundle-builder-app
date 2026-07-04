import React from "react";
import { useBundle } from "../../context/BundleContext";
import type { Step } from "../../types/bundle";
import { Stepper } from "../ui/Stepper";

interface ReviewPanelProps {
  steps: Step[];
}

export const ReviewPanel: React.FC<ReviewPanelProps> = ({ steps }) => {
  const { state, setQuantity, saveSystem } = useBundle();

  const allProducts = steps.flatMap((s) => s.products);
  const selectedItems = [];
  let subtotalActive = 0;
  let subtotalCompare = 0;

  for (const [productId, variants] of Object.entries(state.cart)) {
    const product = allProducts.find((p) => p.id === productId);
    if (!product) continue;

    for (const [variantId, qty] of Object.entries(variants)) {
      if (qty > 0) {
        const variantInfo = product.variants?.find((v) => v.id === variantId);
        const nameWithVariant = variantInfo
          ? `${product.title} (${variantInfo.label})`
          : product.title;

        selectedItems.push({
          productId,
          variantId,
          imageSrc: product.imageSrc,
          name: nameWithVariant,
          qty,
          category: product.category,
          price: product.baseActivePrice * qty,
          comparePrice:
            (product.baseCompareAtPrice || product.baseActivePrice) * qty,
        });

        subtotalActive += product.baseActivePrice * qty;
        subtotalCompare +=
          (product.baseCompareAtPrice || product.baseActivePrice) * qty;
      }
    }
  }

  const totalSavings = subtotalCompare - subtotalActive;

  return (
    <div className="bg-blue-100 xl:border xl:border-neutral-200 xl:rounded-2xl p-6 xl:p-8 w-full mt-8  border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-7">
          <h3 className="text-xl font-bold text-neutral-900">
            Your security system
          </h3>
          <p className="text-xs text-neutral-400 mt-1 mb-6">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <div className="flex flex-col gap-3 overflow-y-auto pr-2">
            {selectedItems.length === 0 ? (
              <p className="text-sm text-neutral-400 italic py-6">
                Your bundle is currently empty.
              </p>
            ) : (
              selectedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-none text-sm"
                >
                  <div className="flex justify-start w-16 h-16">
                    <img
                      className=" object-contain"
                      src={item.imageSrc}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-neutral-800">
                      {item.name}
                    </span>
                    <span className="text-xs text-neutral-400 capitalize">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <Stepper
                      quantity={item.qty}
                      onChange={(value) =>
                        setQuantity(item.productId, item.variantId, value)
                      }
                    />

                    <div className="text-right min-w-[70px]">
                      {item.comparePrice > item.price && (
                        <span className="text-[11px] text-red-400 line-through block">
                          ${item.comparePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-bold text-neutral-900">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-4 w-full">
          <div className="bg-[#eff2ff] border border-[#dbe0ff] p-4 rounded-xl flex items-start gap-3">
            <div className="">
              <img
                src="images/satisfaction-badge.png"
                className="w-full h-full object-cover "
                alt=""
              />
            </div>
            <div>
              <h4 className="font-bold text-xs text-neutral-900">
                30-day hassle-free returns
              </h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                If you're not totally in love with the product, we will refund
                you 100%.
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex flex-col gap-3">
            <div className="flex justify-between text-xs text-neutral-600">
              <span>Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>

            {totalSavings > 0 && (
              <div className="text-[11px] text-green-600 font-semibold bg-green-50 px-2 py-1 rounded text-center">
                Congrats! You're saving ${totalSavings.toFixed(2)} on your
                security bundle!
              </div>
            )}

            <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200">
              <span className="font-bold text-neutral-900 text-sm">Total</span>
              <div className="text-right">
                {totalSavings > 0 && (
                  <span className="text-xs text-neutral-400 line-through block">
                    ${subtotalCompare.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl font-black text-indigo-600">
                  ${subtotalActive.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                alert("Redirecting to Shopify Plus checkout engine... 🚀")
              }
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 shadow-md transition text-center text-sm cursor-pointer"
            >
              Checkout
            </button>
            <button
              onClick={saveSystem}
              className="text-xs text-neutral-400 underline hover:text-indigo-600 transition cursor-pointer text-center py-1"
            >
              Save my system for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

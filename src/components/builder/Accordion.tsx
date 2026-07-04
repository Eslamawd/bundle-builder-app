import React from "react";
import { useBundle } from "../../context/BundleContext";
import type { Step } from "../../types/bundle";

import { ProductCard } from "../ui/ProductCard";

interface AccordionProps {
  steps: Step[];
}

export const Accordion: React.FC<AccordionProps> = ({ steps }) => {
  const { state, setActiveStep } = useBundle();

  const getSelectedCount = (step: Step) => {
    return step.products.filter((p) => {
      const variants = state.cart[p.id] || {};
      return Object.values(variants).some((qty) => qty > 0);
    }).length;
  };

  const lengthSteps = steps.length;
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step) => {
        const isOpen = state.activeStep === step.number;
        const selectedCount = getSelectedCount(step);

        return (
          <div
            key={step.id}
            className="border border-neutral-200 rounded-xl  overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setActiveStep(step.number)}
              className="w-full flex items-center justify-between p-5  hover:bg-neutral-50 transition cursor-pointer"
            >
              <div className="flex flex-col  items-start text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Step {step.number} of {lengthSteps}
                </span>
                <span className="text-lg font-bold text-neutral-900 mt-0.5">
                  {step.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedCount > 0 && (
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {selectedCount} selected
                  </span>
                )}
                <span className="text-neutral-400">
                  {isOpen ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </button>

            {isOpen && (
              <div className="p-5 border-t border-blue-100 bg-blue-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-4">
                  {step.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* زرار الـ Next Step */}
                {step.nextStepTitle && (
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex justify-center">
                    <button
                      onClick={() => setActiveStep(step.number + 1)}
                      className="text-indigo-600 border border-indigo-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition
                      hover:text-white flex items-center justify-center gap-2 
                      cursor-pointer"
                    >
                      Next: {step.nextStepTitle}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

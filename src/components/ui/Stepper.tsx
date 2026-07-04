import React from "react";

interface StepperProps {
  quantity: number;
  onChange: (newQty: number) => void;
  disabled?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  quantity,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
        disabled={quantity <= 0}
      >
        -
      </button>
      <span className="px-4 py-1 text-sm font-semibold min-w-[2rem] text-center text-gray-800">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors"
      >
        +
      </button>
    </div>
  );
};

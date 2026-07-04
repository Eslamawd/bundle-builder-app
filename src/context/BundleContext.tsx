import React, { createContext, useReducer, useContext, useEffect } from "react";
import type { AppState, CartState } from "../types/bundle";

type Action =
  | {
      type: "SET_QUANTITY";
      payload: { productId: string; variantId: string; quantity: number };
    }
  | {
      type: "SET_ACTIVE_VARIANT";
      payload: { productId: string; variantId: string };
    }
  | { type: "SET_ACTIVE_STEP"; payload: number }
  | { type: "HYDRATE_STORE"; payload: AppState };

const initialCartState: CartState = {
  "wyze-cam-v4": { white: 1 },
  "wyze-cam-pan-v3": { white: 2 },
  "wyze-sense-motion": { default: 2 },
  "wyze-sense-hub": { default: 1 },
  "wyze-microsd-256": { default: 2 },
  "cam-unlimited-plan": { default: 1 },
};

const initialState: AppState = {
  cart: initialCartState,
  activeStep: 1,
  activeVariants: {
    "wyze-cam-v4": "white",
    "wyze-cam-pan-v3": "white",
    "wyze-cam-floodlight": "white",
    "wyze-battery-cam": "white",
  },
};

function bundleReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_QUANTITY": {
      const { productId, variantId, quantity } = action.payload;
      const targetQty = Math.max(0, quantity);

      const updatedCart = { ...state.cart };
      const productVariants = { ...(updatedCart[productId] || {}) };

      if (targetQty === 0) {
        // إذا أصبحت الكمية 0، نحذف الـ Variant تماماً لتنظيف السلة
        delete productVariants[variantId];
      } else {
        productVariants[variantId] = targetQty;
      }

      // إذا أصبح المنتج لا يحتوي على أي Variant نشط، نحذف المنتج بالكامل من السلة
      if (Object.keys(productVariants).length === 0) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = productVariants;
      }

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "SET_ACTIVE_VARIANT": {
      const { productId, variantId } = action.payload;
      return {
        ...state,
        activeVariants: {
          ...state.activeVariants,
          [productId]: variantId,
        },
      };
    }

    case "SET_ACTIVE_STEP":
      return { ...state, activeStep: action.payload };

    case "HYDRATE_STORE":
      return action.payload;

    default:
      return state;
  }
}

const BundleContext = createContext<{
  state: AppState;
  setQuantity: (productId: string, variantId: string, quantity: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setActiveStep: (stepNumber: number) => void;
  saveSystem: () => void;
} | null>(null);

export const BundleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(bundleReducer, initialState);

  // استرجاع الداتا فوراً عند التحميل لمنع الـ Flash للبيانات القديمة
  useEffect(() => {
    const saved = localStorage.getItem("wyze_bundle_system_41909");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.cart) {
          dispatch({ type: "HYDRATE_STORE", payload: parsed });
        }
      } catch (e) {
        console.error("Error loading saved system", e);
      }
    }
  }, []);

  const setQuantity = (
    productId: string,
    variantId: string,
    quantity: number,
  ) => {
    dispatch({
      type: "SET_QUANTITY",
      payload: { productId, variantId, quantity },
    });
  };

  const setActiveVariant = (productId: string, variantId: string) => {
    dispatch({ type: "SET_ACTIVE_VARIANT", payload: { productId, variantId } });
  };

  const setActiveStep = (stepNumber: number) => {
    dispatch({ type: "SET_ACTIVE_STEP", payload: stepNumber });
  };

  const saveSystem = () => {
    localStorage.setItem("wyze_bundle_system_41909", JSON.stringify(state));
    alert("Your system configuration has been successfully saved! 🎉");
  };

  return (
    <BundleContext.Provider
      value={{
        state,
        setQuantity,
        setActiveVariant,
        setActiveStep,
        saveSystem,
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => {
  const context = useContext(BundleContext);
  if (!context)
    throw new Error("useBundle must be used within a BundleProvider");
  return context;
};

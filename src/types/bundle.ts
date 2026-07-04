// we can use image & color
export interface Variant {
  id: string;
  label: string;
  colorCode: string;
  imageSrc: string;
}

export interface Product {
  id: string;
  title: string;
  imageSrc: string;
  description: string;
  badge?: string;
  learnMoreUrl: string;
  baseCompareAtPrice?: number;
  baseActivePrice: number;
  category: "Cameras" | "Sensors" | "Accessories" | "Plan";
  variants?: Variant[];
}

export interface Step {
  id: string;
  number: number;
  title: string;
  nextStepTitle: string | null;
  products: Product[];
}

export interface CartState {
  [productId: string]: {
    [variantId: string]: number;
  };
}

export interface AppState {
  cart: CartState;
  activeStep: number;
  activeVariants: { [productId: string]: string };
}

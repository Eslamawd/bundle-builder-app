# 🛍️ Custom Bundle Builder App

A modern, responsive **Bundle Builder** application built with **React, TypeScript, Tailwind CSS, and Vite**.

The application guides users through a multi-step product configuration experience, allowing them to build personalized bundles, switch between product variants, manage quantities, and review their selections in real time.

Designed with a reusable, component-driven architecture and centralized state management, the project emphasizes scalability, maintainability, and clean code practices.

---

# ✨ Features

- **Multi-Step Bundle Builder**
  - Guided accordion workflow for seamless product selection.

- **Responsive UI**
  - Mobile-first design with adaptive layouts.
  - Product cards display horizontally on smaller screens (flex-row) and transition into a centered grid on desktop (lg:flex-col).

- **Variant Management**
  - Switch between product variants (such as colors).
  - Independent quantity tracking for each variant.

- **Global State Management**
  - Powered by the React Context API.
  - Centralized handling of active steps, selected products, variants, and quantities.

- **Reusable Product Components**
  - Shared `ProductCard` component used across multiple features (Accordion & ReviewPanel).
  - Eliminates duplicate UI logic and improves maintainability.

- **Interactive Quantity Controls**
  - Built-in stepper component.
  - Automatic product selection/deselection.
  - Safe event handling using `e.stopPropagation()` to prevent unexpected card selection.

- **Live Review Panel**
  - Displays selected products instantly.
  - Calculates totals and applied discounts in real time.
  - Validates bundle completion before submission.

- **Strict TypeScript Support**
  - Fully typed interfaces for products, variants, cart state, and application flow.

---

# 🧰 Tech Stack

- **Frontend:** React 18+, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **State Management:** React Context API + Reducers
- **Icons & Styling:** Tailwind CSS Primitives & Line-clamp utilities

---

## 🏗️ Architecture & Folder Structure

The application follows a modular, feature-based **Atomic Architecture** pattern. This separates global state logic, shared UI primitives, and layout-specific features to guarantee high reusability and clean code.

```text
src/
├── components/
│   ├── builder/          # Feature-specific components for the Bundle onboarding
│   │   └── Accordion.tsx   # Step wrapper and wizard controller
│   ├── review/           # Summary and checkout flow features
│   │   └── ReviewPanel.tsx # Reviews all selected steps and dispatches data
│   └── ui/               # Reusable presentation components (Atomic Primitives)
│       ├── Stepper.tsx     # Controlled quantity counter primitive
│       └── ProductCard.tsx # Context-aware, fully responsive shared product card
├── context/
│   └── BundleContext.tsx # Centralized State Management (Reducer + State Actions)
├── types/
│   └── bundle.ts         # TypeScript strict interfaces (Step, Product, Variant, Cart)
├── App.tsx               # Main application entry layout
└── main.tsx

```

---

# 📐 Architectural Highlights

## Context-Driven State Management

The application uses a centralized React Context with reducer-based state updates.
The shopping cart data is structured using a nested record pattern to guarantee $O(1)$ fast lookups:

```typescript
type CartState = Record<ProductId, Record<VariantId, Quantity>>;
```

This approach provides:

- Fast lookups and elimination of array loops (`.find()`)
- Immutable state updates via clean reducers
- Scalable state management for highly customizable components
- Clean separation of business logic

---

## Reusable UI Components

The shared `ProductCard` component is isolated from state initialization and reused seamlessly throughout the application:

- **Bundle Accordion Layout:** Fits perfectly inside the responsive dynamic grids.
- **Review Panel Checkout Flow:** Re-rendered efficiently to list selected elements.

This minimizes duplicated layout code while keeping visual representation and responsiveness perfectly consistent.

---

## Event Propagation Safety

Interactive child components (variant buttons, links, and quantity counters) prevent unwanted parent selection loops using:

```tsx
e.stopPropagation();
```

This guarantees predictable UI behavior when nested deep inside highly-clickable container wrappers.

---

## Responsive Design

The application relies entirely on Tailwind CSS responsive mobile-first utilities:

- `sm:` / `md:` (Mobile & Tablet horizontal flex layouts)
- `lg:` / `xl:` (Desktop grid layouts)

No expensive JavaScript screen resize event listeners are required, resulting in zero overhead and a highly-performant Lighthouse scoring.

---

# 🚀 Getting Started

## Prerequisites

Install the latest LTS version of **Node.js** before running the project.

---

## Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Eslamawd/bundle-builder-app.git
cd bundle-builder-app
```

2. **Install node dependencies:**

```bash
npm install

```

3. **Start the local development server:**

```bash
npm run dev

```

4. **Build production optimized bundles:**

```bash
npm run build

```

5. **Preview the local production build safely:**

```bash
npm run preview

```

---

# 📜 Available Scripts

| Command           | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server locally                       |
| `npm run build`   | Compiles and minifies production assets inside `/dist`           |
| `npm run preview` | Spins up a local Node server to preview production build bundles |

---

# 🛠️ Example Data Structure

The application consumes strongly typed data models passing down the component tree.

```typescript
const sampleSteps: Step[] = [
  {
    id: "step-1",
    number: 1,
    title: "Select your Main Device",
    nextStepTitle: "Pick an Accessory",
    products: [
      {
        id: "prod-101",
        title: "Premium Wireless Headphones",
        description: "High-fidelity audio with active noise cancellation.",
        imageSrc: "/images/headphones.jpg",
        badge: "Best Seller",
        baseActivePrice: 199.99,
        baseCompareAtPrice: 249.99,
        learnMoreUrl: "#",
        variants: [
          {
            id: "v-black",
            label: "Matte Black",
            colorCode: "#1a1a1a",
            imageSrc: "/images/headphones-black.jpg",
          },
          {
            id: "v-blue",
            label: "Navy Blue",
            colorCode: "#1e3a8a",
            imageSrc: "/images/headphones-blue.jpg",
          },
        ],
      },
    ],
  },
];
```

---

# 🚀 Future Improvements

Potential enhancements on the roadmap include:

- [ ] Persist active user selections inside `LocalStorage` to protect against hard-reloads.
- [ ] Add smooth micro-interactions and transitions using `Framer Motion`.
- [ ] Integrate robust component unit testing using `Vitest` and `React Testing Library`.
- [ ] Enhance semantic accessibility tags and full screen-reader orchestration (ARIA landmarks).
- [ ] Implement dark mode layout support.

---

# 📝 License

This project is licensed under the **MIT License**.

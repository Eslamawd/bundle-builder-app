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
  - Product cards display horizontally on smaller screens and transition into a centered grid on desktop.

- **Variant Management**
  - Switch between product variants (such as colors).
  - Independent quantity tracking for each variant.

- **Global State Management**
  - Powered by the React Context API.
  - Centralized handling of active steps, selected products, variants, and quantities.

- **Reusable Product Components**
  - Shared `ProductCard` component used across multiple features.
  - Eliminates duplicate UI logic and improves maintainability.

- **Interactive Quantity Controls**
  - Built-in stepper component.
  - Automatic product selection/deselection.
  - Safe event handling using `e.stopPropagation()`.

- **Live Review Panel**
  - Displays selected products instantly.
  - Calculates totals in real time.
  - Validates bundle completion before submission.

- **Strict TypeScript Support**
  - Fully typed interfaces for products, variants, cart state, and application flow.

---

# 🧰 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Context API
- React Hooks

---

## 🏗️ Architecture & Folder Structure

The application follows a modular, feature-based **Atomic Architecture** pattern. This separates global state logic, shared UI primitives, and layout-specific features to guarantee high reusability and clean code.

```text
src/
├── components/
│   ├── builder/                # Feature-specific components for the Bundle onboarding
│   │   └── Accordion.tsx       # Step wrapper and wizard controller
│   ├── review/                 # Summary and checkout flow features
│   │   └── ReviewPanel.tsx     # Reviews all selected steps and dispatches data
│   └── ui/                     # Reusable presentation components (Atomic Primitives)
│       ├── Stepper.tsx         # Controlled quantity counter primitive
│       └── ProductCard.tsx     # Context-aware, fully responsive shared product card
├── context/
│   └── BundleContext.tsx       # Centralized State Management (Reducer + State Actions)
├── types/
│   └── bundle.ts               # TypeScript strict interfaces (Step, Product, Variant, Cart)
├── App.tsx                     # Main application entry layout
└── main.tsx
```

---

# 📐 Architectural Highlights

## Context-Driven State Management

The application uses a centralized React Context with reducer-based state updates.

The shopping cart is represented using a nested record structure:

```typescript
type CartState = Record<ProductId, Record<VariantId, Quantity>>;
```

This approach provides:

- Fast lookups
- Immutable updates
- Scalable state management
- Clean separation of business logic

---

## Reusable UI Components

The shared `ProductCard` component is reused throughout the application, including:

- Bundle Accordion
- Review Panel

This minimizes duplicated code while keeping UI behavior consistent.

---

## Event Propagation Safety

Interactive child components (variant selectors and quantity steppers) prevent unwanted parent interactions using:

```tsx
e.stopPropagation();
```

This guarantees predictable UI behavior when nested inside clickable cards.

---

## Responsive Design

The application relies entirely on Tailwind CSS responsive utilities:

- `sm:`
- `md:`
- `lg:`
- `xl:`

No JavaScript screen listeners are required, resulting in a lightweight and performant implementation.

---

# 🚀 Getting Started

## Prerequisites

Install the latest version of **Node.js** before running the project.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Eslamawd/bundle-builder-app.git
cd bundle-builder-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# 📜 Available Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the development server         |
| `npm run build`   | Creates a production build            |
| `npm run preview` | Previews the production build locally |

---

# 🛠️ Example Data Structure

The application consumes strongly typed data models.

Example:

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

Potential enhancements include:

- Persist bundle selections using Local Storage
- Add animations with Framer Motion
- Unit testing with Vitest
- Accessibility improvements (ARIA)
- Dark mode support
- Backend API integration
- Authentication and user accounts

---

# 📝 License

This project is licensed under the **MIT License**.

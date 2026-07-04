import { BundleProvider } from "./context/BundleContext";
import productsData from "./data/products.json";
import type { Step } from "./types/bundle";
import { Accordion } from "./components/builder/Accordion";
import { ReviewPanel } from "./components/review/ReviewPanel";

function App() {
  const steps = productsData.steps as Step[];

  return (
    <BundleProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Let's get started!
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Build your custom security bundle exactly the way you want it.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 xl:col-span-5">
              <Accordion steps={steps} />
            </div>

            <div className="lg:col-span-2 xl:col-span-5">
              <ReviewPanel steps={steps} />
            </div>
          </div>
        </div>
      </div>
    </BundleProvider>
  );
}

export default App;

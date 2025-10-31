import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { StrictMode, Suspense } from "react";
import SmileyPreloader from "./dashboard/components/common/Preloader.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <Suspense fallback={<SmileyPreloader />}>
        <App />
      </Suspense>
    </StrictMode>
  </Provider>
);

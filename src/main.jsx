import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import ShopProvider from "./context/ShopProvider.jsx";
import LearningProvider from "./elearning/context/LearningProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ShopProvider>
        {/* Deux Providers imbriqués : chacun gère son propre domaine */}
        <LearningProvider>
          <App />
        </LearningProvider>
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>
);
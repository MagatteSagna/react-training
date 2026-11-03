import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import ShopProvider from "./context/ShopProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Tout ce qui est dans App peut maintenant utiliser useShop() */}
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>
);
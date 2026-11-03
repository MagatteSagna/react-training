import { useContext } from "react";
import ShopContext from "../context/shopContext";

// Hook personnalisé : évite d'importer useContext + ShopContext partout
function useShop() {
  const contexte = useContext(ShopContext);

  // Sécurité : si on oublie le Provider, on a un message clair
  if (contexte === null) {
    throw new Error("useShop doit être utilisé à l'intérieur d'un ShopProvider.");
  }
  return contexte;
}

export default useShop;
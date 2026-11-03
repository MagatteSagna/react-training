import { useState, useEffect } from "react";

// Comme useState, mais la valeur est sauvegardée dans le LocalStorage
function useLocalStorage(cle, valeurParDefaut) {
  const [valeur, setValeur] = useState(() => {
    const sauvegarde = localStorage.getItem(cle);
    return sauvegarde ? JSON.parse(sauvegarde) : valeurParDefaut;
  });

  // À chaque changement, on sauvegarde
  useEffect(() => {
    localStorage.setItem(cle, JSON.stringify(valeur));
  }, [cle, valeur]);

  return [valeur, setValeur];
}

export default useLocalStorage;
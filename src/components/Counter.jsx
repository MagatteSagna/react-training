import { useState } from "react";

function Counter() {
  // compteur commence à 0
  const [compteur, setCompteur] = useState(0);

  return (
    <div className="bloc">
      <h3>Compteur : {compteur}</h3>
      <button onClick={() => setCompteur(compteur + 1)}>+1</button>
      <button onClick={() => setCompteur(compteur + 10)}>+10</button>
      <button onClick={() => setCompteur(compteur - 1)}>-1</button>
      <button onClick={() => setCompteur(0)}>Réinitialiser</button>
    </div>
  );
}

export default Counter;
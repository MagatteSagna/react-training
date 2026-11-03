import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [essai, setEssai] = useState(0); // ← compteur de tentatives (pour Recharger)

  useEffect(() => {
    async function charger() {
      try {
        setLoading(true);
        setError(null);

        const reponse = await fetch(url);
        if (!reponse.ok) {
          throw new Error("Erreur serveur : " + reponse.status);
        }

        const donnees = await reponse.json();
        setData(donnees);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    charger();
  }, [url, essai]); // se relance si l'URL change OU si "essai" change

  // Recharger = augmenter "essai", ce qui relance l'effet
  function recharger() {
    setEssai(essai + 1);
  }

  return { data, loading, error, recharger };
}

export default useFetch;
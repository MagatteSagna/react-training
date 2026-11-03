import { useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";

// const API_URL = "https://fakestoreapi.com/products";
const API_URL = "/produits.json";

function ProductList() {
  const { data, loading, error, recharger } = useFetch(API_URL);

  // EXERCICE 3 : les states de recherche et de filtre
  // (les hooks doivent TOUJOURS être avant les "return" anticipés)
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("Toutes");

  // 1. CHARGEMENT
  if (loading) {
    return <p className="message">Chargement des produits...</p>;
  }

  // 2. ERREUR + EXERCICE 2 : bouton Recharger
  if (error) {
    return (
      <div className="message">
        <p className="erreur">Impossible de charger les produits : {error}</p>
        <button className="bouton-recharger" onClick={recharger}>
          Recharger
        </button>
      </div>
    );
  }

  // 3. VIDE
  if (data.length === 0) {
    return <p className="message">Aucun produit disponible.</p>;
  }

  // Liste des catégories : Set enlève les doublons
  const categories = ["Toutes", ...new Set(data.map((p) => p.category))];

  // Recherche + filtre combinés
  const produitsAffiches = data.filter((p) => {
    const correspondRecherche = p.title.toLowerCase().includes(recherche.toLowerCase());
    const correspondCategorie = categorie === "Toutes" || p.category === categorie;
    return correspondRecherche && correspondCategorie;
  });

  // 4. SUCCÈS
  return (
    <div>
      <div className="outils-produits">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <p>{produitsAffiches.length} produit(s) sur {data.length}</p>

      {produitsAffiches.length === 0 ? (
        <p className="message">Aucun produit ne correspond à ta recherche.</p>
      ) : (
        <div className="liste-produits">
          {produitsAffiches.map((p) => (
            <ProductCard key={p.id} produit={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
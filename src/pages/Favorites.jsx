import { Link } from "react-router";
import useShop from "../hooks/useShop";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const { favoris, viderFavoris } = useShop();

  // Rendu conditionnel : état vide
  if (favoris.length === 0) {
    return (
      <div>
        <h2>Mes favoris</h2>
        <p className="message">Tu n'as pas encore de favoris.</p>
        <Link to="/catalogue" className="bouton-lien">Voir le catalogue</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Mes favoris ({favoris.length})</h2>
      <button
        className="bouton-danger"
        onClick={() => {
          if (window.confirm("Retirer tous les favoris ?")) viderFavoris();
        }}
      >
        Tout retirer
      </button>

      <div className="liste-produits">
        {favoris.map((p) => (
          <ProductCard key={p.id} produit={p} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
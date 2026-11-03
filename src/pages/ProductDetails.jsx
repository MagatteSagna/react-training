import { useParams, useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import useShop from "../hooks/useShop";

const API_URL = "/produits.json"; // même URL que dans ProductList.jsx

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, recharger } = useFetch(API_URL);
  const { estFavori, basculerFavori, ajouterAuPanier } = useShop();

  if (loading) {
    return <p className="message">Chargement du produit...</p>;
  }

  if (error) {
    return (
      <div className="message">
        <p className="erreur">Impossible de charger le produit : {error}</p>
        <button className="bouton-recharger" onClick={recharger}>Recharger</button>
      </div>
    );
  }

  const produit = data.find((p) => p.id === Number(id));

  if (!produit) {
    return (
      <div className="message">
        <p>Produit introuvable.</p>
        <button className="bouton-recharger" onClick={() => navigate("/catalogue")}>
          Retour au catalogue
        </button>
      </div>
    );
  }

  const favori = estFavori(produit.id);

  return (
    <div className="detail-produit">
      <button className="bouton-recharger" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <img src={produit.image} alt={produit.title} />
      <h2>{produit.title}</h2>
      <p className="categorie">{produit.category}</p>

      {produit.description && <p>{produit.description}</p>}

      {produit.rating && (
        <p className="note">
          ★ {produit.rating.rate} ({produit.rating.count} avis)
        </p>
      )}

      <p className="prix">
        {produit.price.toLocaleString("fr-FR")} {produit.devise || "$"}
      </p>

      <div className="produit-actions">
        <button
          className={favori ? "btn-coeur actif" : "btn-coeur"}
          onClick={() => basculerFavori(produit)}
        >
          {favori ? "♥ Dans mes favoris" : "♡ Ajouter aux favoris"}
        </button>
        <button className="btn-panier" onClick={() => ajouterAuPanier(produit)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
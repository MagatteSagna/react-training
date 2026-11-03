import { Link } from "react-router";
import useShop from "../hooks/useShop";

function ProductCard({ produit }) {
  // On lit dans le contexte : plus aucune prop à faire descendre
  const { estFavori, basculerFavori, ajouterAuPanier } = useShop();
  const favori = estFavori(produit.id);

  return (
    <div className="produit">
      <Link to={"/catalogue/" + produit.id} className="produit-lien">
        <img src={produit.image} alt={produit.title} />
        <h3>{produit.title}</h3>
        <p className="categorie">{produit.category}</p>

        {produit.rating && (
          <p className="note">
            ★ {produit.rating.rate} ({produit.rating.count} avis)
          </p>
        )}

        <p className="prix">
          {produit.price.toLocaleString("fr-FR")} {produit.devise || "$"}
        </p>
      </Link>

      <div className="produit-actions">
        <button
          className={favori ? "btn-coeur actif" : "btn-coeur"}
          onClick={() => basculerFavori(produit)}
          aria-label={favori ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {favori ? "♥" : "♡"}
        </button>
        <button className="btn-panier" onClick={() => ajouterAuPanier(produit)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
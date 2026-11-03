import { Link } from "react-router";

function ProductCard({ produit }) {
  return (
    <Link to={"/catalogue/" + produit.id} className="produit-lien">
      <div className="produit">
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
      </div>
    </Link>
  );
}

export default ProductCard;
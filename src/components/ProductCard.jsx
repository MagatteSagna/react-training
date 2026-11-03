function ProductCard({ produit }) {
  return (
    <div className="produit">
      <img src={produit.image} alt={produit.title} />
      <h3>{produit.title}</h3>
      <p className="categorie">{produit.category}</p>

      {/* EXERCICE 1 : la note, affichée seulement si elle existe */}
      {produit.rating && (
        <p className="note">
          ★ {produit.rating.rate} ({produit.rating.count} avis)
        </p>
      )}

      {/* devise : celle du produit, ou "$" par défaut (FakeStore API) */}
      <p className="prix">
        {produit.price.toLocaleString("fr-FR")} {produit.devise || "$"}
      </p>
    </div>
  );
}

export default ProductCard;
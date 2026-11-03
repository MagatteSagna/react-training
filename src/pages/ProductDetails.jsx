import { useParams, useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";

// Même source que le catalogue (la même URL que dans ProductList.jsx)
const API_URL = "/produits.json";

function ProductDetails() {
  // useParams lit le ":id" de l'URL. C'est toujours du TEXTE ("3")
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, recharger } = useFetch(API_URL);

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

  // find() cherche le produit dont l'id correspond ; Number() convertit "3" en 3
  const produit = data.find((p) => p.id === Number(id));

  // Produit introuvable (ex : /catalogue/999)
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

  return (
    <div className="detail-produit">
      {/* navigate(-1) = revenir à la page précédente */}
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
    </div>
  );
}

export default ProductDetails;
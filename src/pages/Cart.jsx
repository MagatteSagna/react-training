import { Link } from "react-router";
import useShop from "../hooks/useShop";

function Cart() {
  const { panier, totalPanier, changerQuantite, retirerDuPanier, viderPanier } = useShop();

  // État vide
  if (panier.length === 0) {
    return (
      <div>
        <h2>Mon panier</h2>
        <p className="message">Ton panier est vide.</p>
        <Link to="/catalogue" className="bouton-lien">Voir le catalogue</Link>
      </div>
    );
  }

  // Devise du premier produit (on suppose une seule devise dans le panier)
  const devise = panier[0].produit.devise || "$";

  return (
    <div>
      <h2>Mon panier</h2>

      <div className="tableau-conteneur">
        <table className="tableau">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Sous-total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {panier.map((ligne) => (
              <tr key={ligne.produit.id}>
                <td>{ligne.produit.title}</td>
                <td>
                  {ligne.produit.price.toLocaleString("fr-FR")} {ligne.produit.devise || "$"}
                </td>
                <td>
                  <button onClick={() => changerQuantite(ligne.produit.id, -1)}>−</button>
                  <span className="quantite">{ligne.quantite}</span>
                  <button onClick={() => changerQuantite(ligne.produit.id, +1)}>+</button>
                </td>
                <td>
                  {(ligne.produit.price * ligne.quantite).toLocaleString("fr-FR")}{" "}
                  {ligne.produit.devise || "$"}
                </td>
                <td>
                  <button onClick={() => retirerDuPanier(ligne.produit.id)}>Retirer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="total">
        Total : {totalPanier.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} {devise}
      </p>

      <button
        className="bouton-danger"
        onClick={() => {
          if (window.confirm("Vider tout le panier ?")) viderPanier();
        }}
      >
        Vider le panier
      </button>
    </div>
  );
}

export default Cart;
import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <h2>Page introuvable (404)</h2>
      <p>Cette adresse n'existe pas.</p>
      <p className="accueil-lien">
        <Link to="/" className="bouton-lien">Retour à l'accueil</Link>
      </p>
    </div>
  );
}

export default NotFound;
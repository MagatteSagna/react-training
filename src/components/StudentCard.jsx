import Badge from "./Badge";
import { useState } from "react"; // on verra useState en détail au Jour 3

function StudentCard({ nom, prenom, email, formation, niveau, statut }) {
  // Pour l'instant, retiens juste : "afficher" vaut true ou false
  const [afficher, setAfficher] = useState(false);

  return (
    <div className="card">
      <h3>{prenom} {nom}</h3>

      {/* Si statut vaut "Actif", on affiche le Badge. Sinon, rien. */}
      {statut === "Actif" ? <Badge texte="Actif" /> : <Badge texte="Inactif" />}
      <p>{formation}</p>

      {/* Événement : au clic, on inverse la valeur (true devient false et inversement) */}
      <button onClick={() => setAfficher(!afficher)}>
        {afficher ? "Masquer les détails" : "Voir les détails"}
      </button>

      {/* Rendu conditionnel : ce bloc s'affiche seulement si afficher vaut true */}
      {afficher && (
        <div className="details">
          <p>E-mail : {email}</p>
          <p>Niveau : {niveau}</p>
          <p>Statut : {statut}</p>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
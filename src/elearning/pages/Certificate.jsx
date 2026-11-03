import { useState } from "react";
import { useParams, Link } from "react-router";
import courses from "../data/courses";
import useLearning from "../hooks/useLearning";

const SCORE_MINIMUM = 60;

function Certificate() {
  const { id } = useParams();
  const { profil, progression, meilleurScore } = useLearning();

  // La date est calculée une seule fois, à l'ouverture de la page
  const [dateDelivrance] = useState(() => new Date().toLocaleDateString("fr-FR"));

  const cours = courses.find((c) => c.id === Number(id));

  if (!cours) {
    return <p className="message">Formation introuvable.</p>;
  }

  const prog = progression(cours.id);
  const score = meilleurScore(cours.id);
  const okChapitres = prog === 100;
  const okQuiz = score !== null && score >= SCORE_MINIMUM;

  if (!okChapitres || !okQuiz) {
    return (
      <div className="message">
        <h3>Certificat non disponible</h3>
        <p>{okChapitres ? "✔" : "✘"} Tous les chapitres terminés ({prog}%)</p>
        <p>
          {okQuiz ? "✔" : "✘"} Quiz réussi à {SCORE_MINIMUM}% minimum
          {score === null ? " (pas encore passé)" : " (meilleur : " + score + "%)"}
        </p>
        <Link to={"/elearning/formations/" + cours.id + "/apprendre"} className="bouton-lien">
          Retour à la formation
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="certificat">
        <p className="certificat-petit">Certificat de réussite</p>
        <h2>{profil.prenom} {profil.nom}</h2>
        <p>a suivi avec succès la formation</p>
        <h3>{cours.titre}</h3>
        <p>Score au quiz : {score}%</p>
        <p className="certificat-petit">Délivré le {dateDelivrance}</p>
      </div>

      <button className="btn-panier" onClick={() => window.print()}>
        Imprimer / Enregistrer en PDF
      </button>
    </div>
  );
}

export default Certificate;
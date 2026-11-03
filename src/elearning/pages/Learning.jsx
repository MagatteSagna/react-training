import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import courses from "../data/courses";
import useLearning from "../hooks/useLearning";
import ProgressBar from "../components/ProgressBar";

function Learning() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estInscrit, estTermine, basculerModule, progression } = useLearning();

  // Index du chapitre affiché (0 = premier). Les hooks vont AVANT les return.
  const [index, setIndex] = useState(0);

  const cours = courses.find((c) => c.id === Number(id));

  if (!cours) {
    return (
      <div className="message">
        <p>Formation introuvable.</p>
        <button className="bouton-recharger" onClick={() => navigate("/elearning/formations")}>
          Retour aux formations
        </button>
      </div>
    );
  }

  // Accès réservé aux inscrits : on les renvoie vers la page de détail
  if (!estInscrit(cours.id)) {
    return (
      <div className="message">
        <p>Tu dois être inscrit pour suivre cette formation.</p>
        <Link to={"/elearning/formations/" + cours.id} className="bouton-lien">
          S'inscrire
        </Link>
      </div>
    );
  }

  const module = cours.modules[index];
  const fait = estTermine(cours.id, module.id);
  const estDernier = index === cours.modules.length - 1;
  const pourcentage = progression(cours.id);

  return (
    <div className="apprentissage">
      <h2>{cours.titre}</h2>
      <ProgressBar pourcentage={pourcentage} />

      <div className="apprentissage-corps">
        {/* Menu latéral : liste des chapitres */}
        <aside className="chapitres">
          {cours.modules.map((m, i) => (
            <button
              key={m.id}
              className={i === index ? "chapitre actif" : "chapitre"}
              onClick={() => setIndex(i)}
            >
              {estTermine(cours.id, m.id) ? "✔ " : ""}
              {i + 1}. {m.titre}
            </button>
          ))}
        </aside>

        {/* Contenu du chapitre */}
        <section className="contenu-chapitre">
          <p className="infos-cours">
            Chapitre {index + 1} sur {cours.modules.length}
          </p>
          <h3>{module.titre}</h3>
          <p>{module.contenu}</p>

          <button
            className={fait ? "bouton-danger" : "btn-panier"}
            onClick={() => basculerModule(cours.id, module.id)}
          >
            {fait ? "Marquer comme non terminé" : "Marquer comme terminé"}
          </button>

          <div className="navigation-chapitres">
            <button
              className="bouton-recharger"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              ← Précédent
            </button>

            {estDernier ? (
              <Link to={"/elearning/formations/" + cours.id + "/quiz"} className="bouton-lien">
                Passer au quiz
              </Link>
            ) : (
              <button className="bouton-recharger" onClick={() => setIndex(index + 1)}>
                Suivant →
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Learning;
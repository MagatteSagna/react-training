import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import courses from "../data/courses";
import useLearning from "../hooks/useLearning";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estInscrit, enregistrerScore, meilleurScore } = useLearning();

  // Les hooks vont AVANT les return
  const [reponses, setReponses] = useState({}); // { idQuestion: indexChoisi }
  const [termine, setTermine] = useState(false);

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

  if (!estInscrit(cours.id)) {
    return (
      <div className="message">
        <p>Tu dois être inscrit pour passer le quiz.</p>
        <Link to={"/elearning/formations/" + cours.id} className="bouton-lien">S'inscrire</Link>
      </div>
    );
  }

  // Valeurs calculées
  const total = cours.quiz.length;
  const nbBonnes = cours.quiz.filter((q) => reponses[q.id] === q.reponse).length;
  const pourcentage = Math.round((nbBonnes / total) * 100);
  const nbRepondues = Object.keys(reponses).length;
  const toutesRepondues = nbRepondues === total;

  function valider() {
    setTermine(true);
    enregistrerScore(cours.id, pourcentage);
  }

  function recommencer() {
    setReponses({});
    setTermine(false);
  }

  function messageScore() {
    if (pourcentage === 100) return "Parfait ! 🏆";
    if (pourcentage >= 80) return "Excellent ! 🎉";
    if (pourcentage >= 60) return "Bien joué, tu as réussi ✔";
    return "Peut mieux faire, relis les chapitres et réessaie 💪";
  }

  return (
    <div className="quiz">
      <h2>Quiz : {cours.titre}</h2>

      <p>{nbRepondues} / {total} questions répondues</p>

      {cours.quiz.map((q, i) => (
        <div key={q.id} className="question">
          <h3>{i + 1}. {q.question}</h3>

          {q.options.map((option, index) => {
            // Classe de correction, seulement après validation
            let classe = "option";
            if (termine) {
              if (index === q.reponse) classe += " juste";
              else if (index === reponses[q.id]) classe += " fausse";
            } else if (reponses[q.id] === index) {
              classe += " choisie";
            }

            return (
              <button
                key={index}
                className={classe}
                disabled={termine}
                onClick={() => setReponses({ ...reponses, [q.id]: index })}
              >
                {option}
              </button>
            );
          })}
        </div>
      ))}

      {!termine ? (
        <button className="btn-panier" disabled={!toutesRepondues} onClick={valider}>
          Valider mes réponses
        </button>
      ) : (
        <div className="resultat">
          <h3>Score : {nbBonnes} / {total} ({pourcentage}%)</h3>
          <p><strong>{messageScore()}</strong></p>
          <p>Meilleur score : {meilleurScore(cours.id)}%</p>
          <button className="bouton-recharger" onClick={recommencer}>Recommencer</button>
          <Link to={"/elearning/formations/" + cours.id + "/certificat"} className="bouton-lien">
            Voir mon certificat
          </Link>
        </div>
      )}
    </div>
  );
}

export default Quiz;
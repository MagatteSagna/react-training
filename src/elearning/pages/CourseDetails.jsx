import { useParams, useNavigate, Link } from "react-router";
import courses from "../data/courses";
import useLearning from "../hooks/useLearning";
import ProgressBar from "../components/ProgressBar";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estInscrit, sinscrire, seDesinscrire, progression } = useLearning();

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

  const inscrit = estInscrit(cours.id);

  return (
    <div className="detail-cours">
      <button className="bouton-recharger" onClick={() => navigate(-1)}>← Retour</button>

      <span className="badge">{cours.categorie}</span>
      <h2>{cours.titre}</h2>
      <p>{cours.description}</p>
      <p className="infos-cours">
        {cours.niveau} · {cours.duree} · {cours.modules.length} chapitres
      </p>

      <h3>Objectifs</h3>
      <ul className="liste-simple">
        {cours.objectifs.map((o, index) => <li key={index}>{o}</li>)}
      </ul>

      <h3>Programme</h3>
      <ol className="liste-simple">
        {cours.modules.map((m) => <li key={m.id}>{m.titre}</li>)}
      </ol>

      {inscrit ? (
        <div>
          <ProgressBar pourcentage={progression(cours.id)} />
          <p className="accueil-lien">
            <Link to={"/elearning/formations/" + cours.id + "/apprendre"} className="bouton-lien">
              Continuer la formation
            </Link>
          </p>
          <button
            className="bouton-danger"
            onClick={() => {
              if (window.confirm("Te désinscrire de cette formation ?")) seDesinscrire(cours.id);
            }}
          >
            Se désinscrire
          </button>
        </div>
      ) : (
        <button className="btn-panier" onClick={() => sinscrire(cours.id)}>
          S'inscrire à la formation
        </button>
      )}
    </div>
  );
}

export default CourseDetails;
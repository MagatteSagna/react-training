import { Link } from "react-router";
import useLearning from "../hooks/useLearning";
import ProgressBar from "./ProgressBar";

function CourseCard({ cours }) {
  const { estInscrit, progression } = useLearning();
  const inscrit = estInscrit(cours.id);

  return (
    <div className="cours-carte">
      <span className="badge">{cours.categorie}</span>
      <h3>{cours.titre}</h3>
      <p>{cours.description}</p>
      <p className="infos-cours">
        {cours.niveau} · {cours.duree} · {cours.modules.length} chapitres
      </p>

      {/* La barre n'apparaît que si l'étudiant est inscrit */}
      {inscrit && <ProgressBar pourcentage={progression(cours.id)} />}

      <Link to={"/elearning/formations/" + cours.id} className="bouton-lien">
        {inscrit ? "Continuer" : "Voir la formation"}
      </Link>
    </div>
  );
}

export default CourseCard;
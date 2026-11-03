import { Link } from "react-router";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";

function ELHome() {
  // slice(0, 2) = les 2 premières formations, mises en avant
  const misesEnAvant = courses.slice(0, 2);

  return (
    <div>
      <h2>Plateforme e-learning</h2>
      <p>Apprends à ton rythme, suis ta progression et obtiens ton certificat.</p>

      <p className="accueil-lien">
        <Link to="/elearning/formations" className="bouton-lien">Voir toutes les formations</Link>
      </p>

      <h2 className="titre-section">Formations à la une</h2>
      <div className="liste-cours">
        {misesEnAvant.map((c) => (
          <CourseCard key={c.id} cours={c} />
        ))}
      </div>
    </div>
  );
}

export default ELHome;
import { Link } from "react-router";
import Badge from "../components/Badge";
import StudentCard from "../components/StudentCard";
import studentsInitiaux from "../data/students";
import useLocalStorage from "../hooks/useLocalStorage";

function Home() {
  // Même clé "etudiants" que dans StudentManager : on lit la même liste
  const [etudiants] = useLocalStorage("etudiants", studentsInitiaux);

  return (
    <div>
      <h2>Bienvenue !</h2>
      <p>Ceci est ma première application React avec Vite.</p>

      <Badge texte="Nouveau" />
      <Badge texte="Populaire" />
      <Badge texte="Gratuit" />

      <p className="accueil-lien">
        <Link to="/catalogue" className="bouton-lien">Voir le catalogue</Link>
      </p>

      <h2 className="titre-section">Nos étudiants</h2>

      {etudiants.length === 0 ? (
        <p className="message">Aucun étudiant pour le moment.</p>
      ) : (
        <div className="liste-cartes">
          {etudiants.map((etudiant) => (
            <StudentCard
              key={etudiant.id}
              nom={etudiant.nom}
              prenom={etudiant.prenom}
              email={etudiant.email}
              formation={etudiant.formation}
              niveau={etudiant.niveau}
              statut={etudiant.statut}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
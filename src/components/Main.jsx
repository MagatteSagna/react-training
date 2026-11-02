import Badge from "./Badge";
import StudentCard from "./StudentCard";
import students from "../data/students"; // ../ = on remonte d'un dossier
import Counter from "./Counter";
import ContactForm from "./ContactForm";
import TaskManager from "./TaskManager";

function Main() {
  return (
    <main className="main">
      <h2>Bienvenue !</h2>
      <p>Ceci est ma première application React avec Vite.</p>

      <Badge texte="Nouveau" />
      <Badge texte="Populaire" />
      <Badge texte="Gratuit" />

      <h2 className="titre-section">Nos étudiants</h2>
      <div className="liste-cartes">
        {/* map() parcourt le tableau : une carte par étudiant */}
        {students.map((etudiant) => (
          <StudentCard
            key={etudiant.id}          // clé unique obligatoire
            nom={etudiant.nom}
            prenom={etudiant.prenom}
            email={etudiant.email}
            formation={etudiant.formation}
            niveau={etudiant.niveau}
            statut={etudiant.statut}
          />
        ))}
      </div>
      <h2 className="titre-section">Exercices du Jour 3</h2>
      <Counter />
      <ContactForm />
      <TaskManager />
    </main>
  );
}

export default Main;
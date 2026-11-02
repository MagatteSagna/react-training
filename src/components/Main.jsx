import Badge from "./Badge";
import StudentCard from "./StudentCard";
import Counter from "./Counter";
import ContactForm from "./ContactForm";
import TaskManager from "./TaskManager";
import StudentManager from "./StudentManager";
import students from "../data/students";

function Main() {
  return (
    <main className="main">
      <h2>Bienvenue !</h2>
      <p>Ceci est ma première application React avec Vite.</p>

      <Badge texte="Nouveau" />
      <Badge texte="Populaire" />
      <Badge texte="Gratuit" />

      {/* Jour 2 : cartes d'étudiants */}
      <h2 className="titre-section">Nos étudiants</h2>
      <div className="liste-cartes">
        {students.map((etudiant) => (
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

      {/* Mini-projet A */}
      <h2 className="titre-section">Mini-projet A : Gestionnaire de tâches</h2>
      <TaskManager />

      {/* Mini-projet B (son titre est dans le component) */}
      <StudentManager />

      {/* Exercices du Jour 3 */}
      <h2 className="titre-section">Exercices</h2>
      <Counter />
      <ContactForm />
    </main>
  );
}

export default Main;
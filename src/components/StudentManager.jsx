import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails"; // ← nouveau
import studentsInitiaux from "../data/students";

const CLE = "etudiants"; // nom de la clé dans le LocalStorage

function StudentManager() {
  // Initialisation paresseuse : on lit le LocalStorage, sinon données de départ
  const [etudiants, setEtudiants] = useState(() => {
    const sauvegarde = localStorage.getItem(CLE);
    return sauvegarde ? JSON.parse(sauvegarde) : studentsInitiaux;
  });

  const [recherche, setRecherche] = useState("");
  const [filtreFormation, setFiltreFormation] = useState("Toutes");
  const [tri, setTri] = useState("az");
  const [etudiantEnEdition, setEtudiantEnEdition] = useState(null);
  const [etudiantDetails, setEtudiantDetails] = useState(null); // ← nouveau : null = modal fermé

  // SAUVEGARDE : à chaque changement de "etudiants", on écrit dans le LocalStorage
  useEffect(() => {
    localStorage.setItem(CLE, JSON.stringify(etudiants));
  }, [etudiants]);

  // AJOUTER ou MODIFIER (renvoie un message d'erreur, ou null si tout va bien)
  function sauvegarder(donnees) {
    const emailExiste = etudiants.some(
      (e) =>
        e.email.toLowerCase() === donnees.email.toLowerCase() &&
        (!etudiantEnEdition || e.id !== etudiantEnEdition.id)
    );

    if (emailExiste) {
      return "Cet e-mail existe déjà.";
    }

    if (etudiantEnEdition) {
      setEtudiants(
        etudiants.map((e) => (e.id === etudiantEnEdition.id ? { ...e, ...donnees } : e))
      );
      setEtudiantEnEdition(null);
    } else {
      setEtudiants([...etudiants, { ...donnees, id: Date.now() }]);
    }
    return null;
  }

  // SUPPRIMER
  function supprimer(id) {
    setEtudiants(etudiants.filter((e) => e.id !== id));
  }

  // RECHERCHE + FILTRE : liste calculée, jamais stockée
  const etudiantsAffiches = etudiants.filter((e) => {
    const texte = (e.prenom + " " + e.nom).toLowerCase();
    const correspondRecherche = texte.includes(recherche.toLowerCase());
    const correspondFormation =
      filtreFormation === "Toutes" || e.formation === filtreFormation;
    return correspondRecherche && correspondFormation;
  });

  // TRI sur une copie du tableau
  const etudiantsTries = [...etudiantsAffiches].sort((a, b) => {
    const nomA = (a.nom + " " + a.prenom).toLowerCase();
    const nomB = (b.nom + " " + b.prenom).toLowerCase();
    return tri === "az" ? nomA.localeCompare(nomB) : nomB.localeCompare(nomA);
  });

  // COMPTEURS calculés sur la liste complète
  const nbActifs = etudiants.filter((e) => e.statut === "Actif").length;
  const nbInactifs = etudiants.filter((e) => e.statut === "Inactif").length;

  return (
    <section className="bloc-large-conteneur">
      <h2 className="titre-section">Mini-projet B : Gestion des étudiants</h2>

      {/* key force React à recréer le formulaire quand on change d'étudiant à modifier */}
      <StudentForm
        key={etudiantEnEdition ? etudiantEnEdition.id : "nouveau"}
        etudiantEnEdition={etudiantEnEdition}
        onSauvegarder={sauvegarder}
        onAnnuler={() => setEtudiantEnEdition(null)}
      />

      <div className="outils">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select value={filtreFormation} onChange={(e) => setFiltreFormation(e.target.value)}>
          <option>Toutes</option>
          <option>Informatique</option>
          <option>Gestion</option>
          <option>Marketing</option>
        </select>
        <select value={tri} onChange={(e) => setTri(e.target.value)}>
          <option value="az">Nom (A-Z)</option>
          <option value="za">Nom (Z-A)</option>
        </select>
      </div>

      <p>{etudiantsAffiches.length} étudiant(s) affiché(s) sur {etudiants.length}</p>
      <p>{nbActifs} actif(s) / {nbInactifs} inactif(s)</p>

      <StudentList
        etudiants={etudiantsTries}
        onModifier={setEtudiantEnEdition}
        onSupprimer={supprimer}
        onDetails={setEtudiantDetails}   // ← nouveau
      />

      {/* Le modal s'affiche seulement si un étudiant est sélectionné */}
      {etudiantDetails && (
        <StudentDetails
          etudiant={etudiantDetails}
          onFermer={() => setEtudiantDetails(null)}
        />
      )}
    </section>
  );
}

export default StudentManager;
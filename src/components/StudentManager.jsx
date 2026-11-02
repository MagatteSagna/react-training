import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import studentsInitiaux from "../data/students";

const CLE = "etudiants"; // le nom sous lequel on range les données dans le LocalStorage

function StudentManager() {
  // Initialisation "paresseuse" : on lit le LocalStorage ; s'il est vide, données de départ
  const [etudiants, setEtudiants] = useState(() => {
    const sauvegarde = localStorage.getItem(CLE);
    return sauvegarde ? JSON.parse(sauvegarde) : studentsInitiaux;
  });

  const [recherche, setRecherche] = useState("");
  const [filtreFormation, setFiltreFormation] = useState("Toutes");
  const [tri, setTri] = useState("az"); // ← EXERCICE 1 : "az" ou "za"
  const [etudiantEnEdition, setEtudiantEnEdition] = useState(null);

  // SAUVEGARDE : à chaque changement de "etudiants", on l'écrit dans le LocalStorage
  useEffect(() => {
    localStorage.setItem(CLE, JSON.stringify(etudiants));
  }, [etudiants]);

  // AJOUTER ou MODIFIER selon le mode  ← EXERCICE 3 : vérification de l'e-mail
  function sauvegarder(donnees) {
    // some() renvoie true si AU MOINS un étudiant correspond
    // On ignore l'étudiant qu'on est en train de modifier
    const emailExiste = etudiants.some(
      (e) =>
        e.email.toLowerCase() === donnees.email.toLowerCase() &&
        (!etudiantEnEdition || e.id !== etudiantEnEdition.id)
    );

    if (emailExiste) {
      return "Cet e-mail existe déjà."; // message d'erreur renvoyé au formulaire
    }

    if (etudiantEnEdition) {
      // MODIFIER : on remplace l'étudiant qui a le même id
      setEtudiants(
        etudiants.map((e) => (e.id === etudiantEnEdition.id ? { ...e, ...donnees } : e))
      );
      setEtudiantEnEdition(null);
    } else {
      // AJOUTER : nouvel id, ajout à la fin
      setEtudiants([...etudiants, { ...donnees, id: Date.now() }]);
    }
    return null; // null = tout s'est bien passé
  }

  // SUPPRIMER : on garde tous les étudiants sauf celui-là
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

  // EXERCICE 1 : TRI sur une COPIE du tableau (sort modifie le tableau d'origine)
  const etudiantsTries = [...etudiantsAffiches].sort((a, b) => {
    const nomA = (a.nom + " " + a.prenom).toLowerCase();
    const nomB = (b.nom + " " + b.prenom).toLowerCase();
    return tri === "az" ? nomA.localeCompare(nomB) : nomB.localeCompare(nomA);
  });

  // EXERCICE 2 : compteurs calculés sur la liste complète
  const nbActifs = etudiants.filter((e) => e.statut === "Actif").length;
  const nbInactifs = etudiants.filter((e) => e.statut === "Inactif").length;

  return (
    <section className="bloc-large-conteneur">
      <h2 className="titre-section">Gestion des étudiants</h2>

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

        {/* EXERCICE 1 : liste déroulante du tri */}
        <select value={tri} onChange={(e) => setTri(e.target.value)}>
          <option value="az">Nom (A-Z)</option>
          <option value="za">Nom (Z-A)</option>
        </select>
      </div>

      <p>{etudiantsAffiches.length} étudiant(s) affiché(s) sur {etudiants.length}</p>

      {/* EXERCICE 2 : compteur actifs / inactifs */}
      <p>{nbActifs} actif(s) / {nbInactifs} inactif(s)</p>

      {/* On envoie la liste TRIÉE, plus etudiantsAffiches */}
      <StudentList
        etudiants={etudiantsTries}
        onModifier={setEtudiantEnEdition}
        onSupprimer={supprimer}
      />
    </section>
  );
}

export default StudentManager;
import { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import StudentTrash from "./StudentTrash"; // ← nouveau
import studentsInitiaux from "../data/students";

const CLE = "etudiants";
const CLE_CORBEILLE = "corbeille"; // ← nouvelle clé LocalStorage

function StudentManager() {
  const [etudiants, setEtudiants] = useState(() => {
    const sauvegarde = localStorage.getItem(CLE);
    return sauvegarde ? JSON.parse(sauvegarde) : studentsInitiaux;
  });

  // La corbeille : même technique que pour les étudiants, avec [] par défaut
  const [corbeille, setCorbeille] = useState(() => {
    const sauvegarde = localStorage.getItem(CLE_CORBEILLE);
    return sauvegarde ? JSON.parse(sauvegarde) : [];
  });
  const [afficherCorbeille, setAfficherCorbeille] = useState(false);

  const [recherche, setRecherche] = useState("");
  const [filtreFormation, setFiltreFormation] = useState("Toutes");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [tri, setTri] = useState("az");
  const [etudiantEnEdition, setEtudiantEnEdition] = useState(null);
  const [etudiantDetails, setEtudiantDetails] = useState(null);

  // SAUVEGARDE des étudiants
  useEffect(() => {
    localStorage.setItem(CLE, JSON.stringify(etudiants));
  }, [etudiants]);

  // SAUVEGARDE de la corbeille
  useEffect(() => {
    localStorage.setItem(CLE_CORBEILLE, JSON.stringify(corbeille));
  }, [corbeille]);

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

  // SUPPRIMER = DÉPLACER vers la corbeille
  function supprimer(id) {
    const etudiant = etudiants.find((e) => e.id === id); // find() renvoie l'élément trouvé
    if (!etudiant) return;
    setEtudiants(etudiants.filter((e) => e.id !== id));   // on l'enlève de la liste
    setCorbeille([...corbeille, etudiant]);               // on l'ajoute à la corbeille
  }

  // TOUT SUPPRIMER = tout déplacer vers la corbeille
  function toutSupprimer() {
    if (window.confirm("Déplacer TOUS les étudiants vers la corbeille ?")) {
      setCorbeille([...corbeille, ...etudiants]);
      setEtudiants([]);
      setEtudiantEnEdition(null);
    }
  }

  // RESTAURER : chemin inverse (corbeille vers liste)
  function restaurer(id) {
    const etudiant = corbeille.find((e) => e.id === id);
    if (!etudiant) return;

    // Si un autre étudiant a pris son e-mail entre-temps, on refuse
    const emailPris = etudiants.some(
      (e) => e.email.toLowerCase() === etudiant.email.toLowerCase()
    );
    if (emailPris) {
      window.alert("Impossible de restaurer : un étudiant utilise déjà cet e-mail.");
      return;
    }

    setEtudiants([...etudiants, etudiant]);
    setCorbeille(corbeille.filter((e) => e.id !== id));
  }

  // SUPPRIMER DÉFINITIVEMENT un étudiant de la corbeille
  function supprimerDefinitivement(id) {
    if (window.confirm("Supprimer définitivement ? Il sera impossible de le récupérer.")) {
      setCorbeille(corbeille.filter((e) => e.id !== id));
    }
  }

  // VIDER la corbeille
  function viderCorbeille() {
    if (window.confirm("Vider la corbeille ? Cette action est définitive.")) {
      setCorbeille([]);
    }
  }

  // RECHERCHE + FILTRES
  const etudiantsAffiches = etudiants.filter((e) => {
    const texte = (e.prenom + " " + e.nom).toLowerCase();
    const correspondRecherche = texte.includes(recherche.toLowerCase());
    const correspondFormation =
      filtreFormation === "Toutes" || e.formation === filtreFormation;
    const correspondStatut = filtreStatut === "Tous" || e.statut === filtreStatut;
    return correspondRecherche && correspondFormation && correspondStatut;
  });

  // TRI sur une copie
  const etudiantsTries = [...etudiantsAffiches].sort((a, b) => {
    const nomA = (a.nom + " " + a.prenom).toLowerCase();
    const nomB = (b.nom + " " + b.prenom).toLowerCase();
    return tri === "az" ? nomA.localeCompare(nomB) : nomB.localeCompare(nomA);
  });

  const nbActifs = etudiants.filter((e) => e.statut === "Actif").length;
  const nbInactifs = etudiants.filter((e) => e.statut === "Inactif").length;

  return (
    <section className="bloc-large-conteneur">
      <h2 className="titre-section">Mini-projet B : Gestion des étudiants</h2>

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
        <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
          <option>Tous</option>
          <option>Actif</option>
          <option>Inactif</option>
        </select>
        <select value={tri} onChange={(e) => setTri(e.target.value)}>
          <option value="az">Nom (A-Z)</option>
          <option value="za">Nom (Z-A)</option>
        </select>
      </div>

      <p>{etudiantsAffiches.length} étudiant(s) affiché(s) sur {etudiants.length}</p>
      <p>{nbActifs} actif(s) / {nbInactifs} inactif(s)</p>

      <button
        className="bouton-danger"
        onClick={toutSupprimer}
        disabled={etudiants.length === 0}
      >
        Tout supprimer
      </button>

      <StudentList
        etudiants={etudiantsTries}
        onModifier={setEtudiantEnEdition}
        onSupprimer={supprimer}
        onDetails={setEtudiantDetails}
      />

      {/* ===== Corbeille ===== */}
      <div className="corbeille">
        <button
          className="bouton-corbeille"
          onClick={() => setAfficherCorbeille(!afficherCorbeille)}
        >
          {afficherCorbeille ? "Masquer" : "Afficher"} la corbeille ({corbeille.length})
        </button>

        {afficherCorbeille && (
          <StudentTrash
            etudiants={corbeille}
            onRestaurer={restaurer}
            onSupprimerDefinitivement={supprimerDefinitivement}
            onVider={viderCorbeille}
          />
        )}
      </div>

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
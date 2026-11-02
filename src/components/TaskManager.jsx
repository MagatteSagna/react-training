import { useState } from "react";

function TaskManager() {
  // La liste des tâches : un tableau d'objets
  const [taches, setTaches] = useState([
    { id: 1, texte: "Apprendre les props", terminee: true },
    { id: 2, texte: "Apprendre useState", terminee: false },
  ]);
  const [texte, setTexte] = useState("");          // champ de saisie
  const [filtre, setFiltre] = useState("toutes");  // toutes | restantes | terminees
  const [idEnEdition, setIdEnEdition] = useState(null); // tâche en cours de modification

  // AJOUTER (ou valider une modification)
  function ajouter(e) {
    e.preventDefault();
    if (texte.trim() === "") return;

    if (idEnEdition !== null) {
      // MODIFIER : on remplace le texte de la tâche concernée
      setTaches(
        taches.map((t) => (t.id === idEnEdition ? { ...t, texte: texte } : t))
      );
      setIdEnEdition(null);
    } else {
      // AJOUTER : on crée une nouvelle tâche
      const nouvelle = { id: Date.now(), texte: texte, terminee: false };
      setTaches([...taches, nouvelle]); // ... = copie les anciennes + ajoute la nouvelle
    }
    setTexte("");
  }

  // TERMINER : on inverse "terminee" pour la tâche cliquée
  function basculer(id) {
    setTaches(
      taches.map((t) => (t.id === id ? { ...t, terminee: !t.terminee } : t))
    );
  }

  // SUPPRIMER : on garde toutes les tâches sauf celle-là
  function supprimer(id) {
    setTaches(taches.filter((t) => t.id !== id));
  }

  // Garde seulement les tâches NON terminées
  function supprimerTerminees() {
    setTaches(taches.filter((t) => !t.terminee));
  }

  // Prépare la modification : met le texte dans le champ
  function commencerEdition(tache) {
    setTexte(tache.texte);
    setIdEnEdition(tache.id);
  }

  // FILTRER : liste affichée selon le filtre choisi
  const tachesAffichees = taches.filter((t) => {
    if (filtre === "restantes") return !t.terminee;
    if (filtre === "terminees") return t.terminee;
    return true;
  });

  const nbRestantes = taches.filter((t) => !t.terminee).length;

  return (
    <div className="bloc">
      <h3>Gestionnaire de tâches</h3>

      <form onSubmit={ajouter} className="ligne">
        <input
          type="text"
          placeholder="Nouvelle tâche..."
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
        />
        <button type="submit">{idEnEdition !== null ? "Modifier" : "Ajouter"}</button>
      </form>

      <div className="filtres">
        <button onClick={() => setFiltre("toutes")}>Toutes</button>
        <button onClick={() => setFiltre("restantes")}>Restantes</button>
        <button onClick={() => setFiltre("terminees")}>Terminées</button>
      </div>

      <p>{nbRestantes} tâche(s) restante(s)</p>
      {/* Ce bouton appelle la fonction supprimerTerminees au clic */}
      <button onClick={supprimerTerminees}>Supprimer les tâches terminées</button>
      
      {tachesAffichees.length === 0 && <p>Aucune tâche à afficher.</p>}

      <ul className="liste-taches">
        {tachesAffichees.map((t) => (
          <li key={t.id}>
            <span
              className={t.terminee ? "barree" : ""}
              onClick={() => basculer(t.id)}
            >
              {t.texte}
            </span>
            <span>
              <button onClick={() => commencerEdition(t)}>Modifier</button>
              <button onClick={() => supprimer(t.id)}>Supprimer</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
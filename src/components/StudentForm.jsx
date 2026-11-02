import { useState } from "react";

// Valeurs d'un formulaire vide
const formulaireVide = {
  nom: "",
  prenom: "",
  email: "",
  formation: "Informatique",
  niveau: "Licence 1",
  statut: "Actif",
};

// Props reçues :
// - etudiantEnEdition : l'étudiant à modifier (ou null si on ajoute)
// - onSauvegarder : fonction du parent appelée avec les données validées
// - onAnnuler : fonction du parent pour quitter le mode modification
function StudentForm({ etudiantEnEdition, onSauvegarder, onAnnuler }) {
  // Un seul state pour tout le formulaire (un objet)
  // Si on modifie, on part des données de l'étudiant, sinon d'un formulaire vide
  const [donnees, setDonnees] = useState(etudiantEnEdition || formulaireVide);
  const [erreur, setErreur] = useState("");

  // Met à jour UN champ : [e.target.name] = nom du champ (nom, prenom, email...)
  function changer(e) {
    setDonnees({ ...donnees, [e.target.name]: e.target.value });
  }

  function envoyer(e) {
  e.preventDefault();

  if (donnees.prenom.trim() === "" || donnees.nom.trim() === "") {
    setErreur("Le prénom et le nom sont obligatoires.");
    return;
  }
  if (!donnees.email.includes("@")) {
    setErreur("L'e-mail n'est pas valide.");
    return;
  }

  // Le parent renvoie un message d'erreur, ou null si tout va bien
  const erreurParent = onSauvegarder(donnees);
  if (erreurParent) {
    setErreur(erreurParent);
    return;
  }

  setErreur("");
  setDonnees(formulaireVide);
}

  return (
    <form className="bloc bloc-large" onSubmit={envoyer}>
      <h3>{etudiantEnEdition ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h3>

      <input name="prenom" placeholder="Prénom" value={donnees.prenom} onChange={changer} />
      <input name="nom" placeholder="Nom" value={donnees.nom} onChange={changer} />
      <input name="email" placeholder="E-mail" value={donnees.email} onChange={changer} />

      <select name="formation" value={donnees.formation} onChange={changer}>
        <option>Informatique</option>
        <option>Gestion</option>
        <option>Marketing</option>
      </select>

      <select name="niveau" value={donnees.niveau} onChange={changer}>
        <option>Licence 1</option>
        <option>Licence 2</option>
        <option>Licence 3</option>
        <option>Master 1</option>
        <option>Master 2</option>
      </select>

      <select name="statut" value={donnees.statut} onChange={changer}>
        <option>Actif</option>
        <option>Inactif</option>
      </select>

      <button type="submit">{etudiantEnEdition ? "Enregistrer" : "Ajouter"}</button>
      {etudiantEnEdition && (
        <button type="button" onClick={onAnnuler}>Annuler</button>
      )}

      {erreur && <p className="erreur">{erreur}</p>}
    </form>
  );
}

export default StudentForm;
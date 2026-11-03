import { useState } from "react";
import useLearning from "../hooks/useLearning";
import ELNav from "../components/ELNav";

function Profile() {
  const { profil, modifierProfil } = useLearning();

  const [donnees, setDonnees] = useState(profil); // copie locale du profil
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  function changer(e) {
    setDonnees({ ...donnees, [e.target.name]: e.target.value });
    setSucces("");
  }

  function enregistrer(e) {
    e.preventDefault();

    if (donnees.prenom.trim() === "" || donnees.nom.trim() === "") {
      setErreur("Le prénom et le nom sont obligatoires.");
      return;
    }
    if (!donnees.email.includes("@")) {
      setErreur("L'e-mail n'est pas valide.");
      return;
    }

    setErreur("");
    modifierProfil(donnees);
    setSucces("Profil enregistré ✔");
  }

  return (
    <div>
      <ELNav />
      <h2>Mon profil</h2>

      <form className="bloc" onSubmit={enregistrer}>
        <input name="prenom" placeholder="Prénom" value={donnees.prenom} onChange={changer} />
        <input name="nom" placeholder="Nom" value={donnees.nom} onChange={changer} />
        <input name="email" placeholder="E-mail" value={donnees.email} onChange={changer} />
        <button type="submit">Enregistrer</button>

        {erreur && <p className="erreur">{erreur}</p>}
        {succes && <p className="succes">{succes}</p>}
      </form>
    </div>
  );
}

export default Profile;
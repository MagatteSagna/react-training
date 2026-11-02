import { useState } from "react";

function ContactForm() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  function envoyer(e) {
    e.preventDefault(); // empêche le rechargement de la page
    setSucces("");

    // Validation des champs (dans l'ordre d'affichage)
    if (prenom.trim() === "") {
      setErreur("Le prénom est obligatoire.");
      return;
    }
    if (nom.trim() === "") {
      setErreur("Le nom est obligatoire.");
      return;
    }
    if (!email.includes("@")) {
      setErreur("L'e-mail n'est pas valide.");
      return;
    }

    // Téléphone : on enlève les espaces, puis on vérifie 9 chiffres
    const telephoneNet = telephone.replace(/\s/g, "");
    if (!/^[0-9]{9}$/.test(telephoneNet)) {
      setErreur("Le téléphone doit contenir 9 chiffres (ex : 77 123 45 67).");
      return;
    }

    if (message.trim().length < 10) {
      setErreur("Le message doit contenir au moins 10 caractères.");
      return;
    }

    // Tout est valide : on affiche le succès et on vide les champs
    setErreur("");
    setSucces("Merci " + prenom + " " + nom + ", formulaire envoyé !");
    setPrenom("");
    setNom("");
    setEmail("");
    setTelephone("");
    setMessage("");
  }

  return (
    <form className="bloc" onSubmit={envoyer}>
      <h3>Formulaire de contact</h3>

      {/* value = le state, onChange = met à jour le state à chaque frappe */}
      <input
        type="text"
        placeholder="Votre prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Votre nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Votre e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Votre téléphone (ex : 77 123 45 67)"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />

      <textarea
        placeholder="Votre message (10 caractères minimum)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Envoyer</button>

      {erreur && <p className="erreur">{erreur}</p>}
      {succes && <p className="succes">{succes}</p>}
    </form>
  );
}

export default ContactForm;
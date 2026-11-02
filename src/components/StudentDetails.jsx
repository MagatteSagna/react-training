// Props : l'étudiant à afficher + la fonction pour fermer la fenêtre
function StudentDetails({ etudiant, onFermer }) {
  return (
    // Clic sur le fond sombre... ici rose : on ferme
    <div className="modal-fond" onClick={onFermer}>
      {/* stopPropagation : un clic dans la fenêtre ne doit PAS la fermer */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{etudiant.prenom} {etudiant.nom}</h3>
        <p><strong>E-mail :</strong> {etudiant.email}</p>
        <p><strong>Formation :</strong> {etudiant.formation}</p>
        <p><strong>Niveau :</strong> {etudiant.niveau}</p>
        <p><strong>Statut :</strong> {etudiant.statut}</p>
        <button onClick={onFermer}>Fermer</button>
      </div>
    </div>
  );
}

export default StudentDetails;
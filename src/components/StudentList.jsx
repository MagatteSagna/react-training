function StudentList({ etudiants, onModifier, onSupprimer, onDetails }) {
  if (etudiants.length === 0) {
    return <p className="vide">Aucun étudiant à afficher.</p>;
  }

  return (
    <div className="tableau-conteneur">
      <table className="tableau">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>E-mail</th>
            <th>Formation</th>
            <th>Niveau</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((e) => (
            <tr key={e.id}>
              <td>{e.prenom} {e.nom}</td>
              <td>{e.email}</td>
              <td>{e.formation}</td>
              <td>{e.niveau}</td>
              <td>
                {/* EXERCICE 2 : badge coloré, la classe dépend du statut */}
                <span className={e.statut === "Actif" ? "statut statut-actif" : "statut statut-inactif"}>
                  {e.statut}
                </span>
              </td>
              <td>
                <button onClick={() => onDetails(e)}>Détails</button>
                <button onClick={() => onModifier(e)}>Modifier</button>
                <button
                  onClick={() => {
                    if (window.confirm("Déplacer " + e.prenom + " " + e.nom + " vers la corbeille ?")) {
                      onSupprimer(e.id);   // ← la ligne qui manquait
                    }
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
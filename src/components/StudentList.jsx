// Props : la liste à afficher + deux fonctions du parent
function StudentList({ etudiants, onModifier, onSupprimer }) {
  // Rendu conditionnel : message si la liste est vide
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
              <td>{e.statut}</td>
              <td>
                <button onClick={() => onModifier(e)}>Modifier</button>
                <button
                  onClick={() => {
                    // confirm() demande une confirmation avant de supprimer
                    if (window.confirm("Supprimer " + e.prenom + " " + e.nom + " ?")) {
                      onSupprimer(e.id);
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
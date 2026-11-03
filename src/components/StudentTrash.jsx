// Props : la liste des étudiants supprimés + 3 fonctions du parent
function StudentTrash({ etudiants, onRestaurer, onSupprimerDefinitivement, onVider }) {
  if (etudiants.length === 0) {
    return <p className="vide">La corbeille est vide.</p>;
  }

  return (
    <div className="tableau-conteneur">
      <table className="tableau">
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>E-mail</th>
            <th>Formation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((e) => (
            <tr key={e.id}>
              <td>{e.prenom} {e.nom}</td>
              <td>{e.email}</td>
              <td>{e.formation}</td>
              <td>
                <button onClick={() => onRestaurer(e.id)}>Restaurer</button>
                <button onClick={() => onSupprimerDefinitivement(e.id)}>
                  Supprimer définitivement
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bouton-danger" onClick={onVider}>
        Vider la corbeille
      </button>
    </div>
  );
}

export default StudentTrash;
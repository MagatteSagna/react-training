// Un component (composant) = une fonction avec une majuscule qui retourne du JSX
function Badge() {
  return (
    <span className="badge">
      Nouveau
    </span>
  );
}

// export default = rendre le component utilisable dans les autres fichiers
export default Badge;
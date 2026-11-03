import { NavLink } from "react-router";

function Header() {
  return (
    <header className="header">
      <h1>Projet Front- end de Magatte</h1>
      <nav>
        {/* "end" sur "/" : sinon Accueil resterait actif sur toutes les pages */}
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/catalogue">Catalogue</NavLink>
        <NavLink to="/etudiants">Étudiants</NavLink>
        <NavLink to="/taches">Tâches</NavLink>
        <NavLink to="/exercices">Exercices</NavLink>
      </nav>
    </header>
  );
}

export default Header;
import { NavLink } from "react-router";
import useShop from "../hooks/useShop";

function Header() {
  const { favoris, nbArticles } = useShop();

  return (
    <header className="header">
      <h1>Projet Front-end de Magatte</h1>
      <nav>
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/catalogue">Catalogue</NavLink>
        <NavLink to="/etudiants">Étudiants</NavLink>
        <NavLink to="/taches">Tâches</NavLink>
        <NavLink to="/exercices">Exercices</NavLink>
        <NavLink to="/favoris">
          ♥ Favoris <span className="compteur">{favoris.length}</span>
        </NavLink>
        <NavLink to="/panier">
          Panier <span className="compteur">{nbArticles}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
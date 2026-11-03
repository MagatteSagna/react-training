import { NavLink } from "react-router";

function ELNav() {
  return (
    <nav className="el-nav">
      <NavLink to="/elearning" end>Accueil</NavLink>
      <NavLink to="/elearning/formations">Formations</NavLink>
      <NavLink to="/elearning/tableau-de-bord">Tableau de bord</NavLink>
      <NavLink to="/elearning/profil">Profil</NavLink>
    </nav>
  );
}

export default ELNav;
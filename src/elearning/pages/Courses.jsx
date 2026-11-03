import { useState } from "react";
import courses from "../data/courses";
import CourseCard from "../components/CourseCard";
import ELNav from "../components/ELNav";

function Courses() {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const [niveau, setNiveau] = useState("Tous");

  // Listes uniques pour les menus déroulants
  const categories = ["Toutes", ...new Set(courses.map((c) => c.categorie))];
  const niveaux = ["Tous", ...new Set(courses.map((c) => c.niveau))];

  const affichees = courses.filter((c) => {
    const okRecherche = c.titre.toLowerCase().includes(recherche.toLowerCase());
    const okCategorie = categorie === "Toutes" || c.categorie === categorie;
    const okNiveau = niveau === "Tous" || c.niveau === niveau;
    return okRecherche && okCategorie && okNiveau;
  });

  return (
    <div>
      <ELNav />
      <h2>Toutes les formations</h2>

      <div className="outils-produits">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={niveau} onChange={(e) => setNiveau(e.target.value)}>
          {niveaux.map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>

      <p>{affichees.length} formation(s) sur {courses.length}</p>

      {affichees.length === 0 ? (
        <p className="message">Aucune formation ne correspond à ta recherche.</p>
      ) : (
        <div className="liste-cours">
          {affichees.map((c) => <CourseCard key={c.id} cours={c} />)}
        </div>
      )}
    </div>
  );
}

export default Courses;
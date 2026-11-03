import LearningContext from "./learningContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import courses from "../data/courses";

function LearningProvider({ children }) {
  // Tout est sauvegardé dans le LocalStorage (survit à F5)
  const [inscrits, setInscrits] = useLocalStorage("el-inscrits", []);
  // [1, 3] = ids des formations suivies

  const [termines, setTermines] = useLocalStorage("el-termines", {});
  // { "1": [1, 2], "3": [1] } = formation -> ids des chapitres terminés

  const [scores, setScores] = useLocalStorage("el-scores", {});
  // { "1": 100 } = formation -> meilleur score en %

  const [profil, setProfil] = useLocalStorage("el-profil", {
    prenom: "Magatte",
    nom: "Sagna",
    email: "magatte@example.com",
  });

  // ===== INSCRIPTION =====
  function estInscrit(idCours) {
    return inscrits.includes(idCours);
  }

  function sinscrire(idCours) {
    if (!estInscrit(idCours)) {
      setInscrits([...inscrits, idCours]);
    }
  }

  function seDesinscrire(idCours) {
    setInscrits(inscrits.filter((id) => id !== idCours));
  }

  // ===== PROGRESSION =====
  function estTermine(idCours, idModule) {
    const liste = termines[idCours] || [];
    return liste.includes(idModule);
  }

  // Ajoute ou retire le chapitre de la liste des terminés
  function basculerModule(idCours, idModule) {
    const liste = termines[idCours] || [];
    const nouvelle = liste.includes(idModule)
      ? liste.filter((m) => m !== idModule)
      : [...liste, idModule];
    // { ...termines, [idCours]: nouvelle } copie l'objet en changeant une seule clé
    setTermines({ ...termines, [idCours]: nouvelle });
  }

  // Pourcentage de chapitres terminés (0 à 100)
  function progression(idCours) {
    const cours = courses.find((c) => c.id === idCours);
    if (!cours || cours.modules.length === 0) return 0;
    const faits = (termines[idCours] || []).length;
    return Math.round((faits / cours.modules.length) * 100);
  }

  // ===== QUIZ =====
  // On garde le MEILLEUR score
  function enregistrerScore(idCours, pourcentage) {
    const ancien = scores[idCours] || 0;
    if (pourcentage > ancien) {
      setScores({ ...scores, [idCours]: pourcentage });
    }
  }

  function meilleurScore(idCours) {
    return scores[idCours] ?? null; // null = quiz jamais fait
  }

  // ===== PROFIL =====
  function modifierProfil(nouveau) {
    setProfil(nouveau);
  }

  // ===== RÉINITIALISATION =====
  function toutReinitialiser() {
    setInscrits([]);
    setTermines({});
    setScores({});
  }

  const valeur = {
    inscrits,
    profil,
    estInscrit,
    sinscrire,
    seDesinscrire,
    estTermine,
    basculerModule,
    progression,
    enregistrerScore,
    meilleurScore,
    modifierProfil,
    toutReinitialiser,
  };

  return <LearningContext.Provider value={valeur}>{children}</LearningContext.Provider>;
}

export default LearningProvider;
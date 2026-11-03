// Données simulées : pas de backend, tout est dans ce fichier
const courses = [
  {
    id: 1,
    titre: "Initiation à HTML et CSS",
    categorie: "Web",
    niveau: "Débutant",
    duree: "6 heures",
    description: "Apprends à construire et mettre en forme tes premières pages web.",
    objectifs: [
      "Structurer une page avec HTML",
      "Mettre en forme avec CSS",
      "Créer une mise en page responsive",
    ],
    modules: [
      { id: 1, titre: "Les balises HTML", contenu: "HTML décrit la structure d'une page : titres (h1), paragraphes (p), liens (a), images (img)." },
      { id: 2, titre: "Les formulaires", contenu: "Un formulaire utilise form, input, select et button pour recueillir des informations." },
      { id: 3, titre: "Les sélecteurs CSS", contenu: "Un sélecteur désigne les éléments à styliser : par balise, par classe (.nom) ou par identifiant (#nom)." },
      { id: 4, titre: "Flexbox", contenu: "Flexbox aligne et répartit les éléments avec display: flex, justify-content et align-items." },
    ],
    quiz: [
      {
        id: 1,
        question: "Quelle balise crée un lien ?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        reponse: 1,
      },
      {
        id: 2,
        question: "Quelle propriété CSS change la couleur du texte ?",
        options: ["font-color", "text-color", "color", "background"],
        reponse: 2,
      },
      {
        id: 3,
        question: "Quelle valeur active Flexbox ?",
        options: ["display: flex", "position: flex", "float: flex", "flex: none"],
        reponse: 0,
      },
    ],
  },
  {
    id: 2,
    titre: "JavaScript pour débutants",
    categorie: "Programmation",
    niveau: "Débutant",
    duree: "8 heures",
    description: "Découvre les bases du langage qui rend les sites interactifs.",
    objectifs: [
      "Utiliser variables et fonctions",
      "Manipuler tableaux et objets",
      "Comprendre map, filter et les promesses",
    ],
    modules: [
      { id: 1, titre: "Variables et types", contenu: "On déclare une variable avec let ou const. Les types de base sont : nombre, texte, booléen." },
      { id: 2, titre: "Fonctions", contenu: "Une fonction regroupe du code réutilisable : function addition(a, b) { return a + b; }" },
      { id: 3, titre: "Tableaux et objets", contenu: "Un tableau est une liste ordonnée. Un objet associe des noms à des valeurs." },
      { id: 4, titre: "map et filter", contenu: "map transforme chaque élément d'un tableau, filter garde seulement ceux qui vérifient une condition." },
      { id: 5, titre: "Promesses et async/await", contenu: "async/await permet d'attendre le résultat d'une opération lente, comme une requête fetch." },
    ],
    quiz: [
      {
        id: 1,
        question: "Quel mot-clé déclare une constante ?",
        options: ["var", "let", "const", "fix"],
        reponse: 2,
      },
      {
        id: 2,
        question: "Quelle méthode garde les éléments qui vérifient une condition ?",
        options: ["map", "filter", "push", "join"],
        reponse: 1,
      },
      {
        id: 3,
        question: "À quoi sert await ?",
        options: [
          "Arrêter le programme",
          "Répéter une boucle",
          "Attendre le résultat d'une promesse",
          "Créer une variable",
        ],
        reponse: 2,
      },
    ],
  },
  {
    id: 3,
    titre: "React pour débutants",
    categorie: "Programmation",
    niveau: "Intermédiaire",
    duree: "10 heures",
    description: "Construis des interfaces modernes avec composants, props et state.",
    objectifs: [
      "Créer des composants réutilisables",
      "Gérer l'état avec useState",
      "Naviguer avec React Router",
    ],
    modules: [
      { id: 1, titre: "Composants et JSX", contenu: "Un composant est une fonction qui retourne du JSX, une syntaxe proche du HTML." },
      { id: 2, titre: "Props", contenu: "Les props transmettent des données d'un composant parent vers un enfant." },
      { id: 3, titre: "useState", contenu: "useState donne une mémoire au composant : const [valeur, setValeur] = useState(0)." },
      { id: 4, titre: "useEffect", contenu: "useEffect exécute du code après l'affichage, par exemple pour charger des données." },
    ],
    quiz: [
      {
        id: 1,
        question: "Comment transmet-on des données à un composant enfant ?",
        options: ["Avec les props", "Avec le CSS", "Avec un fichier JSON", "Avec un cookie"],
        reponse: 0,
      },
      {
        id: 2,
        question: "Quel hook donne une mémoire à un composant ?",
        options: ["useEffect", "useState", "useRef", "useMemo"],
        reponse: 1,
      },
      {
        id: 3,
        question: "Un nom de composant commence par...",
        options: ["une minuscule", "un chiffre", "une majuscule", "un tiret"],
        reponse: 2,
      },
    ],
  },
];

export default courses;
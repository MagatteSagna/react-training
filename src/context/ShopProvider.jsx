import ShopContext from "./shopContext";
import useLocalStorage from "../hooks/useLocalStorage";

// children = tout ce qui est enveloppé par <ShopProvider>
function ShopProvider({ children }) {
  // Réutilisation du hook du Jour 7 : favoris et panier survivent à F5
  const [favoris, setFavoris] = useLocalStorage("favoris", []);
  const [panier, setPanier] = useLocalStorage("panier", []);
  // panier = [{ produit: {...}, quantite: 2 }, ...]

  // ===== FAVORIS =====
  function estFavori(id) {
    return favoris.some((p) => p.id === id);
  }

  // Ajoute si absent, retire si présent
  function basculerFavori(produit) {
    if (estFavori(produit.id)) {
      setFavoris(favoris.filter((p) => p.id !== produit.id));
    } else {
      setFavoris([...favoris, produit]);
    }
  }

  function viderFavoris() {
    setFavoris([]);
  }

  // ===== PANIER =====
  function ajouterAuPanier(produit) {
    const ligne = panier.find((l) => l.produit.id === produit.id);
    if (ligne) {
      // déjà dans le panier : quantité + 1
      setPanier(
        panier.map((l) =>
          l.produit.id === produit.id ? { ...l, quantite: l.quantite + 1 } : l
        )
      );
    } else {
      setPanier([...panier, { produit: produit, quantite: 1 }]);
    }
  }

  // delta = +1 ou -1 ; une ligne à 0 disparaît
  function changerQuantite(id, delta) {
    setPanier(
      panier
        .map((l) => (l.produit.id === id ? { ...l, quantite: l.quantite + delta } : l))
        .filter((l) => l.quantite > 0)
    );
  }

  function retirerDuPanier(id) {
    setPanier(panier.filter((l) => l.produit.id !== id));
  }

  function viderPanier() {
    setPanier([]);
  }

  // ===== VALEURS CALCULÉES (jamais stockées) =====
  // reduce() additionne : on part de 0 et on ajoute chaque ligne
  const nbArticles = panier.reduce((total, l) => total + l.quantite, 0);
  const totalPanier = panier.reduce((total, l) => total + l.produit.price * l.quantite, 0);

  // Tout ce qu'on met ici sera accessible partout dans l'application
  const valeur = {
    favoris,
    panier,
    nbArticles,
    totalPanier,
    estFavori,
    basculerFavori,
    viderFavoris,
    ajouterAuPanier,
    changerQuantite,
    retirerDuPanier,
    viderPanier,
  };

  return <ShopContext.Provider value={valeur}>{children}</ShopContext.Provider>;
}

export default ShopProvider;
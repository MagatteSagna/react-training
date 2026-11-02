import Badge from "./Badge"; // on importe le component

function Main() {
  return (
    <main className="main">
      <h2>Bienvenue !</h2>
      <p>Ceci est ma première application React avec Vite.</p>

      {/* On utilise le Badge comme une balise HTML */}
      <Badge />
      <Badge />
      <Badge />
    </main>
  );
}

export default Main;
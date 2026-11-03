import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import ProductDetails from "./pages/ProductDetails";
import Students from "./pages/Students";
import Tasks from "./pages/Tasks";
import Exercices from "./pages/Exercices";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      {/* Le contenu change selon l'URL ; Header et Footer restent */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/:id" element={<ProductDetails />} />
          <Route path="/etudiants" element={<Students />} />
          <Route path="/taches" element={<Tasks />} />
          <Route path="/exercices" element={<Exercices />} />
          {/* path="*" = toute autre URL : page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
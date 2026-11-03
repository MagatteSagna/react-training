import { Link } from "react-router";
import courses from "../data/courses";
import useLearning from "../hooks/useLearning";
import ProgressBar from "../components/ProgressBar";
import ELNav from "../components/ELNav";

function Dashboard() {
    const { inscrits, progression, nbTermines, meilleurScore, toutReinitialiser } = useLearning();

    // On retrouve les formations suivies à partir de leurs ids
    const suivies = courses.filter((c) => inscrits.includes(c.id));

    // Valeurs calculées
    const nbTerminees = suivies.filter((c) => progression(c.id) === 100).length;
    const moyenne =
        suivies.length === 0
            ? 0
            : Math.round(suivies.reduce((total, c) => total + progression(c.id), 0) / suivies.length);

    if (suivies.length === 0) {
        return (
            <div>
                <ELNav />
                <h2>Tableau de bord</h2>
                <p className="message">Tu n'es inscrit à aucune formation.</p>
                <Link to="/elearning/formations" className="bouton-lien">Voir les formations</Link>
            </div>
        );
    }

    return (
        <div>
            <ELNav />
            <h2>Tableau de bord</h2>

            {/* Trois cartes de statistiques */}
            <div className="stats">
                <div className="stat">
                    <strong>{suivies.length}</strong>
                    <span>formation(s) suivie(s)</span>
                </div>
                <div className="stat">
                    <strong>{nbTerminees}</strong>
                    <span>formation(s) terminée(s)</span>
                </div>
                <div className="stat">
                    <strong>{moyenne}%</strong>
                    <span>progression moyenne</span>
                </div>
            </div>

            <div className="liste-cours">
                {suivies.map((c) => {
                    const score = meilleurScore(c.id);
                    return (
                        <div key={c.id} className="cours-carte">
                            <h3>{c.titre}</h3>
                            <p className="infos-cours">
                                {nbTermines(c.id)} / {c.modules.length} chapitres terminés
                            </p>
                            <ProgressBar pourcentage={progression(c.id)} />
                            <p>{score === null ? "Quiz : pas encore passé" : "Meilleur score au quiz : " + score + "%"}</p>
                            <Link to={"/elearning/formations/" + c.id + "/apprendre"} className="bouton-lien">
                                Continuer
                            </Link>
                        </div>
                    );
                })}
            </div>

            <button
                className="bouton-danger"
                onClick={() => {
                    if (window.confirm("Effacer toute ta progression ?")) toutReinitialiser();
                }}
            >
                Réinitialiser ma progression
            </button>
        </div>
    );
}

export default Dashboard;
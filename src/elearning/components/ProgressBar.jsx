// pourcentage : nombre de 0 à 100
function ProgressBar({ pourcentage }) {
  return (
    <div className="barre">
      <div className="barre-remplie" style={{ width: pourcentage + "%" }}></div>
      <span className="barre-texte">{pourcentage}%</span>
    </div>
  );
}

export default ProgressBar;
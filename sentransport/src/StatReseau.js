import './StatReseau.css';

function StatReseau({ lignes }) {
  const totalLignes = lignes.length;
  const totalArrets = lignes.reduce((sum, l) => sum + l.arrets, 0);
  const ligneMax = lignes.reduce((max, l) => l.arrets > max.arrets ? l : max, lignes[0]);

  return (
    <div className="stat-reseau">
      <div className="stat-card">
        <div className="stat-valeur">{totalLignes}</div>
        <div className="stat-label">Lignes</div>
      </div>
      <div className="stat-card">
        <div className="stat-valeur">{totalArrets}</div>
        <div className="stat-label">Arrêts au total</div>
      </div>
      <div className="stat-card">
        <div className="stat-valeur">Ligne {ligneMax.numero}</div>
        <div className="stat-label">Plus d'arrêts ({ligneMax.arrets})</div>
      </div>
    </div>
  );
}

export default StatReseau;
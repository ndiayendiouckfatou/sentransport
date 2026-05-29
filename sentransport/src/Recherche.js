import './Recherche.css';

function Recherche({ valeur, onChange }) {
  return (
    <div className="recherche">
      <input
        type="text"
        value={valeur}
        onChange={e => onChange(e.target.value)}
        placeholder="Rechercher une ligne (depart, arrivee)..."
      />
      <button onClick={() => onChange("")}>Effacer</button>
    </div>
  );
}

export default Recherche;
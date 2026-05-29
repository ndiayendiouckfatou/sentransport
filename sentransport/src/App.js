import './App.css';
import { useState, useEffect } from 'react';
import Recherche from './Recherche';
import Header from './Header';
import ListeLignes from './ListeLignes';
import LigneBus from './LigneBus';
import StatReseau from './StatReseau';
import Footer from './Footer';
import DetailLignes from './DetailLignes';

function App() {
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/lignes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur serveur : " + response.status);
        }
        return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );
  
function handleClickLigne(ligne) {
  if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
    setLigneSelectionnee(null); // re-clic = déselectionner
  } else {
    setLigneSelectionnee(ligne); // premier clic = sélectionner
  }
}

if (chargement) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <p className="message-chargement">Chargement des lignes...</p>
        </main>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="App">
        <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <Recherche valeur={recherche} onChange={(valeur) => {
    setRecherche(valeur);
    setNbRecherches(nbRecherches + 1);
  }}
/>
<p className="compteur">
  Vous avez effectué {nbRecherches} recherche(s)
</p>
        <p className="resultat-recherche">
          {lignesFiltrees.length} ligne
          {lignesFiltrees.length > 1 ? 's' : ''}
          {' '}trouvee
          {lignesFiltrees.length > 1 ? 's' : ''}
        </p>
        {lignesFiltrees.map(ligne => (
  <LigneBus
    key={ligne.id}
    numero={ligne.numero}
    depart={ligne.depart}
    arrivee={ligne.arrivee}
    arrets={ligne.arrets}
    estSelectionnee={ligneSelectionnee?.id === ligne.id}
    onClick={() => handleClickLigne(ligne)}
  />
))}
{lignesFiltrees.length === 0 && (
  <p className="aucun-resultat">Aucune ligne trouvée</p>
)}
{ligneSelectionnee && (
  <DetailLignes ligne={ligneSelectionnee} />
)}
      </main>
      <Footer />
    </div>
  );
}

export default App;
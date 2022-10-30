import './App.css';
import Marchamo3Monazos from './components/pure/forms/Marchamo3Monazos';
import MarchamoLotto from './components/pure/forms/MarchamoLotto';
import MarchamoNacional from './components/pure/forms/MarchamoNacional';
import MarchamoNuevosTiempos from './components/pure/forms/MarchamoNuevosTiempos';
import MarchamoPopular from './components/pure/forms/MarchamoPopular';
import LoginPage from './pages/auth/LoginPage';
import DatosPrevios from './pages/DatosPrevios/DatosPreviosPage';
import ChooseLottery from './pages/LotteyCards/ChooseLotteryPage';
import NombreFiscalizadores from './pages/NombreFiscalizadores/NombreFiscalizadoresPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Valija3Monazos from './components/pure/forms/Valija3Monazos';
import ValijaNuevosTiempos from './components/pure/forms/ValijaNuevosTiempos';
import Pruebas3Monazos from './components/pure/forms/Pruebas3MonazosForm';
import PruebasLottoPage from './pages/Pruebas/PruebasLottoPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>} /> {/* Root page */}
          <Route exact path="/ChooseLottery" element={<ChooseLottery />} /> {/* Choose lottery page */}
          <Route exact path="/DatosPrevios" element={<DatosPrevios />} /> {/* Previous data page */}
          <Route exact path="/MarchamoPopular" element={<MarchamoPopular />} /> {/* Popular stamp page */}
          <Route exact path="/MarchamoNacional" element={<MarchamoNacional />} /> {/* National stamp page */}
          <Route exact path="/MarchamoLotto" element={<MarchamoLotto />} /> {/* Lotto stamp page */}
          <Route exact path="/MarchamoNuevosTiempos" element={<MarchamoNuevosTiempos />} /> {/* New times stamp page */}
          <Route exact path="/Marchamo3Monazos" element={<Marchamo3Monazos />} /> {/* 3 Monazos stamp page */}
          <Route exact path="/NombreFiscalizadores" element={<NombreFiscalizadores />} /> {/* Name of the inspectors page */}
          <Route exact path="/Valija3Monazos" element={<Valija3Monazos />} /> {/* Name of the inspectors page */}
          <Route exact path="/ValijaNuevosTiempos" element={<ValijaNuevosTiempos />} /> {/* Name of the inspectors page */}
          <Route exact path="/InputList" element={<InputList />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

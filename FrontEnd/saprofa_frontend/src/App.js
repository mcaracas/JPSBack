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
import PruebasLottoPage from './pages/Pruebas/PruebasLottoPage';
import Pruebas3MonazosPage from './pages/Pruebas/Pruebas3MonazosPage';
import PruebasNTPage from './pages/Pruebas/PruebasNTPage';
import RegisterPage from './pages/auth/RegisterPage';
import PlanPremiosPage from './pages/PlanPremios/PlanPremiosPage';
import LoteriaFisicapage from './pages/Resultados/LoteriaFisicapage';
import DatosParticipantesPage from './pages/DatosParticipantes/DatosParticipantesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>} /> {/* Root page */}
          <Route path="/Register" element={<RegisterPage/>} />
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
          <Route exact path="/PruebasLotto" element={<PruebasLottoPage />} /> 
          <Route exact path="/Pruebas3Monazos" element={<Pruebas3MonazosPage />} /> 
          <Route exact path="/PruebasNuevosTiempos" element={<PruebasNTPage />} /> 
          <Route exact path="/PlanPremios" element={<PlanPremiosPage />} />
          <Route exact path="/ResultadosLoteriaFisica" element={<LoteriaFisicapage/>} />
          <Route exact path="/DatosParticipantesPage" element={<DatosParticipantesPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

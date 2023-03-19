import './App.css';
import Marchamo3MonazosPage from './pages/Marchamos/Marchamo3MonazosPage';
import MarchamoLottoPage from './pages/Marchamos/MarchamoLottoPage';
import MarchamoNuevosTiemposPage from './pages/Marchamos/MarchamoNuevosTiemposPage';
import MarchamoPopularPage from './pages/Marchamos/MarchamoPopular';
import MarchamoNacionalPage from './pages/Marchamos/MarchamoNacional';
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
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ConfirmationCodeModal from './components/pure/forms/ConfirmationCodeModal';
import LoteriaFisicapage from './pages/Resultados/LoteriaFisicapage';
import LoteriaElectronicaPage from './pages/Resultados/LoteriaElectronicaPage';
import ConclusionesRecomendacionesPage from './pages/ConclusionesRecomendaciones/ConclusionesRecomendacionesPage';
import CierreApuestas from './pages/CierreApuestas/CierreApuestasPage';
import VerificaMontosAcumulados from './pages/VerificaMontosAcumulados/VerificaMontosAcumuladosPage';
import DatosParticipantesPage from './pages/DatosParticipantes/DatosParticipantesPage';
import TomoFolioPage from './pages/TomoFolio/TomoFolioPage';
import SeriesEnJuegoPage from './pages/seriesEnJuego/seriesEnJuegoPage';
import EscrutinioPage from './pages/Escrutinio/EscrutinioPage';
import Test from './components/pure/forms/Test';
import Test2 from './components/pure/forms/Test2';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>} /> {/* Root page */}
          <Route path="/Register" element={<RegisterPage/>} />
          <Route exact path="/ChooseLottery" element={<ChooseLottery />} /> {/* Choose lottery page */}
          <Route exact path="/DatosPrevios" element={<DatosPrevios />} /> {/* Previous data page */}
          <Route exact path="/MarchamoPopular" element={<MarchamoPopularPage />} /> {/* Popular stamp page */}
          <Route exact path="/MarchamoNacional" element={<MarchamoNacionalPage />} /> {/* National stamp page */}
          <Route exact path="/MarchamoLotto" element={<MarchamoLottoPage />} /> {/* Lotto stamp page */}
          <Route exact path="/MarchamoNuevosTiempos" element={<MarchamoNuevosTiemposPage />} /> {/* New times stamp page */}
          <Route exact path="/Marchamo3Monazos" element={<Marchamo3MonazosPage />} /> {/* 3 Monazos stamp page */}
          <Route exact path="/NombreFiscalizadores" element={<NombreFiscalizadores />} /> {/* Name of the inspectors page */}
          <Route exact path="/Valija3Monazos" element={<Valija3Monazos />} /> {/* Name of the inspectors page */}
          <Route exact path="/ValijaNuevosTiempos" element={<ValijaNuevosTiempos />} /> {/* Name of the inspectors page */}
          <Route exact path="/PruebasLotto" element={<PruebasLottoPage />} />   
          <Route exact path="/Pruebas3Monazos" element={<Pruebas3MonazosPage />} /> 
          <Route exact path="/PruebasNuevosTiempos" element={<PruebasNTPage />} /> 
          <Route exact path="/PlanPremios" element={<PlanPremiosPage />} />
          <Route exact path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
          <Route exact path="/ConfirmationCodeModal" element={<ConfirmationCodeModal />} />
          <Route exact path="/ResultadosLoteriaFisica" element={<LoteriaFisicapage/>} />
          <Route exact path="/ResultadosLoteriaElectronica" element={<LoteriaElectronicaPage/>}/>
          <Route exact path="/ConclusionesRecomendaciones" element={<ConclusionesRecomendacionesPage/>} />
          <Route exact path="/CierreApuestas" element={<CierreApuestas />} />
          <Route exact path="/VerificaMontosAcumulados" element={<VerificaMontosAcumulados />} />
          <Route exact path="/DatosParticipantesPage" element={<DatosParticipantesPage/>} />
          <Route exact path="/TomoFolio" element={<TomoFolioPage/>} />
          <Route exact path="/SeriesEnJuego" element={<SeriesEnJuegoPage/>} />
          <Route exact path="/Escrutinio" element={<EscrutinioPage/>} />
          <Route exact path="/Test" element={<Test/>}/>
          <Route exact path="/Test" element={<Test2/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
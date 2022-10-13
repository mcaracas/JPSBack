import './App.css';
import LotteryCardList from './components/container/LotteryCardList';
import Marchamo3Monazos from './components/pure/forms/Marchamo3Monazos';
import MarchamoLotto from './components/pure/forms/MarchamoLotto';
import MarchamoNacional from './components/pure/forms/MarchamoNacional';
import MarchamoNuevosTiempos from './components/pure/forms/MarchamoNuevosTiempos';
import MarchamoPopular from './components/pure/forms/MarchamoPopular';
import LoginPage from './pages/auth/LoginPage';
import DatosPrevios from './pages/DatosPrevios/DatosPrevios';

function App() {
  return (
    <div className="App">
        {/** @TODO: Routes */}
        {/* <LoginPage></LoginPage> * Login page */}
        {/* <LotteryCardList></LotteryCardList> */}
        {/* <h1>3 Monazos</h1>
        <Marchamo3Monazos></Marchamo3Monazos>
        <h1>Nuevos Tiempos</h1>
        <MarchamoNuevosTiempos></MarchamoNuevosTiempos>
        <h1>Lotto</h1>
        <MarchamoLotto></MarchamoLotto>
        <h1>Popular</h1>
        <MarchamoPopular></MarchamoPopular>
        <h1>Nacional</h1>
        <MarchamoNacional></MarchamoNacional> */}
        <DatosPrevios></DatosPrevios>
    </div>
  );
}

export default App;

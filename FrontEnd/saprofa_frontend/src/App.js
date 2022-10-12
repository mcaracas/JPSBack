import './App.css';
import LotteryCardList from './components/container/LotteryCardList';
import Marchamo3Monazos from './components/pure/forms/Marchamo3Monazos';
import MarchamoLotto from './components/pure/forms/MarchamoLotto';
import MarchamoNacional from './components/pure/forms/MarchamoNacional';
import MarchamoNuevosTiempos from './components/pure/forms/MarchamoNuevosTiempos';
import MarchamoPopular from './components/pure/forms/MarchamoPopular';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <div className="App">
        {/** @TODO: Routes */}
        {/* <LoginPage></LoginPage> * Login page */}
        {/* <LotteryCardList></LotteryCardList> */}
        <Marchamo3Monazos></Marchamo3Monazos>
        <MarchamoLotto></MarchamoLotto>
        <MarchamoNacional></MarchamoNacional>
        <MarchamoNuevosTiempos></MarchamoNuevosTiempos>
        <MarchamoPopular></MarchamoPopular>

    </div>
  );
}

export default App;

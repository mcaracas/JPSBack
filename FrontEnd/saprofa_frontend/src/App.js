import './App.css';
import LotteryCardList from './components/container/LotteryCardList';
import Marchamo3Monazos from './components/pure/forms/Marchamo3Monazos';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <div className="App">
        {/** @TODO: Routes */}
        {/* <LoginPage></LoginPage> * Login page */}
        {/* <LotteryCardList></LotteryCardList> */}
        <Marchamo3Monazos></Marchamo3Monazos>
    </div>
  );
}

export default App;

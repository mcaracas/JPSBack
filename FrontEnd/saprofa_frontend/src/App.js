import './App.css';
import LotteryCardList from './components/container/LotteryCardList';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <div className="App">
        {/** @TODO: Routes */}
        {/* <LoginPage></LoginPage> * Login page */}
        <LotteryCardList></LotteryCardList>
    </div>
  );
}

export default App;

//Bibliotecas
import { useState } from 'react';
import PWABadge from './PWABadge.tsx'
//Paginas
import LoginScreen from './pages/login/index.tsx';
import HomeScreen from './pages/home/index.tsx';
import RegisterScreen from './pages/singup/index.tsx';
import MyMatchesScreen from './pages/match/index.tsx';
import LiveMatchScreen from './pages/liveMatch/index.tsx';
import MatchControlScreen from './pages/matchControl/index.tsx';
import CreateMatchScreen from './pages/createMatch/index.tsx';
import HistoryScreen from './pages/historyMatch/index.tsx';
import MatchSummaryScreen from './pages/matchSummary/index.tsx';

//Componentes
import Header from './components/header.tsx';

export type Screen =
  | 'login'
  | 'register'
  | 'home'
  | 'myMatches'
  | 'matchSummary'
  | 'liveMatch'
  | 'matchControl'
  | 'createMatch'
  | 'substitution'
  | 'history'
  | 'matchSummary';

function App() {

  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // Navegação entre as Paginas
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} onNavigateToRegister={() => setCurrentScreen('register')} />;
      case 'register':
        return <RegisterScreen onNavigateToLogin={() => setCurrentScreen('login')} />;
      case 'home':
        return <HomeScreen onNavigate={navigateToScreen} />;
      case 'myMatches':
        return <MyMatchesScreen onNavigate={navigateToScreen} onSelectMatch={setSelectedMatch} />;
      case 'liveMatch':
        return <LiveMatchScreen onNavigate={navigateToScreen} match={selectedMatch}/>;
      case 'matchControl':
        return <MatchControlScreen onNavigate={navigateToScreen} match={selectedMatch} />;
      case 'createMatch':
        return <CreateMatchScreen onNavigate={navigateToScreen} />;
        case 'history':
          return <HistoryScreen onNavigate={navigateToScreen} onSelectMatch={setSelectedMatch} />;
          case 'matchSummary':
            return <MatchSummaryScreen onNavigate={navigateToScreen} match={selectedMatch}/>;
      default:
        return <HomeScreen onNavigate={navigateToScreen} />;
    }
  };

  return (
    <>


      <div className="min-h-screen bg-gray-50">
        {isLoggedIn && (
          <Header currentScreen={currentScreen} onNavigate={navigateToScreen} onLogout={handleLogout} />
        )}

        <main className={`${isLoggedIn ? 'pt-16' : ''}`}>
          {renderScreen()}
        </main>
      </div>
      <PWABadge />
    </>
  );
}

export default App;

import { Link, Route, Routes } from 'react-router-dom'
import noobLeagueLogo from './assets/noob-league-logo.png'
import { HomePage } from './pages/home'
import { TournamentsPage } from './pages/tournaments'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-brand">
          <img src={noobLeagueLogo} alt="Noob League" className="app-brand__logo" />
        </Link>

        <nav className="app-nav" aria-label="Navegacao principal">
          <Link to="/">Home</Link>
          <Link to="/torneios">Torneios</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/torneios" element={<TournamentsPage />} />
        <Route path="/campeonatos" element={<TournamentsPage />} />
      </Routes>
    </div>
  )
}

export default App

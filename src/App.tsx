import { Link, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home'
import { TournamentsPage } from './pages/tournaments'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-brand">
          Noob League
        </Link>

        <nav className="app-nav" aria-label="Navegacao principal">
          <Link to="/">Home</Link>
          <Link to="/campeonatos">Campeonatos</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campeonatos" element={<TournamentsPage />} />
      </Routes>
    </div>
  )
}

export default App

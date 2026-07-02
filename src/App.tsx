import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import noobLeagueLogo from './assets/noob-league-logo.png'
import { AdminLoginPage, AdminPage } from './pages/admin'
import { HomePage } from './pages/home'
import { TournamentDetailsPage } from './pages/tournament-details'
import { TournamentsPage } from './pages/tournaments'
import {
  clearAdminSession,
  createAdminSession,
  getStoredAdminSession,
  validateAdminCredentials,
} from './services/admin-auth'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [adminExpiresAt, setAdminExpiresAt] = useState<number | null>(() => {
    const session = getStoredAdminSession()
    return session?.expiresAt ?? null
  })
  const [adminErrorMessage, setAdminErrorMessage] = useState('')

  const isAdminAuthenticated = adminExpiresAt !== null

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!adminExpiresAt) {
      return
    }

    const timeout = window.setTimeout(() => {
      clearAdminSession()
      setAdminExpiresAt(null)
      setAdminErrorMessage('Sua sessao expirou. Faca login novamente.')
    }, Math.max(0, adminExpiresAt - Date.now()))

    return () => {
      window.clearTimeout(timeout)
    }
  }, [adminExpiresAt])

  function handleAdminLogin(username: string, password: string) {
    const validation = validateAdminCredentials(username, password)

    if (!validation.isValid) {
      setAdminErrorMessage(validation.message)
      return false
    }

    const expiresAt = createAdminSession()
    setAdminExpiresAt(expiresAt)
    setAdminErrorMessage('')
    return true
  }

  function handleAdminLogout() {
    clearAdminSession()
    setAdminExpiresAt(null)
    setAdminErrorMessage('')
  }

  return (
    <div className="app-shell">
      <header className={`app-header ${isScrolled ? 'app-header--scrolled' : ''}`}>
        <div className="app-header__inner">
          <Link to="/" className="app-brand">
            <img src={noobLeagueLogo} alt="Noob League" className="app-brand__logo" />
          </Link>

          <nav className="app-nav" aria-label="Navegacao principal">
            <Link to="/">Home</Link>
            <Link to="/torneios">Torneios</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/torneios" element={<TournamentsPage />} />
        <Route path="/torneio/:id" element={<TournamentDetailsPage />} />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <AdminPage expiresAt={adminExpiresAt} onLogout={handleAdminLogout} />
            ) : (
              <AdminLoginPage
                errorMessage={adminErrorMessage}
                onLogin={handleAdminLogin}
              />
            )
          }
        />
        <Route path="/campeonatos" element={<TournamentsPage />} />
      </Routes>
    </div>
  )
}

export default App

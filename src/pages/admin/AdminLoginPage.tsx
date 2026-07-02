import { useState, type SyntheticEvent } from 'react'
import './admin.css'

type AdminLoginPageProps = {
  errorMessage: string
  onLogin: (username: string, password: string) => boolean
}

export function AdminLoginPage({ errorMessage, onLogin }: AdminLoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <main className="admin-page">
      <section className="admin-login-card">
        <p className="admin-eyebrow">Login administrativo</p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span>Usuario</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Digite o usuario admin"
              autoComplete="username"
            />
          </label>

          <label className="admin-field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite a senha"
              autoComplete="current-password"
            />
          </label>

          {errorMessage ? <p className="admin-error">{errorMessage}</p> : null}

          <button type="submit" className="admin-submit-button">
            Entrar como admin
          </button>
        </form>
      </section>
    </main>
  )
}

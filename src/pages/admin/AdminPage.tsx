import { useEffect, useMemo, useState } from 'react'
import './admin.css'

type AdminPageProps = {
  expiresAt: number | null
  onLogout: () => void
}

function formatRemainingTime(expiresAt: number | null) {
  if (!expiresAt) {
    return '00:00'
  }

  const diff = Math.max(0, expiresAt - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function AdminPage({ expiresAt, onLogout }: AdminPageProps) {
  const [remainingTime, setRemainingTime] = useState(() => formatRemainingTime(expiresAt))

  useEffect(() => {
    setRemainingTime(formatRemainingTime(expiresAt))

    if (!expiresAt) {
      return
    }

    const interval = window.setInterval(() => {
      setRemainingTime(formatRemainingTime(expiresAt))
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [expiresAt])

  const sessionEndsAt = useMemo(() => {
    if (!expiresAt) {
      return 'Nao informada'
    }

    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(expiresAt)
  }, [expiresAt])

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <p className="admin-eyebrow">Area administrativa</p>
        <h1>Painel do administrador</h1>
        <p className="admin-description">
          A autenticacao desta rota esta sendo feita com as credenciais vindas do
          <code>.env</code>, com sessao local de 30 minutos e auto logout ao expirar.
        </p>
      </section>

      <section className="admin-grid">
        <article className="admin-card">
          <div className="admin-card__header">
            <span>Status da sessao</span>
            <strong>Autenticado</strong>
          </div>

          <h2>Acesso liberado</h2>
          <p>
            Esta area ja esta protegida e pronta para receber os proximos modulos de
            administracao, como criacao de torneios, cadastro de participantes e gestao de
            chaves.
          </p>
        </article>

        <article className="admin-card">
          <div className="admin-card__header">
            <span>Tempo restante</span>
            <strong>{remainingTime}</strong>
          </div>

          <h2>Sessao ativa</h2>
          <p>Expira automaticamente em: {sessionEndsAt}</p>

          <button type="button" className="admin-logout-button" onClick={onLogout}>
            Sair agora
          </button>
        </article>
      </section>
    </main>
  )
}

import { useEffect, useState } from 'react'
import { getAllTournaments, type Tournament } from '../../services/tournaments'
import './tournaments.css'

type LoadState = 'idle' | 'loading' | 'success' | 'error'

function formatDate(date?: string) {
  if (!date) {
    return 'Nao informada'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsedDate)
}

export function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTournaments() {
      try {
        setLoadState('loading')
        const data = await getAllTournaments()

        if (!isMounted) {
          return
        }

        setTournaments(Array.isArray(data) ? data : [])
        setLoadState('success')
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Nao foi possivel carregar os torneios.',
        )
        setLoadState('error')
      }
    }

    loadTournaments()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="tournaments-page">
      <section className="tournaments-hero">
        <p className="tournaments-eyebrow">Teste de integracao</p>
        <h1>Torneios</h1>
        <p className="tournaments-description">
          Esta tela faz o GET em <code>/tournament-api/get-all</code> e lista o retorno de
          forma simples para validar a conexao com a API.
        </p>
      </section>

      <section className="tournaments-content">
        {loadState === 'loading' && (
          <div className="tournaments-state">
            Carregando torneios. Se a API estiver fria no Render, isso pode levar alguns segundos.
          </div>
        )}

        {loadState === 'error' && (
          <div className="tournaments-state tournaments-state--error">
            Erro ao buscar torneios: {errorMessage}
          </div>
        )}

        {loadState === 'success' && tournaments.length === 0 && (
          <div className="tournaments-state">Nenhum torneio retornado pela API.</div>
        )}

        {tournaments.length > 0 && (
          <div className="tournaments-list">
            {tournaments.map((tournament, index) => {
              const tournamentName = tournament.name || `Torneio ${index + 1}`

              return (
                <article
                  key={tournament.id ?? `${tournamentName}-${index}`}
                  className="tournament-card"
                >
                  <div className="tournament-card__header">
                    <span>#{index + 1}</span>
                    <strong>{tournament.statusDescription || 'Status nao informado'}</strong>
                  </div>

                  <h2>{tournamentName}</h2>

                  <dl className="tournament-meta">
                    <div>
                      <dt>ID</dt>
                      <dd>{tournament.id || 'Nao informado'}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{tournament.status ?? 'Nao informado'}</dd>
                    </div>
                    <div>
                      <dt>Criado em</dt>
                      <dd>{formatDate(tournament.creationDate)}</dd>
                    </div>
                    <div>
                      <dt>Data do evento</dt>
                      <dd>{formatDate(tournament.eventDate)}</dd>
                    </div>
                  </dl>

                  <p>Status da API: {tournament.statusDescription || 'Nao informado'}</p>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

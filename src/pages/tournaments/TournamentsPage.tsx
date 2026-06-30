import { useEffect, useState } from 'react'
import { getAllTournaments, type Tournament } from '../../services/tournaments'
import './tournaments.css'

type LoadState = 'idle' | 'loading' | 'success' | 'error'

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
          error instanceof Error ? error.message : 'Nao foi possivel carregar os campeonatos.',
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
        <h1>Campeonatos</h1>
        <p className="tournaments-description">
          Esta tela faz o GET em <code>/tournament-api/get-all</code> e lista o retorno de
          forma simples para validar a conexao com a API.
        </p>
      </section>

      <section className="tournaments-content">
        {loadState === 'loading' && (
          <div className="tournaments-state">
            Carregando campeonatos. Se a API estiver fria no Render, isso pode levar alguns segundos.
          </div>
        )}

        {loadState === 'error' && (
          <div className="tournaments-state tournaments-state--error">
            Erro ao buscar campeonatos: {errorMessage}
          </div>
        )}

        {loadState === 'success' && tournaments.length === 0 && (
          <div className="tournaments-state">Nenhum campeonato retornado pela API.</div>
        )}

        {tournaments.length > 0 && (
          <div className="tournaments-list">
            {tournaments.map((tournament, index) => {
              const tournamentName =
                tournament.name || tournament.title || `Campeonato ${index + 1}`

              return (
                <article
                  key={tournament.id ?? `${tournamentName}-${index}`}
                  className="tournament-card"
                >
                  <div className="tournament-card__header">
                    <span>#{index + 1}</span>
                    <strong>{tournament.status || 'Status nao informado'}</strong>
                  </div>

                  <h2>{tournamentName}</h2>

                  <dl className="tournament-meta">
                    <div>
                      <dt>Formato</dt>
                      <dd>{tournament.format || 'Nao informado'}</dd>
                    </div>
                    <div>
                      <dt>Jogo</dt>
                      <dd>{tournament.game || 'Nao informado'}</dd>
                    </div>
                    <div>
                      <dt>Inicio</dt>
                      <dd>{tournament.startDate || 'Nao informado'}</dd>
                    </div>
                    <div>
                      <dt>Fim</dt>
                      <dd>{tournament.endDate || 'Nao informado'}</dd>
                    </div>
                  </dl>

                  <p>{tournament.description || 'Sem descricao cadastrada.'}</p>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

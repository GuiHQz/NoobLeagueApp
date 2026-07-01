import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getTournamentById,
  type Tournament,
  type TournamentDetailsResponse,
  type TournamentUser,
} from '../../services/tournaments'
import './tournament-details.css'

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

export function TournamentDetailsPage() {
  const { id } = useParams()
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [users, setUsers] = useState<TournamentUser[]>([])
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTournament() {
      if (!id) {
        setErrorMessage('ID do torneio nao informado.')
        setLoadState('error')
        return
      }

      try {
        setLoadState('loading')
        const data = await getTournamentById(id)

        if (!isMounted) {
          return
        }

        setTournament(data.tournament || null)
        setUsers(Array.isArray(data.users) ? data.users : [])
        setLoadState('success')
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Nao foi possivel carregar o torneio.',
        )
        setLoadState('error')
      }
    }

    loadTournament()

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <main className="tournament-details-page">
      <section className="tournament-details-hero">
        <Link to="/torneios" className="tournament-back-link">
          Voltar para torneios
        </Link>

        <p className="tournament-details-eyebrow">Detalhe do torneio</p>
        <h1>{tournament?.name || 'Carregando torneio'}</h1>
        <p className="tournament-details-description">
          Esta tela faz o GET em <code>/user-tournaments-api/tournament/{id || ':id'}</code>{' '}
          para buscar os dados do torneio e os usuarios vinculados a ele.
        </p>
      </section>

      <section className="tournament-details-content">
        {loadState === 'loading' && (
          <div className="tournament-details-state">
            Carregando torneio. Se a API estiver fria no Render, isso pode levar alguns segundos.
          </div>
        )}

        {loadState === 'error' && (
          <div className="tournament-details-state tournament-details-state--error">
            Erro ao buscar torneio: {errorMessage}
          </div>
        )}

        {loadState === 'success' && tournament && (
          <div className="tournament-details-grid">
            <article className="tournament-details-card">
              <div className="tournament-details-card__header">
                <span>{tournament.statusDescription || 'Status nao informado'}</span>
                <strong>Status #{tournament.status ?? 'N/A'}</strong>
              </div>

              <h2>{tournament.name || 'Torneio sem nome'}</h2>

              <dl className="tournament-details-meta">
                <div>
                  <dt>ID</dt>
                  <dd>{tournament.id || 'Nao informado'}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{tournament.status ?? 'Nao informado'}</dd>
                </div>
                <div>
                  <dt>Status description</dt>
                  <dd>{tournament.statusDescription || 'Nao informada'}</dd>
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
            </article>

            <section className="tournament-details-card">
              <div className="tournament-details-card__header">
                <span>Usuarios vinculados</span>
                <strong>{users.length} participante(s)</strong>
              </div>

              {users.length === 0 ? (
                <p className="tournament-empty-users">Nenhum usuario retornado para este torneio.</p>
              ) : (
                <div className="tournament-users-list">
                  {users.map((user, index) => (
                    <article
                      key={user.id ?? `${user.nickname}-${index}`}
                      className="tournament-user-card"
                    >
                      <h3>{user.nickname || `Usuario ${index + 1}`}</h3>

                      <dl className="tournament-user-meta">
                        <div>
                          <dt>ID</dt>
                          <dd>{user.id || 'Nao informado'}</dd>
                        </div>
                        <div>
                          <dt>Criado em</dt>
                          <dd>{formatDate(user.creationDate)}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </section>
    </main>
  )
}

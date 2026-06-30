import './home.css'
import {
  ecosystemStats,
  featuredEvents,
  heroHighlights,
  latestNews,
  leaderboardPreview,
  navigationItems,
  overlayCards,
  sidebarTournaments,
} from './home.mock'

export function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-noise" />
        <header className="topbar">
          <div className="brand-lockup">
            <span className="brand-badge">NL</span>
            <div>
              <p className="eyebrow">Noob League</p>
              <strong>Competitive Platform</strong>
            </div>
          </div>

          <nav className="topbar-nav" aria-label="Principal">
            {navigationItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <a href="#tournaments" className="ghost-button">
              Ver campeonatos
            </a>
            <a href="#broadcast" className="primary-button">
              Assistir ao circuito
            </a>
          </div>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Sistema competitivo para torneios e transmissoes</p>
            <h1>
              A arena da Noob League para campeonatos, ranking e broadcast ao vivo.
            </h1>
            <p className="hero-description">
              Organize torneios no estilo eSports com controle de equipes, participantes,
              formatos flexiveis e um visual pronto para crescer junto com a plataforma.
            </p>

            <div className="hero-cta">
              <a href="#tournaments" className="primary-button">
                Explorar calendario
              </a>
              <a href="#broadcast" className="secondary-button">
                Ver templates OBS
              </a>
            </div>

            <div className="highlight-grid">
              {heroHighlights.map((highlight) => (
                <article key={highlight.label} className="highlight-card">
                  <span>{highlight.label}</span>
                  <p>{highlight.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-sidebar">
            <section className="sidebar-card">
              <div className="sidebar-heading">
                <span>Upcoming tournaments</span>
                <strong>Mock data</strong>
              </div>

              {sidebarTournaments.map((tournament) => (
                <article key={tournament.title} className="mini-tournament-card">
                  <div className="mini-logo">NL</div>
                  <div>
                    <h2>{tournament.title}</h2>
                    <p>{tournament.date}</p>
                    <small>{tournament.mode}</small>
                  </div>
                </article>
              ))}
            </section>

            <section className="sidebar-card news-card">
              <div className="sidebar-heading">
                <span>Latest news</span>
              </div>

              <div className="news-banner">
                <strong>Broadcast pack live</strong>
                <span>Overlays e paginas dedicadas para stream.</span>
              </div>

              <p className="news-date">{latestNews.date}</p>
              <h2>{latestNews.title}</h2>
            </section>
          </aside>
        </div>
      </section>

      <section className="editorial-section" id="circuito">
        <div className="section-copy">
          <p className="eyebrow dark">Sobre a Noob League</p>
          <h2>O ecossistema ideal para times, admins e transmissoes.</h2>
          <p>
            A homepage foi pensada para traduzir o clima de circuito profissional:
            impacto visual, leitura editorial forte e blocos prontos para receber dados
            reais quando os endpoints estiverem integrados.
          </p>
          <p>
            O admin podera criar campeonatos, cadastrar participantes, montar equipes e
            alternar regras entre dupla eliminacao, chave simples ou fases de grupos com
            playoffs.
          </p>

          <div className="editorial-actions">
            <a href="#rankings" className="primary-button dark">
              Ver estatisticas futuras
            </a>
            <a href="#broadcast" className="text-link">
              Conhecer modulo de overlays
            </a>
          </div>
        </div>

        <div className="ecosystem-panel">
          {ecosystemStats.map((stat) => (
            <article key={stat.label} className="ecosystem-card">
              <div className="ecosystem-value">{stat.value}</div>
              <div>
                <h3>{stat.label}</h3>
                <p>{stat.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="events-section" id="tournaments">
        <div className="section-title">
          <p className="eyebrow dark">Upcoming events</p>
          <h2>Campeonatos em destaque</h2>
        </div>

        <div className="events-list">
          {featuredEvents.map((event) => (
            <article key={event.title} className={`event-card event-card--${event.accent}`}>
              <div className="event-visual">
                <div className="event-mark">NL</div>
              </div>
              <div className="event-copy">
                <span>{event.tier}</span>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <small>{event.location}</small>
              </div>
              <div className="event-metric">
                <strong>{event.metric}</strong>
                <span>{event.metricLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-section" id="rankings">
        <div className="stats-copy">
          <p className="eyebrow dark">Rankings e comparativos</p>
          <h2>Estatisticas centralizadas para destacar quem domina a liga.</h2>
          <p>
            A plataforma pode evoluir para consultas de kills, titulos, win rate e
            comparativos diretos entre participantes. Aqui ja deixamos a experiencia
            preparada com uma vitrine de rankings mockados.
          </p>
        </div>

        <div className="leaderboard-grid">
          {leaderboardPreview.map((item) => (
            <article key={item.category} className="leaderboard-card">
              <span>{item.category}</span>
              <h3>{item.leader}</h3>
              <strong>{item.stat}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="broadcast-section" id="broadcast">
        <div className="broadcast-copy">
          <p className="eyebrow">OBS ready</p>
          <h2>URLs especiais para overlays de livestream.</h2>
          <p>
            O site tambem pode servir templates dedicados para cena de navegador no OBS,
            com placares, cards de confronto e paines de apoio ao caster.
          </p>
        </div>

        <div className="overlay-list">
          {overlayCards.map((card) => (
            <article key={card} className="overlay-card">
              <span className="overlay-chip">overlay</span>
              <h3>{card}</h3>
              <p>Ideal para uma URL dedicada carregada em cena de navegador.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

import { apiGet } from './api'

export type Tournament = {
  id?: string
  status?: number
  statusDescription?: string
  creationDate?: string
  name?: string
  eventDate?: string
}

export type TournamentUser = {
  id?: string
  creationDate?: string
  nickname?: string
}

export type TournamentDetailsResponse = {
  tournament?: Tournament
  users?: TournamentUser[]
}

export async function getAllTournaments() {
  return apiGet<Tournament[]>('/tournament-api/get-all')
}

export async function getTournamentById(id: string) {
  return apiGet<TournamentDetailsResponse>(`/user-tournaments-api/tournament/${id}`)
}

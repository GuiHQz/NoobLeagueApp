import { apiGet } from './api'

export type Tournament = {
  id?: string
  status?: number
  statusDescription?: string
  creationDate?: string
  name?: string
  eventDate?: string
}

export async function getAllTournaments() {
  return apiGet<Tournament[]>('/tournament-api/get-all')
} 

import { apiGet } from './api'

export type Tournament = {
  id?: number | string
  name?: string
  title?: string
  description?: string
  game?: string
  format?: string
  status?: string
  startDate?: string
  endDate?: string
}

export async function getAllTournaments() {
  return apiGet<Tournament[]>('/tournament-api/get-all')
} 

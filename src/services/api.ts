const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function apiGet<T>(path: string) {
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL nao foi definida no arquivo .env')
  }

  const response = await fetch(`${apiBaseUrl}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

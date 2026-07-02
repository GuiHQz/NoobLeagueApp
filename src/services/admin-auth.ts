const ADMIN_SESSION_KEY = 'noobleague.admin.session'
const SESSION_DURATION_MS = 30 * 60 * 1000

type StoredAdminSession = {
  expiresAt: number
}

export function getAdminSessionDurationMs() {
  return SESSION_DURATION_MS
}

export function validateAdminCredentials(username: string, password: string) {
  const adminUser = import.meta.env.VITE_USR_ADM
  const adminPassword = import.meta.env.VITE_PASS_ADM

  if (!adminUser || !adminPassword) {
    return {
      isValid: false,
      message: 'Credenciais de admin nao configuradas no arquivo .env.',
    }
  }

  if (username !== adminUser || password !== adminPassword) {
    return {
      isValid: false,
      message: 'Usuario ou senha invalidos.',
    }
  }

  return {
    isValid: true,
    message: '',
  }
}

export function createAdminSession() {
  const expiresAt = Date.now() + SESSION_DURATION_MS
  const session: StoredAdminSession = { expiresAt }
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  return expiresAt
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY)
}

export function getStoredAdminSession() {
  const rawSession = localStorage.getItem(ADMIN_SESSION_KEY)

  if (!rawSession) {
    return null
  }

  try {
    const session = JSON.parse(rawSession) as StoredAdminSession

    if (!session.expiresAt || session.expiresAt <= Date.now()) {
      clearAdminSession()
      return null
    }

    return session
  } catch {
    clearAdminSession()
    return null
  }
}

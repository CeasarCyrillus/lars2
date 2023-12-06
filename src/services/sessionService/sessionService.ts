type Provider = {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string | null
}

type SessionServiceDependencies = {
  provider: Provider
}

export type SessionService = {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T) => void
  has: (key: string) => boolean
}

export const createSessionService = (dependencies: SessionServiceDependencies): SessionService => {
  const {provider} = dependencies
  const get = <T>(key: string) => {
    const item = provider.getItem(key)
    if (item === null) {
      return null
    }

    return JSON.parse(item) as T
  }

  const has = (key: string) => {
    const item = provider.getItem(key)
    return item !== null
  }

  const set = <T>(key: string, value: T) => {
    provider.setItem(key, JSON.stringify(value))
  }

  return {
    get,
    has,
    set
  }
}

export const token_key = "JWT"
type Provider = {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string | null
  removeItem: (key: string) => void
}

type SessionServiceDependencies = {
  provider: Provider
}

export type SessionService = {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T) => void
  has: (key: string) => boolean
  remove: (key: string) => void
}

export const createSessionService = (dependencies: SessionServiceDependencies): SessionService => {
  const {provider} = dependencies
  const get = <T>(key: string) => {
    const item = provider.getItem(key)
    if (item === null) {
      return null
    }

    try {
      return JSON.parse(item) as T
    } catch (e) {
      console.error(e)
      console.error(`trying to parse "${item}" as json, stored in "${key}"`)
      return null
    }
  }

  const has = (key: string) => {
    const item = provider.getItem(key)
    return item !== null
  }

  const set = <T>(key: string, value: T) => {
    provider.setItem(key, JSON.stringify(value))
  }

  const remove = (key: string) => {
    provider.removeItem(key)
  }

  return {
    get,
    has,
    set,
    remove
  }
}

export const token_key = "JWT"
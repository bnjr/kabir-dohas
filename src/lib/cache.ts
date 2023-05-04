interface CacheItem {
  value: any
  expires: number
}

const cache = new Map<string, CacheItem>()

const setCache = (key: string, value: any, ttl: number): void => {
  cache.set(key, {value, expires: Date.now() + ttl})
}

const getCache = (key: string): any => {
  const cachedData = cache.get(key)
  if (!cachedData) return null

  const {value, expires} = cachedData
  if (Date.now() > expires) {
    cache.delete(key)
    return null
  }

  return value
}

export {setCache, getCache}

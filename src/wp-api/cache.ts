
enum Invalidate {
  ALL,
  CURRENT,
  NONE
}
type Arity1<U, T> = (arg: U) => T
type CacheFactory = <U, T>(fn: Arity1<U, T>) => Arity1<U, T>

export const MemoryCache: CacheFactory
  = fn => {
    let cache: any = {}
    return (arg, invalidate = Invalidate.NONE) => {
      const str = JSON.stringify(arg)
      if (invalidate === Invalidate.ALL) {
        cache = {}
      }
      if (invalidate === Invalidate.CURRENT) {
        delete cache[str]   
      }
      if (!cache.hasOwnProperty(str)) {
        cache[str] = fn(arg)
      }
      return cache[str]
    }
  }

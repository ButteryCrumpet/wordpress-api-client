
export type TypeGuard<T> = (data: unknown) => boolean
const isString: TypeGuard<string> = data => typeof data === "string"
const isNumber: TypeGuard<number> = data => typeof data === "number"
const isArray: TypeGuard<any[]> = data => Array.isArray(data)

export function is<T>(data: unknown, guard: TypeGuard<T>): data is T {
  return guard(data)
}

export const safeGet: (path: string[]) => (object: any) => any
 = path => object => path.reduce((prev, key) => prev && prev[key] ? prev[key] : null, object)

export const assert: <T>(guard: TypeGuard<T>) => (data: unknown, message?: string) => T
  = guard => (data, message)=> {
    if (is(data, guard)) {
      return data
    }
    throw new TypeError(`Malformed Input: ${data}. "${message}"`)
  }

export const assertString = assert(isString)
export const assertNumber = assert(isNumber)
export const assertArray = assert(isArray)

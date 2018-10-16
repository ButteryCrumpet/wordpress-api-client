
export type TypeGuard<T> = (data: unknown) => boolean
const isString: TypeGuard<string> = data => typeof data === "string"
const isNumber: TypeGuard<number> = data => typeof data === "number"
const isArray: TypeGuard<any[]> = data => Array.isArray(data)

export function is<T>(data: unknown, guard: TypeGuard<T>): data is T {
  return guard(data)
}

export const assert: <T>(guard: TypeGuard<T>) => (data: unknown) => T
  = guard => data => {
    if (is(data, guard)) {
      return data
    }
    throw new Error(`Malformed Input: ${data}`)
  }

export const assertString = assert(isString)
export const assertNumber = assert(isNumber)
export const assertArray = assert(isArray)

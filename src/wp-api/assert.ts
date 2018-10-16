
export type test<T> = (data: unknown) => boolean
const isString: test<string> = data => typeof data === "string"
const isNumber: test<number> = data => typeof data === "number"
const isArray: test<any[]> = data => Array.isArray(data)

export function is<T>(data: unknown, test: test<T>): data is T {
  return test(data)
}

export const assert: <T>(test: test<T>) => (data: unknown) => T
  = test => data => {
    if (is(data, test)) {
      return data
    }
    throw new Error(`Malformed Input: ${data}`)
  }

export const assertString = assert(isString)
export const assertNumber = assert(isNumber)
export const assertArray = assert(isArray)

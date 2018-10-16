export type Result<T, E> = Ok<T> | Error<E>

interface Ok<T> {
  readonly value: T
}

interface Error<T> {
  type: T
  message: string
}

export function isError<E>(result: Result<any, E>): result is Error<E> {
  return result.hasOwnProperty("type") && result.hasOwnProperty("message")
}

export function isOk<T>(result: Result<T, any>): result is Ok<T> {
  return result.hasOwnProperty("value")
}

export const unwrap: <T, E>(result: Result<T, E>) => T
  = result => {
    if (isError(result)) {
      throw new Error(
        `Attempted to unwrap an error with type: ${result.type}. "${result.message}"`
        )
    }
    return result.value
  }
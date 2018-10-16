import * as Post from "./post"
import * as Query from "./query"
import { Result } from "./result"
import * as Term from "./term"

export enum ErrorType {
  NO_RESPONSE,
  PARSE_ERROR,
  QUERY_ERROR,
  FETCH_ERROR,
}

type Callback<T> = (result: Result<T, ErrorType>) => any

class NetworkError extends Error {}

export const PostQuery: (base: string) => (callback: Callback<Post.BasicPost[]>) => (args: Query.PostQueryArgs) => void
  = base => callback => args => {
    const url = Query.buildPostQuery(args, base)
    fetch(url)
      .then(toJson)
      .then(parsePosts)
      .then(data => callback({value: data}))
      .catch((error: Error) => callback(getError(error)))
  }

export const TaxQuery = () => "TODO"

const toJson: (response: Response) => Promise<any>
  = response => {
    if (!response) {
     throw new NetworkError("No Response")
    }
    if (!response.ok) {
     throw new Error(response.statusText)
    }
    return response.json()
  }

const parsePosts: (data: any) => Post.BasicPost[]
  = data => {
    data = Array.isArray(data) ? data : [data]
    return data.map((post: any) => Post.fromAPIObject(post))
  }

const getError: (error: Error) => {type: ErrorType, message: string}
 = error => {
    let type = ErrorType.FETCH_ERROR
    if (error instanceof NetworkError) {
      type = ErrorType.NO_RESPONSE
    }
    if (error instanceof TypeError) {
      type = ErrorType.PARSE_ERROR
    }
    return {type, message: error.message}
 }
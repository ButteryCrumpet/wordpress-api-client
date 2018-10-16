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

export class NetworkError extends Error {}

export const PostQuery: (base: string) => (callback: Callback<Post.BasicPost[]>) => (args: Query.PostQueryArgs) => void
  = base => callback => args => {
    const url = Query.buildPostQuery(args, base)
    fetch(url)
      .then((response: Response) => {
        if (!response) {
         throw new NetworkError("No Response")
        }
        if (!response.ok) {
         throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((data: any) => {
        if (!Array.isArray(data)) {
          data = [data]
        }
        const posts = data.map((post: any) => {
          return Post.fromAPIObject(post);
        });
        callback({value: posts})
      })
      .catch((error: Error) => {
        let type = ErrorType.FETCH_ERROR
        if (error instanceof NetworkError) {
          type = ErrorType.NO_RESPONSE
        }
        if (error instanceof TypeError) {
          type = ErrorType.PARSE_ERROR
        }
        callback({type, message: error.message})
      })
  }
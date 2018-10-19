import { MemoryCache } from "./cache"
import * as Post from "./post"
import * as Query from "./query"
import { Result } from "./result"
import * as Term from "./term"

export enum ErrorType {
  NO_RESPONSE = "no_response",
  PARSE_ERROR = "parse_error",
  QUERY_ERROR = "query_error",
  FETCH_ERROR = "fetch_error",
}
export type Query<T, Q> = (callback: Callback<T>) => (args: Q) => void

type QueryFactory
  = <Q, T>(parser: Parser<T>, queryBuilder: QueryBuilder<Q>)
  => (base: string) 
  => Query<T, Q>

export type Callback<T> = (result: Result<WPResponse<T>, ErrorType>) => any
type Parser<T> = (input: WPResponse<any>) => WPResponse<T>
type QueryBuilder<T> = (input: T, base: string) => string
interface QueryMeta {
  count: number | undefined,
  totalPages: number | undefined
}
export interface WPResponse<T> {
  meta: QueryMeta,
  content: T
}

class NetworkError extends Error {}

const query: QueryFactory
 = (parser, queryBuilder) => base => callback => args => {
  const url = queryBuilder(args, base)
  cachedFetch(url)
    .then(toJson)
    .then(parser)
    .then(data => callback({value: data}))
    .catch((error: Error) => callback(getError(error)))
 }

const cachedFetch = MemoryCache((url: string) => fetch(url))

const toJson: (response: Response) => Promise<WPResponse<any>>
  = response => {
    if (!response) {
     throw new NetworkError("No Response")
    }
    if (!response.ok) {
     throw new Error(response.statusText)
    }   
    return response.json().then(data => {
      return {
        meta: {
          count: parseInt(getHeaderOrDefault(response, "x-wp-total", "-1"), 10),
          totalPages: parseInt(getHeaderOrDefault(response, "x-wp-totalpages", "-1"), 10)
        },
        content: data
      }
    })
  }

const parsePosts: Parser<Post.BasicPost[]>
  = r => {
    const data = Array.isArray(r.content) ? r.content : [r.content]
    return {...r, content: data.map((term: any) => Post.fromApiObject(term))}
  }

const parseTerms: Parser<Term.Term[]>
  = r => {
    const data = Array.isArray(r.content) ? r.content : [r.content]
    return {...r, content: data.map((term: any) => Term.fromApiObject(term))}
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

const getHeaderOrDefault: (resp: Response, name: string, def: string) => string
 = (r, n, d) => {
   const maybeVal = r.headers.get(n)
   return maybeVal ? maybeVal : d
 }

// Queries

export const PostQuery = query(parsePosts, Query.buildPostQuery)
export const TermQuery = query(parseTerms, Query.buildTermQuery)
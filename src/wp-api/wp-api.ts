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

type Callback<T> = (result: Result<T, ErrorType>) => any
type Parser<T> = (input: any) => T
type QueryBuilder<T> = (input: T, base: string) => string

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

const parsePosts: Parser<Post.BasicPost[]>
  = data => {
    data = Array.isArray(data) ? data : [data]
    return data.map((post: any) => Post.fromAPIObject(post))
  }

const parseTerms: Parser<Term.Term[]>
  = data => {
    data = Array.isArray(data) ? data : [data]
    return data.map((term: any) => Term.fromApiObject(term))
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

// Queries

export const PostQuery = query(parsePosts, Query.buildPostQuery)
export const TermQuery = query(parseTerms, Query.buildTermQuery)
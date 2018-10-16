export enum Order {
  DESC = "desc",
  ASC = "asc"
}

export enum PostOrderBy {
  AUTHOR = "author",
  DATE = "date",
  ID = "id",
  INCLUDE = "include",
  MODIFIED = "modified",
  PARENT = "parent",
  RELEVANCE = "relevance",
  SLUG = "slug",
  TITLE = "title"
}

type PostQueryArgValue = string | number | number[] | Order | PostOrderBy | undefined
export interface PostQueryArgs {
  [key: string]: PostQueryArgValue
  type?: string
  page?: number
  per_page?: number
  p?: number
  slug?: string
  search?: string
  after?: string
  categories?: number[]
  categories_exclude?: number[]
  tags?: number[]
  tags_exclude?: number[]
  author?: number[]
  author_exclude?: number[]
  exclude?: number[]
  include?: number[]
  offset?: number
  order?: Order
  orderby?: PostOrderBy
  status?: string
}
export enum TermOrderBy {
  ID = "id",
  INCLUDE = "include",
  NAME = "name",
  SLUG = "slug",
  TERM_GROUP = "term_group",
  DESCRIPTION = "description",
  COUNT = "count"
}

type TermQueryArgValue
  = string
  | boolean
  | number
  | number[]
  | Order 
  | TermOrderBy 
  | undefined

export interface TermQueryArgs {
  [key: string]: TermQueryArgValue
  type: string
  term_id?: number
  page?: number
  per_page?: number
  search?: string
  exclude?: number[]
  include?: number[]
  order?: Order
  orderby?: TermOrderBy
  hide_empty?: boolean
  parent?: number
  slug?: string
}

type QueryArgs
  = PostQueryArgs
  | TermQueryArgs

type QueryArgValue
  = PostQueryArgValue
  | TermQueryArgValue

const apiPath = "/wp-json/wp/v2"

export const buildPostQuery: (query: PostQueryArgs, base: string) => string
  = (query, base) => {
    if (!query.type) {
      query.type = "posts"
    }
    return `${base}${apiPath}/${query.type}/${query.p ? query.p : ""}?_embed${queryVars(query, ["p", "type"])}`
  }

export const buildTermQuery: (query: TermQueryArgs, base: string) => string
  = (query, base) => {
    const id = query.term_id ? query.term_id : ""
    return `${base}${apiPath}/${query.type}/${id}?_embed${queryVars(query, ["p", "type"])}`
  }

const queryVars: (args: QueryArgs, skip: string[]) => string
  = (args, skip) => Object.keys(args).reduce((acc: string, key: string) => {
      if (skip.indexOf(key) > -1) {
        return acc
      }
      return `${acc}&${argToString(key, args[key])}`
    }, "")

const argToString: (key: string, val: QueryArgValue) => string
  = (key, val) => {
    if (!val) {
      return ""
    }
    if (typeof val === "string" || typeof val === "number") {
      return `${key}=${val}`
    }
    if (Array.isArray(val)) {
      return `${key}=${val.join(",")}`
    }
    return key
  }
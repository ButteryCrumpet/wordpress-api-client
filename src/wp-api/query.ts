export enum Order {
  DESC = "desc",
  ASC = "asc"
}

export enum OrderBy {
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

type PostQueryArgValue = string | number | number[] | Order | OrderBy | undefined
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
  orderby?: OrderBy
  status?: string
}

const apiPath = "/wp-json/wp/v2"

export const buildPostQuery: (query: PostQueryArgs, base: string) => string
  = (query, base) => {
    if (!query.type) {
      query.type = "posts"
    }
    return `${base}${apiPath}/${query.type}/${query.p ? query.p : ""}?_embed${queryVars(query, ["p", "type"])}`
  }

const queryVars: (args: PostQueryArgs, skip: string[]) => string
  = (args, skip) => Object.keys(args).reduce((acc: string, key: string) => {
      if (skip.indexOf(key) > -1) {
        return acc
      }
      return `${acc}&${key}=${argToString(args[key])}`
    }, "")

const argToString: (arg: PostQueryArgValue) => string
  = arg => {
    if (!arg) {
      return ""
    }
    if (typeof arg === "string") {
      return arg
    }
    if (Array.isArray(arg)) {
      return arg.join(",")
    }
    if (typeof arg === "number") {
      return String(arg)
    }
    return arg
  }
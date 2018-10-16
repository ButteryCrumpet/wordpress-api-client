import {assertString, assertNumber, assertArray} from "./assert"
import * as Term from "./term"
import * as Media from "./media"

export interface BasicPost {
  readonly id: number
  readonly date: Date
  readonly modified: Date
  readonly slug: string
  readonly status: string
  readonly type: string
  readonly title: string
  readonly content: string
  readonly excerpt: string
  readonly categories: Term.BasicTerm[]
  readonly tags: Term.BasicTerm[]
  thumbnail?: Media.BasicMedia
}

export const fromAPIObject: (input: any) => BasicPost
  = input => {
    const terms = termFactory(filterEmpty(assertArray(input._embedded["wp:term"])))
    const post: BasicPost = {
      id: assertNumber(input.id),
      slug: assertString(input.slug),
      status: assertString(input.status),
      type: assertString(input.type),
      title: assertString(input.title.rendered),
      content: assertString(input.content.rendered),
      excerpt: assertString(input.excerpt.rendered),
      date: new Date(),
      modified: new Date(),
      categories: filterCategory(terms),
      tags: filterTag(terms),
    }
    if (input._embedded["wp:featuredmedia"]["0"]) {
      post.thumbnail = Media.fromApiObject(input._embedded["wp:featuredmedia"]["0"])
    }
    return post;
  }

const map: <T, R>(f: (item: T) => R) => (arr: T[]) => R[]
  = func => input => input.map(func)

const filter: <T>(f: (item: T) => boolean) => (arr: T[]) => T[]
  = func => input => input.filter(func)

const filterEmpty = filter((arr: any[]) => arr.length > 0)


const toBasicTerm = (input: any) => Term.fromApiObject(input['0'])
const termFactory = map(toBasicTerm)

const filterCategory = filter(Term.isCategory)
const filterTag = filter(Term.isTag)
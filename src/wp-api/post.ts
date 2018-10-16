import { assertArray, assertNumber, assertString, safeGet } from "./assert"
import * as Media from "./media"
import * as Term from "./term"

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
  readonly categories: Term.EmbedTerm[]
  readonly tags: Term.EmbedTerm[]
  thumbnail?: Media.BasicMedia
}

export const fromAPIObject: (input: any) => BasicPost
  = input => {
    const categoryData = extractCategories(input)
    const tagData = extractTags(input)
    const post: BasicPost = {
      categories: termFactory(assertArray(categoryData, "In post categories")),
      content: assertString(input.content.rendered, "In post content"),
      date: new Date(assertString(input.date)),
      excerpt: assertString(input.excerpt.rendered, "In post excerpt"),
      id: assertNumber(input.id, "In post ID"),
      modified: new Date(assertString(input.modified)),
      slug: assertString(input.slug, "In post slug"),
      status: assertString(input.status, "In post status"),
      tags: termFactory(assertArray(tagData, "In post tags")),
      title: assertString(input.title.rendered, "In post title"),
      type: assertString(input.type, "In post type"),
    }
    const thumb = extractThumb(input)
    if (thumb) {
      post.thumbnail = Media.fromApiObject(input._embedded["wp:featuredmedia"]["0"])
    }
    return post;
  }

const map: <T, R>(f: (item: T) => R) => (arr: T[]) => R[]
  = func => input => input.map(func)

const toEmbedTerm = (input: any) => Term.fromEmbedApiObject(input)
const termFactory = map(toEmbedTerm)

const extractCategories = safeGet(["_embedded", "wp:term", "0"])
const extractTags = safeGet(["_embedded", "wp:term", "1"])
const extractThumb = safeGet(["_embedded", "wp:featuredmedia", "0"])
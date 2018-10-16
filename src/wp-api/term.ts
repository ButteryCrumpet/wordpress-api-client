import {assertNumber, assertString} from "./assert"

export interface EmbedTerm {
  readonly id: number
  readonly link: string
  readonly name: string
  readonly slug: string
  readonly taxonomy: string
}

interface Term {
  readonly id: number
  readonly count: number
  readonly link: string
  readonly name: string
  readonly slug: string
  readonly description: string
  readonly parent: number
}

export const fromApiObject: (input: any) => Term
 = input => ({
    count: assertNumber(input.count),
    description: assertString(input.description),
    id: assertNumber(input.id),
    link: assertString(input.link),
    name: assertString(input.name),
    parent: assertNumber(input.parent),
    slug: assertString(input.slug),
    type: assertString(input.taxonomy),
 })

export const fromEmbedApiObject: (input: any) => EmbedTerm
  = input => ({
      id: assertNumber(input.id, "In embed term id"),
      link: assertString(input.link, "In embed term link"),
      name: assertString(input.name, "In embed term name"),
      slug: assertString(input.slug, "In embed term slug"),
      taxonomy: assertString(input.taxonomy, "In embed term taxonomy")
  })

export const isTax: (tax: string) => (term: EmbedTerm) => boolean
  = tax => term => term.taxonomy === tax

export const isCategory = isTax("category")
export const isTag = isTax("post_tag")
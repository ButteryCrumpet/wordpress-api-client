import {assertString, assertNumber} from "./assert"

export interface BasicTerm {
  readonly id: number
  readonly link: string
  readonly name: string
  readonly slug: string
  readonly type: string
}

interface FullTerm {
  id: number
  count: number
  link: string
  name: string
  slug: string
  description: string
  parent: number
}

export const fromApiObject: (input: any) => BasicTerm
  = input => ({
    id: assertNumber(input.id),
    link: assertString(input.link),
    name: assertString(input.name),
    slug: assertString(input.slug),
    type: assertString(input.taxonomy)
  })

export const isType: (type: string) => (term: BasicTerm) => boolean
  = type => term => term.type === type

export const isCategory = isType("category")
export const isTag = isType("post_tag")
import {assertString, assertNumber, assertArray} from "./assert"

export interface BasicMedia {
  id: number
  date: Date
  slug: string
  caption: string
  alt: string
  type: string
  mime: string
  details: MediaDetails
  source: string
}

interface MediaDetails {
  width: number
  height: number
  sizes: Sizes
}

interface Sizes { [key: string]: Size }

interface Size {
  file: string
  width: number
  height: number
  source: string
  mime: string
}

export const fromApiObject: (media: any) => BasicMedia
 = media => ({
    id: assertNumber(media.id),
    date: new Date(assertString(media.date)),
    slug: assertString(media.slug),
    caption: assertString(media.caption.rendered),
    alt: assertString(media.alt_text),
    type: assertString(media.media_type),
    mime: assertString(media.mime_type),
    details: mediaDetailsFromApiObject(media.media_details),
    source: assertString(media.source_url)
 })

const mediaDetailsFromApiObject: (details: any) => MediaDetails
 = details => ({
   width: assertNumber(details.width),
   height: assertNumber(details.height),
   sizes: sizesFromApiObject(details.sizes)
 })

 const sizesFromApiObject: (sizes: any) => Sizes
  = sizes => Object.keys(sizes).reduce((acc: Sizes, size: any) => {
    acc[size] = sizeFromApiObject(sizes[size])
    return acc
  }, Object.create(null))

const sizeFromApiObject: (size: any) => Size
  = size => ({
    file: assertString(size.file),
    width: assertNumber(size.width),
    height: assertNumber(size.height),
    source: assertString(size.source_url),
    mime: assertString(size.mime_type)
  })
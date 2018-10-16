import { assertArray, assertNumber, assertString } from "./assert"

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
    alt: assertString(media.alt_text),
    caption: assertString(media.caption.rendered),
    date: new Date(assertString(media.date)),
    details: mediaDetailsFromApiObject(media.media_details),
    id: assertNumber(media.id),
    mime: assertString(media.mime_type),
    slug: assertString(media.slug),
    source: assertString(media.source_url),
    type: assertString(media.media_type),
 })

const mediaDetailsFromApiObject: (details: any) => MediaDetails
 = details => ({
   height: assertNumber(details.height),
   sizes: sizesFromApiObject(details.sizes),
   width: assertNumber(details.width),
 })

 const sizesFromApiObject: (sizes: any) => Sizes
  = sizes => Object.keys(sizes).reduce((acc: Sizes, size: any) => {
    acc[size] = sizeFromApiObject(sizes[size])
    return acc
  }, Object.create(null))

const sizeFromApiObject: (size: any) => Size
  = size => ({
    file: assertString(size.file),
    height: assertNumber(size.height),
    mime: assertString(size.mime_type),
    source: assertString(size.source_url),
    width: assertNumber(size.width),
  })
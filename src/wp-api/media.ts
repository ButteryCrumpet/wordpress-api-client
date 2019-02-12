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
const log = (item: any) => { console.log(item); return item }
export const fromApiObject: (media: any) => BasicMedia
 = media => ({
    alt: assertString(media.alt_text, "alt must be string"),
    caption: assertString(media.caption.rendered, "caption must be string"),
    date: new Date(assertString(media.date, "date must be string")),
    details: mediaDetailsFromApiObject(media.media_details),
    id: assertNumber(media.id, "id must be number"),
    mime: assertString(media.mime_type, "mime type must be string"),
    slug: assertString(media.slug, "slug must be string"),
    source: assertString(media.source_url, "source must be string"),
    type: assertString(media.media_type, "type must be string"),
 })

const mediaDetailsFromApiObject: (details: any) => MediaDetails
 = details => ({
   height: assertNumber(parseInt(details.height, 10), "height must be number"),
   sizes: sizesFromApiObject(details.sizes),
   width: assertNumber(parseInt(details.width, 10), "width must be number"),
 })

 const sizesFromApiObject: (sizes: any) => Sizes
  = sizes => Object.keys(sizes).reduce((acc: Sizes, size: any) => {
    acc[size] = sizeFromApiObject(sizes[size])
    return acc
  }, {})

const sizeFromApiObject: (size: any) => Size
  = size => ({
    file: assertString(size.file, "file must be string"),
    height: assertNumber(parseInt(size.height, 10), "height must be string"),
    mime: assertString(size.mime_type, "mime type must be string"),
    source: assertString(size.source_url, "source_url must be string"),
    width: assertNumber(parseInt(size.width, 10), "width must be string"),
  })
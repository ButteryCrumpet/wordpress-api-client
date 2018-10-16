import * as Media from "../src/wp-api/media"
import { embedMedia } from "./test-data/media"

describe("media deserializer", () => {

  test("deserializes embedded media", () => {
    expect(Media.fromApiObject(embedMedia.in)).toEqual(embedMedia.expected)
  })
})
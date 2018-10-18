import * as Term from "../src/wp-api/term"
import { embedCategory, fullCategory } from "./test-data/terms"

describe("Term deserializing", () => {

  test("deserializes an embeded term", () => {
    expect(Term.fromEmbedApiObject(embedCategory.in)).toEqual(embedCategory.expected)
  })

  test("deserializes a full term", () => {
    expect(Term.fromApiObject(fullCategory.in)).toEqual(fullCategory.expected)
  })
  
})
import * as Term from "../src/wp-api/term"
import { embedCategory } from "./test-data/terms"

describe("Term deserializing", () => {

  test("deserializes an embeded term", () => {
    expect(Term.fromEmbedApiObject(embedCategory.in)).toEqual(embedCategory.expected)
  })
  
})
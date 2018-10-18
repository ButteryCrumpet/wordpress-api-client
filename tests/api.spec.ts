import FetchMock from "fetch-mock"
import "node-fetch"
import * as WP from "../src/wp-api/wp-api"
import { post } from "./test-data/posts"

FetchMock
  .get("www.test.com/wp-json/wp/v2/posts/?_embed", {
    body: [ post.in ],
    status: 200,
  })
  .get("www.test.com/wp-json/wp/v2/fails/?_embed", {
    body: [ "bad data" ],
    status: 200,
  })
  .get("www.test.com/wp-json/wp/v2/404s/?_embed", {
    status: 404,
  })
  .get("www.test.com/wp-json/wp/v2/500s/?_embed", {
    status: 500,
  })

describe("post fetch test", () => {

  test("it runs on 200", done => {
    const test = (result: any) => {
      expect(result.value).toEqual([post.expected])
      done()
    }
    WP.PostQuery("www.test.com")(test)({type: "posts"})
  })

  test("error on malformed data", done => {
    const test = (result: any) => {
      expect(result.type).toEqual(WP.ErrorType.PARSE_ERROR)
      done()
    }
    WP.PostQuery("www.test.com")(test)({type: "fails"})
  })

  test("error on http error", done => {
    const test = (result: any) => {
      expect(result.type).toEqual(WP.ErrorType.FETCH_ERROR)
      done()
    }
    WP.PostQuery("www.test.com")(test)({type: "404s"})
  })

  test("error on server error", done => {
    const test = (result: any) => {
      expect(result.type).toEqual(WP.ErrorType.FETCH_ERROR)
      done()
    }
    WP.PostQuery("www.test.com")(test)({type: "500s"})
  })

})
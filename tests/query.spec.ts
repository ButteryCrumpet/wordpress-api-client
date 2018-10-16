import "jest"
import * as WPQuery from "../src/wp-api/query"

describe("post query builder", () => {

  test("builds post query", () => {
    expect(WPQuery.buildPostQuery({}, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/posts/?_embed")
  })

  test("builds post query with post type", () => {
    const query = {
      type: "posts"
    }
    expect(WPQuery.buildPostQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/posts/?_embed")
  })

  test("builds custom post query", () => {
    const query = {
      type: "custom-post"
    }
    expect(WPQuery.buildPostQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/custom-post/?_embed")
  })

  test("builds single post query", () => {
    const query = {
      p: 204,
      type: "posts",
    }
    expect(WPQuery.buildPostQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/posts/204?_embed")
  })

  test("builds post query with args", () => {
    const query = {
      page: 2,
      per_page: 10,
    }
    expect(WPQuery.buildPostQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/posts/?_embed&page=2&per_page=10")
  })

  test("builds post query with enums", () => {
    const query = {
      order: WPQuery.Order.ASC,
      order_by: WPQuery.PostOrderBy.SLUG
    }
    expect(WPQuery.buildPostQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/posts/?_embed&order=asc&order_by=slug")
  })

  test("builds term query", () => {
    const query = {
      type: "categories"
    }
    expect(WPQuery.buildTermQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/categories/?_embed")
  })

  test("builds term query", () => {
    const query = {
      type: "categories"
    }
    expect(WPQuery.buildTermQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/categories/?_embed")
  })

  test("builds boolean value correctly", () => {
    const query = {
      hide_empty: true,
      type: "categories",
    }
    expect(WPQuery.buildTermQuery(query, "test.com"))
      .toEqual("test.com/wp-json/wp/v2/categories/?_embed&hide_empty")
  })

})
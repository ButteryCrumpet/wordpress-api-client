import * as Post from "../src/wp-api/post"
import { post } from "./test-data/posts"

describe("Post deserializer", () => {

  test("deserializes post", () => {
    expect(Post.fromAPIObject(post.in)).toEqual(post.expected)
  })

})
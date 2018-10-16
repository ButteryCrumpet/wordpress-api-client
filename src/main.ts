import * as WP from "./wp-api/post"
import {assertArray} from "./wp-api/assert"


window.fetch("https://www.starwars.com/news/wp-json/wp/v2/posts?_embed")
  .then(response => {
    if (!response) {
      console.log("empty response")
      return 0
    }
    return response.json()
  })
  .then(data => {
    const posts = assertArray(data).map((post: any) => {
      return WP.fromAPIObject(post)
    })
    console.log(posts)
  })
  .catch(error => console.log(error))  
  

import * as Post from "../../src/wp-api/post"
import { embedMedia } from "./media"
import { embedCategory, embedTag } from "./terms"

const postIn = {
  id:	138776,
  date:	"2018-10-15T08:00:06",
  date_gmt:	"2018-10-15T15:00:06",
  guid:	{
    rendered:	"https://starwars.admin.mwp.disney.io?p=138776"
  },
  modified:	"2018-10-12T16:06:41",
  modified_gmt:	"2018-10-12T23:06:41",
  slug:	"star-wars-deep-dive-why-…to-the-imperial-academy",
  status:	"publish",
  type:	"post",
  link:	"https://www.starwars.com…-to-the-imperial-academy",
  title: {
    rendered:	"The <em>Star Wars</em> D…o the Imperial Academy?"
  },
  content: {	
    protected: false,
    rendered:	"<p><em>The </em>Star War…/span></span></em></p>",
  },
  excerpt: {
    protected: false,
    rendered:	"<p>For many across the g… a powerful draw.</p>",
  },
  author:	123,
  featured_media:	138803,
  comment_status:	"closed",
  ping_status:	"closed",
  sticky:	false,
  template:	"",
  format:	"standard",
  meta:	[],
  categories: [ 1629, 4937 ],
  _embedded: {
    "wp:featuredmedia": [embedMedia.in],
    "wp:term": [[embedCategory.in],[embedTag.in]]
  }
}

const postExpected: Post.BasicPost = {
  id:	138776,
  date:	new Date("2018-10-15T08:00:06"),
  modified:	new Date("2018-10-12T16:06:41"),
  slug:	"star-wars-deep-dive-why-…to-the-imperial-academy",
  status:	"publish",
  type:	"post",
  title: "The <em>Star Wars</em> D…o the Imperial Academy?",
  content: "<p><em>The </em>Star War…/span></span></em></p>",
  excerpt: "<p>For many across the g… a powerful draw.</p>",
  categories: [embedCategory.expected],
  tags: [embedTag.expected],
  thumbnail: embedMedia.expected
}

export const post = { in: postIn, expected: postExpected }
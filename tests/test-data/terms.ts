
export const embedCategory = {
  in: {
    id:	1629,
    link:	"https://www.starwars.com/news/category/characters-and-histories",
    name:	"Characters + Histories",
    slug:	"characters-and-histories",
    taxonomy:	"category",
  },
  expected: {
    id:	1629,
    link:	"https://www.starwars.com/news/category/characters-and-histories",
    name:	"Characters + Histories",
    slug:	"characters-and-histories",
    taxonomy:	"category",
  }
}

export const fullCategory = {
  in: {
    id:	1,
    count:	4,
    description:	"",
    link:	"http://seiki.p-server.info/admin/news/category/uncategorized/",
    name:	"Uncategorized",
    slug:	"uncategorized",
    taxonomy:	"category",
    parent:	0,
    meta:	[],
  },
  expected: {
    id: 1,
    count: 4,
    link: "http://seiki.p-server.info/admin/news/category/uncategorized/",
    name: "Uncategorized",
    slug: "uncategorized",
    description: "",
    parent: 0,
    type: "category"
  }
}

export const embedTag = {
  in: {
    id:	5193,
    link:	"https://www.starwars.com…/the-star-wars-deep-dive",
    name:	"The Star Wars Deep Dive",
    slug:	"the-star-wars-deep-dive",
    taxonomy:	"post_tag",
  },
  expected: {
    id:	5193,
    link:	"https://www.starwars.com…/the-star-wars-deep-dive",
    name:	"The Star Wars Deep Dive",
    slug:	"the-star-wars-deep-dive",
    taxonomy:	"post_tag",
  }
}

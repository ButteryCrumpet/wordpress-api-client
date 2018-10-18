A Wordpress api client
======================

## Description

A very simple Javascript client for accessing a Wordpress site's API \
Currently only offers access to Posts and Terms following the standard schema \
(very unstable)

## Documentation

1. Instantiate a WPClient instance passing in your wordpress site's url
2. Call either WPClient::getPosts or WPClient::getTerms passing in a callback and args
3. Receive Result<T, Err> and check with isOk / isErr or unwrap() to get value

### -- Notes

* Currently getPosts and getTerms are *curried* 
    * To call them either pass in callback then args like so: 
        ```typescript
        WPClient::getPosts(callback)(args)
        ``` 
    * Or save to a variable: 
        ```typescript
        const query = WPClient::getPosts(callback)
        query(args)
        ``` 
* Uses fetch and promises, use polyfills if supporting legacy browsers
* Caches fetch requests in memory during a session

### -- Example

```typescript
import { WPClient, unwrap } from "pp-wapi"

// Instantiate client
const client = new WPClient("www.testwp.com")

// Callback to run on request completion
const callback = result => console.log(unwrap(result))

// Post query args, see below for list of possible values
const args = {
    page: 2,
    categories: [ 1, 4 ]
}
client.getPosts(callback)(args)

```

### -- Post Query Possible Args

```typescript
PostQueryArgs {
  type?: string
  page?: number
  per_page?: number
  p?: number
  slug?: string
  search?: string
  after?: string
  categories?: number[]
  categories_exclude?: number[]
  tags?: number[]
  tags_exclude?: number[]
  author?: number[]
  author_exclude?: number[]
  exclude?: number[]
  include?: number[]
  offset?: number
  order?: Order
  orderby?: PostOrderBy
  status?: string
}
```

### -- Term Query Possible Args

```typescript
TermQueryArgs {
  type: string
  term_id?: number
  page?: number
  per_page?: number
  search?: string
  exclude?: number[]
  include?: number[]
  order?: Order
  orderby?: TermOrderBy
  hide_empty?: boolean
  parent?: number
  slug?: string
}
```
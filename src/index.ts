import { BasicPost } from "./wp-api/post";
import { PostQueryArgs, TermQueryArgs } from "./wp-api/query";
import { Term } from "./wp-api/term";
import { PostQuery, Query, TermQuery } from "./wp-api/wp-api";

export class WPClient {
  public getPosts: Query<BasicPost[], PostQueryArgs>;
  public getTerms: Query<Term[], TermQueryArgs>;

  private base: string;
  constructor(base: string) {
    this.base = base;
    this.getPosts = PostQuery(base);
    this.getTerms = TermQuery(base);
  }
}

export { ErrorType } from "./wp-api/wp-api";
export { Result, isError, isOk, unwrap } from "./wp-api/result";
export { BasicPost } from "./wp-api/post";
export { EmbedTerm, Term } from "./wp-api/term";
export {
  Order,
  PostOrderBy,
  PostQueryArgs,
  TermQueryArgs,
} from "./wp-api/query";
export default WPClient;

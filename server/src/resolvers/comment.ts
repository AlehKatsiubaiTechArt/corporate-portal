import { PaginatedArgs, PaginatedResponse } from "../utils/Paginated";
import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Post, PostModel } from "../entities/Post";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import { Comment, CommentModel, NewComment } from "../entities/Comment";

@ArgsType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@InputType()
export class PostSearchArgs {
  @Field({ nullable: true })
  title?: string;
}

@ObjectType()
export class PaginatedComments extends PaginatedResponse<Comment>(Comment) {
}

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => String)
  contentSnippet(@Root() comment: Comment) {
    return comment.text.slice(0, 50);
  }

  @Mutation(type => Comment)
  async createComment(
    @Args() { text, post }: NewComment,
    @Ctx() { user }: Context
  ) {
    return await new CommentModel({ author: user._id, post, text }).populate('author').populate('post').save();
  }
}

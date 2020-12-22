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
import { generateSearchQuery } from "../utils";
import { CommentModel } from "../entities/Comment";
import { PaginatedComments } from "./comment";

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
export class PaginatedPosts extends PaginatedResponse<Post>(Post) {
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  contentSnippet(@Root() post: Post) {
    return post.text.slice(0, 50);
  }

  @FieldResolver(() => PaginatedComments)
  async comments(
    @Root() post,
    @Args() { take, skip }: PaginatedArgs
  )/* : Promise<PaginatedComments> */ {
    const items = await CommentModel
      .find({ post: post.id })
      .skip(skip)
      .limit(take)
      .exec();
    return {
      items
    }
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Args() { take, skip }: PaginatedArgs
  )/* : Promise<PaginatedPosts> */ {
    const posts = await PostModel
      .find()
      .limit(take)
      .skip(skip)
      .populate('creator')
      .populate('likedBy')
      .exec();
    return {
      items: posts,
      hasMore: true,
    };
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id", () => ID) id: string): Promise<Post | undefined> {
    return await PostModel.findById(id).populate('creator').populate('likedBy');
  }

  @Mutation(() => Post)
  @Authorized()
  async likePost(
    @Arg('id', () => ID) id: string,
    @Ctx() { user }: Context
  ): Promise<Post> {
    return await PostModel
      .findByIdAndUpdate(id, { $addToSet: { likedBy: user._id } }, { new: true })
      .populate('creator').populate('likedBy');
  }

  @Mutation(() => Post)
  @Authorized()
  async dislikePost(
    @Arg('id', () => ID) id: string,
    @Ctx() { user }: Context
  ): Promise<Post> {
    return await PostModel
      .findByIdAndUpdate(id, { $pull: { likedBy: user._id } }, { new: true })
      .populate('creator').populate('likedBy');
  }

  @Mutation(() => Post)
  @Authorized()
  async createPost(
    @Args() { title, text }: PostInput,
    @Ctx() { user }: Context
  ): Promise<Post> {
    return await new PostModel({ title, text, creator: user._id }).populate('creator').populate('likedBy').save();
  }

  @Mutation(() => Post, { nullable: true })
  @Authorized()
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: Context
  ): Promise<Post | null> {
    return await PostModel.findByIdAndUpdate(id, {
      title,
      text
    }, { new: true }).populate('creator').populate('likedBy');
  }

  @Mutation(() => Post)
  @Authorized()
  async deletePost(
    @Arg("id", () => ID) id: string,
    @Ctx() { req }: Context
  ): Promise<Post> {
    return await PostModel.findByIdAndDelete(id).populate('creator').populate('likedBy').exec();
    // return await PostModel.findByIdAndDelete(id).exec();
  }
}

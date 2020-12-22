import { ObjectType, Field, Int, ID, InputType, ArgsType } from "type-graphql";
import { User } from "./User";
import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Document } from "mongoose";
import { Post } from "./Post";


@ArgsType()
export class NewComment {
  @Field()
  text: string;

  @Field()
  post: string;
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Comment {
  @Field(type => ID)
  _id: string;

  @Field(type => ID)
  get id(): string {
    return this._id;
  }

  @Field()
  @prop()
  text?: string;

  @Field(() => Post)
  @prop({ ref: () => Post })
  post: Ref<Post>;

  @Field(() => User)
  @prop({ ref: () => User })
  author: Ref<User>;

  @Field(() => [User])
  @prop({
    ref: () => User
  })
  likedBy: Ref<User>[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @prop()
  deletedAt: Date;
}

export const CommentModel = getModelForClass(Comment);

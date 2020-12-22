import { ObjectType, Field, Int, ID } from "type-graphql";
import { User } from "./User";
import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Comment } from "./Comment";

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Post {
  @Field(type => ID)
  _id?: string;

  @Field(type => ID)
  get id(): string {
    return this._id;
  }

  @Field()
  @prop()
  title?: string;

  @Field()
  @prop()
  text?: string;

  /* @Field()
  @prop()
  creatorId: number; */

  @Field(() => User)
  @prop({ ref: () => User })
  creator: Ref<User>;

  @prop({
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id',
    justOne: false
  })
  comments: Ref<Comment>[];

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

export const PostModel = getModelForClass(Post);

import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID, ArgsType, InputType } from "type-graphql";
import { Post } from "./Post";
import { Length, IsDateString } from "class-validator";

@ObjectType()
@ArgsType()
@InputType()
export class UserProfile {

  @Field({ nullable: true })
  @prop()
  name?: string

  @Field({ nullable: true })
  @prop()
  surname?: string

  @Field({ nullable: true })
  @prop()
  avatar?: string

  @Field({ nullable: true })
  @Length(1, 255)
  @prop()
  city?: string

  @IsDateString()
  @Field({ nullable: true })
  birth?: Date

  @Length(1, 255)
  @Field({ nullable: true })
  @prop()
  position?: string

  @Length(1, 255)
  @Field({ nullable: true })
  @prop()
  education?: string

  @Length(1, 12)
  @Field({ nullable: true })
  @prop()
  cell?: string

  @Length(1, 255)
  @Field({ nullable: true })
  @prop()
  skype?: string

  @Length(1, 255)
  @Field({ nullable: true })
  @prop()
  department?: string

  @Length(1, 255)
  @Field({ nullable: true })
  @prop()
  description?: string

  @Field(() => [String], { nullable: true })
  @prop()
  skills?: string[]
}

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
export class User extends UserProfile {
  @Field(type => ID)
  _id?: string;

  @Field(type => ID)
  get id(): string {
    return this._id;
  }

  @Field()
  @prop({ unique: true })
  email!: string;

  @prop()
  password: string;

  // @Field(() => [Post])
  @prop({
    ref: 'Post',
    foreignField: 'creator',
    localField: '_id',
    justOne: false
  })
  posts: Ref<Post>[] = [];

  @Field(() => [User])
  @prop({ ref: () => User })
  friends: Ref<User>[];

  @Field(() => [String])
  @prop()
  roles: string[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  @prop()
  deletedAt: Date;
}

export const UserModel = getModelForClass(User);
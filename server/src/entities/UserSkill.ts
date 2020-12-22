import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID, ArgsType, InputType, Root } from "type-graphql";
import { Post } from "./Post";
import { Length, IsDateString } from "class-validator";
import { Skill } from "./Skill";
import { User } from "./User";

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
export class UserSkill {
  @Field(type => ID)
  _id?: string;

  @Field(type => ID)
  get id(): string {
    return this._id;
  }

  @Field(() => Skill)
  @prop({ ref: () => Skill })
  skill: Ref<Skill>[];

  @Field(() => User)
  @prop({ ref: () => User })
  user: Ref<User>[];
}

export const UserSkillModel = getModelForClass(UserSkill);
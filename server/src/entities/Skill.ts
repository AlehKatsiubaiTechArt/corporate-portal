import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID, ArgsType, InputType } from "type-graphql";
import { Post } from "./Post";
import { Length, IsDateString } from "class-validator";

@ObjectType()
export class Skill {
  @Field(type => ID)
  _id?: string;

  @Field(type => ID)
  get id(): string {
    return this._id;
  }

  @Field(type => ID)
  @prop({ unique: true })
  name?: string;
}

export const SkillModel = getModelForClass(Skill);

import { IsEmail, Length } from "class-validator";
import { InputType, Field, ArgsType } from "type-graphql";
@ArgsType()
export class UsernamePasswordInput {
  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  @Length(8, 255)
  password: string;
}

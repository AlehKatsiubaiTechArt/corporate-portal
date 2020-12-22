import { GraphQLScalarType } from "graphql";
import { ArgsType, Field, Int, ClassType, ObjectType, FieldResolver, Root, Args, Info } from "type-graphql";

@ArgsType()
export class PaginatedArgs {
  @Field(type => Int, { nullable: true })
  skip: number = 0;

  @Field(type => Int, { nullable: true })
  take: number = 20;
}

export function PaginatedResponse<TItem>(
  TItem: ClassType<TItem> | GraphQLScalarType | String | Number | Boolean,
) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(type => [TItem])
    items?: TItem[];

    /* @Field(type => TItem)
    async items?(
      @Root() root,
      @Info() info
    ): Promise<TItem[]> {
      console.log(this, root, info);
      return root;
    } */

    @Field(type => Int, { nullable: true })
    total?: number;

    @Field({ nullable: true })
    hasMore?: boolean;
  }
  return PaginatedResponseClass;
}
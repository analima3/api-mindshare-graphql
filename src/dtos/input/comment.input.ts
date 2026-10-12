import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  content!: string;
}

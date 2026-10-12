import { Field, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model.js";
import { IdeaModel } from "./idea.model.js";

@ObjectType()
export class VoteModel {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  ideaId!: string;

  @Field(() => UserModel)
  user?: UserModel;

  @Field(() => IdeaModel)
  idea?: IdeaModel;
}

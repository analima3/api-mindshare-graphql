import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model.js";
import { IdeaModel } from "./idea.model.js";

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  authorId!: string;

  @Field(() => UserModel, { nullable: true })
  author?: UserModel;

  @Field(() => String)
  content!: string;

  @Field(() => ID)
  ideaId!: string;

  @Field(() => IdeaModel, { nullable: true })
  idea?: IdeaModel;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model.js";
import { CommentModel } from "./comment.model.js";
import { VoteModel } from "./vote.model.js";

@ObjectType()
export class IdeaModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  authorId!: string;

  @Field(() => UserModel, { nullable: true })
  author?: UserModel;

  @Field(() => [CommentModel], { nullable: true })
  comments?: CommentModel[];

  @Field(() => [VoteModel], { nullable: true })
  votes?: VoteModel[];

  @Field(() => Number, { nullable: true })
  countVotes?: number;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

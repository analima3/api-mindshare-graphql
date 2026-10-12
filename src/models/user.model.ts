import { Role } from "@prisma/client";
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from "type-graphql";

registerEnumType(Role, { name: "Role" });

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Role)
  role!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  password?: string | null;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}

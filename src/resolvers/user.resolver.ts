import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";
import { Auth } from "../middlewares/auth.middleware.js";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input.js";

@Resolver(() => UserModel)
@UseMiddleware(Auth)
export class UserResolver {
  private readonly userService = new UserService();

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput,
  ): Promise<UserModel> {
    return this.userService.create(data);
  }

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findById(id);
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
  ): Promise<UserModel> {
    return this.userService.update(id, data);
  }

  @Mutation(() => UserModel)
  async deleteUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.delete(id);
  }
}

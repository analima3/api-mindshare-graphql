import { Resolver, Mutation, Arg } from "type-graphql";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input.js";
import { LoginOutput, RegisterOutput } from "../dtos/output/auth.output.js";
import { AuthService } from "../services/auth.service.js";

@Resolver()
export class AuthResolver {
  private readonly authService = new AuthService();

  @Mutation(() => LoginOutput)
  async login(
    @Arg("credentials", () => LoginInput) credentials: LoginInput,
  ): Promise<LoginOutput> {
    return this.authService.login(credentials);
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }
}

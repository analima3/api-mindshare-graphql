import {
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Auth } from "../middlewares/auth.middleware.js";
import { IdeaModel } from "../models/idea.model.js";
import { GqlUser } from "../graphql/decorators/user.decorator.js";
import { User } from "@prisma/client";
import { CommentService } from "../services/comment.service.js";
import { CommentModel } from "../models/comment.model.js";
import { CreateCommentInput } from "../dtos/input/comment.input.js";
import { IdeaService } from "../services/idea.service.js";
import { UserModel } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => CommentModel)
@UseMiddleware(Auth)
export class CommentResolver {
  private readonly commentService = new CommentService();
  private readonly ideaService = new IdeaService();
  private readonly userService = new UserService();

  @Mutation(() => CommentModel)
  async createComment(
    @Arg("ideaId", () => String) ideaId: string,
    @Arg("data", () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: User | null,
  ): Promise<CommentModel> {
    if (!user) {
      throw new Error("User not authenticated.");
    }

    return this.commentService.create({
      ideaId,
      authorId: user.id,
      data,
    });
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.ideaService.findById(comment.ideaId);
  }

  @FieldResolver(() => UserModel)
  async author(@Root() comment: CommentModel): Promise<UserModel> {
    return this.userService.findById(comment.authorId);
  }
}

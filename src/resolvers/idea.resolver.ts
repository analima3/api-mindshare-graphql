import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { UserModel } from "../models/user.model.js";
import { Auth } from "../middlewares/auth.middleware.js";
import { IdeaModel } from "../models/idea.model.js";
import { IdeaService } from "../services/idea.service.js";
import { GqlUser } from "../graphql/decorators/user.decorator.js";
import { User } from "@prisma/client";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input.js";
import { UserService } from "../services/user.service.js";
import { CommentModel } from "../models/comment.model.js";
import { CommentService } from "../services/comment.service.js";
import { VoteService } from "../services/vote.service.js";
import { VoteModel } from "../models/vote.model.js";

@Resolver(() => IdeaModel)
@UseMiddleware(Auth)
export class IdeaResolver {
  private readonly ideaService = new IdeaService();
  private readonly userService = new UserService();
  private readonly commentService = new CommentService();
  private readonly voteService = new VoteService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => CreateIdeaInput) data: CreateIdeaInput,
    @GqlUser() user: User | null,
  ): Promise<IdeaModel> {
    if (!user) {
      throw new Error("User not authenticated.");
    }

    return this.ideaService.create(data, user.id);
  }

  @Mutation(() => IdeaModel)
  async updateIdea(
    @Arg("data", () => UpdateIdeaInput) data: UpdateIdeaInput,
    @Arg("id", () => String) id: string,
  ): Promise<IdeaModel> {
    return this.ideaService.update(id, data);
  }

  @Query(() => [IdeaModel])
  async findAllIdea(): Promise<IdeaModel[]> {
    return this.ideaService.findAll();
  }

  @Mutation(() => Boolean)
  async deleteIdea(@Arg("id", () => String) id: string): Promise<boolean> {
    this.ideaService.delete(id);

    return true;
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findById(idea.authorId);
  }

  @FieldResolver(() => [CommentModel])
  async comments(@Root() idea: IdeaModel): Promise<CommentModel[]> {
    return this.commentService.findAllByIdeaId(idea.id);
  }

  @FieldResolver(() => [VoteModel])
  async votes(@Root() idea: IdeaModel): Promise<VoteModel[]> {
    return this.voteService.findAllByIdeaId(idea.id);
  }

  @FieldResolver(() => Number)
  async countVotes(@Root() idea: IdeaModel): Promise<number> {
    return this.voteService.count(idea.id);
  }
}

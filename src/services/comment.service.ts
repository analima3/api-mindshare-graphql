import { CreateCommentInput } from "../dtos/input/comment.input.js";
import { UpdateIdeaInput } from "../dtos/input/idea.input.js";
import { prismaClient } from "../libs/primas.js";

interface CreateComment {
  ideaId: string;
  authorId: string;
  data: CreateCommentInput;
}

export class CommentService {
  async create({ ideaId, authorId, data }: CreateComment) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id: ideaId,
      },
    });

    if (!idea) {
      throw new Error("Idea not found.");
    }

    const newComment = await prismaClient.comment.create({
      data: {
        content: data.content,
        authorId,
        ideaId,
      },
    });

    return newComment;
  }

  async findAllByIdeaId(id: string) {
    return await prismaClient.comment.findMany({
      where: {
        ideaId: id,
      },
    });
  }
}

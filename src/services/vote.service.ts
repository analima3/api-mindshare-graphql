import { prismaClient } from "../libs/primas.js";

interface CreateVote {
  userId: string;
  ideaId: string;
}

export class VoteService {
  async toggle({ userId, ideaId }: CreateVote) {
    const vote = await prismaClient.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    if (vote) {
      await prismaClient.vote.delete({
        where: {
          userId_ideaId: {
            userId,
            ideaId,
          },
        },
      });

      return false;
    }

    await prismaClient.vote.create({
      data: {
        userId,
        ideaId,
      },
    });

    return true;
  }

  async findAllByIdeaId(ideaId: string) {
    return await prismaClient.vote.findMany({
      where: {
        ideaId,
      },
    });
  }

  async count(ideaId: string) {
    return await prismaClient.vote.count({
      where: {
        ideaId,
      },
    });
  }
}

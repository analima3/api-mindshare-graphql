import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input.js";
import { prismaClient } from "../libs/primas.js";

export class IdeaService {
  async create(data: CreateIdeaInput, authorId: string) {
    const newIdea = await prismaClient.idea.create({
      data: {
        ...data,
        authorId,
      },
    });

    return newIdea;
  }

  async update(id: string, data: UpdateIdeaInput) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) {
      throw new Error("Idea not found.");
    }

    const updatedIdea = await prismaClient.idea.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return updatedIdea;
  }

  async findAll() {
    return await prismaClient.idea.findMany();
  }

  async findById(id: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) {
      throw new Error("Idea not found.");
    }

    return idea;
  }

  async delete(id: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id,
      },
    });

    if (!idea) {
      throw new Error("Idea not found.");
    }

    return await prismaClient.idea.delete({
      where: {
        id,
      },
    });
  }
}

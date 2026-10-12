import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input.js";
import { prismaClient } from "../libs/primas.js";

export class UserService {
  async create(data: CreateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new Error("User already exists.");
    }

    const newUser = await prismaClient.user.create({
      data,
    });

    return newUser;
  }

  async findAll() {
    return await prismaClient.user.findMany();
  }

  async findById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async update(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async delete(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}

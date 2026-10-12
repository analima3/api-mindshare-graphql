import { User } from "@prisma/client";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input.js";
import { prismaClient } from "../libs/primas.js";
import { comparePassword, hashPassword } from "../utils/hash-password.js";
import { signJwt } from "../utils/jwt.js";

export class AuthService {
  async login(credentials: LoginInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const passwordMatch = comparePassword(credentials.password, user.password!);

    if (!passwordMatch) {
      throw new Error("Wrong password.");
    }

    return this.generateToken(user);
  }

  async register(data: RegisterInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new Error("User with same e-mail already exists.");
    }

    const passwordHash = await hashPassword(data.password);

    const createdUser = await prismaClient.user.create({
      data: {
        ...data,
        password: passwordHash,
      },
    });

    return this.generateToken(createdUser);
  }

  generateToken(user: User) {
    const token = signJwt({ id: user.id, email: user.email }, "15m");
    const refreshToken = signJwt({ id: user.id, email: user.email }, "1d");

    return { token, refreshToken, user };
  }
}

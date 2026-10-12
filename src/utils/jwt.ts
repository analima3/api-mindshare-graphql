import type { Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
};

export function signJwt(
  payload: JwtPayload,
  expiresIn?: NonNullable<SignOptions["expiresIn"]>,
) {
  const secretKey = process.env.JWT_SECRET as Secret;

  return jwt.sign(payload, secretKey, {
    expiresIn: expiresIn ?? "7d",
  });
}

export function verifyJwt(token: string) {
  const secretKey = process.env.JWT_SECRET as Secret;

  return jwt.verify(token, secretKey) as JwtPayload;
}

import { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { verifyJwt } from "../../utils/jwt.js";

export interface GraphqlContext {
  user: string | null;
  token: string | null;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
}

export async function buildContext({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> {
  const authorization = req.headers.authorization;

  const token = authorization?.startsWith("Bearer")
    ? authorization.substring("Bearer ".length)
    : null;

  if (!token) {
    return { user: null, token: null, req, res };
  }

  try {
    const payload = verifyJwt(token);

    return { user: payload.id, token, req, res };
  } catch {
    return { user: null, token: null, req, res };
  }
}

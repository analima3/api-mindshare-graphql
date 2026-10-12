import "reflect-metadata";

import express from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServer } from "@apollo/server";
import { AuthResolver } from "./resolvers/auth.resolver.js";
import { UserResolver } from "./resolvers/user.resolver.js";
import { buildContext } from "./graphql/context/index.js";
import { IdeaResolver } from "./resolvers/idea.resolver.js";
import { CommentResolver } from "./resolvers/comment.resolver.js";
import { VoteResolver } from "./resolvers/vote.resolver.js";

const allowedOrigins = ["http://localhost:5173"];

async function bootstrap() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      IdeaResolver,
      CommentResolver,
      VoteResolver,
    ],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("CORS: Origin not allowed."));
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  );

  app.listen({ port: 4000 }, () => {
    console.log("Server running on port 4000");
  });
}

bootstrap();

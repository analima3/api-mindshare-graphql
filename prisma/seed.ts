import { prismaClient } from "../src/libs/primas.js";
import { hashPassword } from "../src/utils/hash-password.js";

async function main() {
  const password = await hashPassword("mindshare123");

  const ana = await prismaClient.user.upsert({
    where: { email: "ana@example.com" },
    update: {},
    create: {
      id: "seed-user-ana",
      name: "Ana Lima",
      email: "ana@example.com",
      password,
      role: "owner",
    },
  });

  const joao = await prismaClient.user.upsert({
    where: { email: "joao@example.com" },
    update: {},
    create: {
      id: "seed-user-joao",
      name: "Joao Silva",
      email: "joao@example.com",
      password,
      role: "member",
    },
  });

  const idea = await prismaClient.idea.upsert({
    where: { id: "seed-idea-books" },
    update: {},
    create: {
      id: "seed-idea-books",
      title: "Rede social de livros",
      description: "Uma comunidade para compartilhar leituras e recomendacoes.",
      authorId: ana.id,
    },
  });

  await prismaClient.comment.upsert({
    where: { id: "seed-comment-books" },
    update: {},
    create: {
      id: "seed-comment-books",
      content: "Adorei a ideia!",
      authorId: joao.id,
      ideaId: idea.id,
    },
  });

  await prismaClient.vote.upsert({
    where: {
      userId_ideaId: {
        userId: joao.id,
        ideaId: idea.id,
      },
    },
    update: {},
    create: {
      userId: joao.id,
      ideaId: idea.id,
    },
  });

  console.log("Seed executada com sucesso.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

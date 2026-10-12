# Mindshare API

API GraphQL do Mindshare, construída com Express, Apollo Server, TypeGraphQL e Prisma. A autenticação usa JWT e os dados são persistidos em SQLite.

## Requisitos

- Node.js 22 ou superior
- npm

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo de ambiente:

   ```bash
   cp .env.example .env
   ```

3. Configure o `.env`:

   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="uma-chave-secreta-local"
   ```

4. Gere o cliente Prisma e aplique as migrations:

   ```bash
   npm run db:generate
   npx prisma migrate deploy
   ```

## Executando

Servidor de desenvolvimento, com reinício automático:

```bash
npm run dev
```

A API ficará disponível em [http://localhost:4000/graphql](http://localhost:4000/graphql).

Para validar os tipos sem gerar arquivos:

```bash
npm run typecheck
```

O schema GraphQL é gerado em `schema.graphql` durante a inicialização do servidor.

## Autenticação

As mutations `login` e `register` não exigem autenticação. Ambas retornam `token`, `refreshToken` e `user`.

Nas operações protegidas, envie o token JWT no header HTTP:

```http
Authorization: Bearer <token>
```

Tokens ausentes ou inválidos fazem o backend retornar um erro GraphQL de autenticação.

## Exemplos

### Registrar usuário

```graphql
mutation {
  register(
    data: {
      name: "Ana Lima"
      email: "ana@example.com"
      password: "senha-segura"
    }
  ) {
    token
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
```

### Fazer login

```graphql
mutation {
  login(credentials: { email: "ana@example.com", password: "senha-segura" }) {
    token
    refreshToken
    user {
      id
      name
      email
      role
    }
  }
}
```

### Listar ideias

Envie o header `Authorization` e execute:

```graphql
query {
  findAllIdea {
    id
    title
    description
    author {
      id
      name
    }
    countVotes
    createdAt
  }
}
```

### Criar uma ideia

```graphql
mutation {
  createIdea(
    data: { title: "Nova ideia", description: "Uma ideia para a comunidade" }
  ) {
    id
    title
    description
    authorId
  }
}
```

## Operações disponíveis

### Públicas

- `login(credentials: LoginInput!)`
- `register(data: RegisterInput!)`

### Protegidas

- Usuários: `createUser`, `getUser`, `listUsers`, `updateUser`, `deleteUser`
- Ideias: `findAllIdea`, `createIdea`, `updateIdea`, `deleteIdea`
- Comentários: `createComment`
- Votos: `toggleVote`

Os tipos, campos e argumentos completos estão em [schema.graphql](schema.graphql).

## Estrutura principal

```text
src/
├── graphql/       # Contexto e decorators GraphQL
├── middlewares/   # Middleware de autenticação
├── models/        # Tipos GraphQL
├── resolvers/     # Queries e mutations
├── services/      # Regras de negócio
└── utils/         # JWT e hash de senha
prisma/
├── migrations/    # Histórico do banco
└── schema.prisma  # Modelos Prisma
```

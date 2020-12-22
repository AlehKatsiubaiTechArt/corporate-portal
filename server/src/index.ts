import "reflect-metadata";
import "dotenv-safe/config";
import { __prod__, COOKIE_NAME } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import cors from "cors";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";
import { createUserLoader } from "./utils/createUserLoader";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { connect } from "mongoose";
import jwt from "express-jwt";
import { authChecker } from "./auth";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { CommentResolver } from "./resolvers/comment";

const MONGO_DB_URL = "mongodb://localhost:27017/corporate-portal";

const main = async () => {
  const connection = await connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

  const app = express();
  const path = "/graphql";

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  /* app.use(
    session({
      name: COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  ); */

  app.use(
    path,
    jwt({
      secret: process.env.SESSION_SECRET,
      algorithms: ['HS256'],
      credentialsRequired: false,
    }),
  );
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver, CommentResolver],
      emitSchemaFile: {
        path: __dirname + "/schema.gql",
        commentDescriptions: true,
        sortedSchema: false,
      },
      authChecker,
      authMode: 'null',
      validate: false,
    }),
    context: ({ req, res }: ExpressContext & { req: { user: User | null } }) => ({
      req,
      res,
      user: req.user,
      /* userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(), */
    }),
  });

  apolloServer.applyMiddleware({
    app,
    path,
    cors: false,
  });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("🚀 Server started on localhost:4000");
  });
};

main()
  .catch((err) => {
    console.error(err);
  });

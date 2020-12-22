import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Session } from "express-session";
import { createUserLoader } from "./utils/createUserLoader";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { User } from "./entities/User";

export type Context = {
  req: Request;
  res: Response;
  user: User | null,
  /* userLoader: ReturnType<typeof createUserLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>; */
};



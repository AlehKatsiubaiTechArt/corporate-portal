import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.user) {
    throw new Error("not authenticated");
  }

  return next();
};

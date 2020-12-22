import { UserModel } from "../entities/User";
import { AuthChecker } from "type-graphql";
import { Context } from "../types";

export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  let { user } = context;
  user = context.user = await UserModel.findById(user?._id).exec();

  if (roles.length === 0) {
    // if `@Authorized()`, check only is user exist
    return user != undefined;
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false;
  }
  if (user.roles.some(role => roles.includes(role))) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};

export enum Roles {
  ADMIN,
}

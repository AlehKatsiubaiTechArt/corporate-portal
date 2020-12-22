import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
  FieldResolver,
  Root,
  Args,
  Authorized,
  ArgsType,
  ID,
  ClassType,
  Int,
  InputType,
  ResolverInterface,
} from 'type-graphql'
import { Context } from '../types'
import { User, UserModel, UserProfile } from '../entities/User'
import argon2, { limits } from 'argon2'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants'
import { UsernamePasswordInput } from './UsernamePasswordInput'
import { validateRegister } from '../utils/validateRegister'
import { sendEmail } from '../utils/sendEmail'
import { v4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { Ref } from '@typegoose/typegoose'
import { Post, PostModel } from '../entities/Post'
import { GraphQLScalarType } from 'graphql'
import { PaginatedArgs, PaginatedResponse } from '../utils/Paginated'
import { PaginatedPosts, PostSearchArgs } from './post'
import { generateSearchQuery } from '../utils'

@ObjectType()
class PaginatedUser extends PaginatedResponse<User>(User) {

}

@ObjectType()
class AuthorizedUser {
  @Field()
  token: string;

  @Field(type => User)
  user: User;
}

@ArgsType()
class UserProfileArgs extends UserProfile {

}

@InputType()
class UserSearchArgs extends UserProfile {
  @Field()
  email: string;
}

@Resolver(User)
export class UserResolver {
  /* @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: Context) {
    // this is the current user and its ok to show them their own email
    if (req.session.userId === user._id) {
      return user.email;
    }
    // current user wants to see someone elses email
    return "";
  } */

  @FieldResolver(() => PaginatedPosts)
  async posts(
    @Root() user,
    @Args() { take, skip }: PaginatedArgs,
    @Arg('post', { nullable: true }) post: PostSearchArgs = {}
  ): Promise<PaginatedPosts> {
    const searchQuery = generateSearchQuery(post);
    const items = await PostModel
      .find({ ...searchQuery, creator: user.id })
      .skip(skip)
      .limit(take)
      .exec();
    return {
      items
    }
  }

  @Query(returns => PaginatedUser, { nullable: true })
  async users(
    @Args() { take, skip }: PaginatedArgs,
    @Arg('user', { nullable: true }) user: UserSearchArgs
  ): Promise<PaginatedUser> {
    const searchQuery = generateSearchQuery(user);
    return {
      items: await UserModel
        .find(searchQuery)
        .limit(take)
        .skip(skip)
        .exec(),
      hasMore: true
    }
  }

  @Query(returns => User, { nullable: true })
  async user(
    @Arg('id') id: string
  ): Promise<User> {
    return await UserModel
      .findById(id)
      .exec();
  }

  @Authorized()
  @Mutation(() => User)
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { user }: Context
  ): Promise<User> {
    const valid = await argon2.verify(user.password, oldPassword)
    if (!valid) {
      throw new Error('Invalid password!')
    }
    return await UserModel.findByIdAndUpdate(
      user._id,
      { password: await argon2.hash(newPassword) },
      { new: true }
    ).exec();
  }

  @Authorized()
  @Mutation(() => User)
  async updateUserProfile(
    @Args() updatedUserProfile: UserProfileArgs,
    @Ctx() { req, user }: Context
  ): Promise<User> {
    return await UserModel.findByIdAndUpdate(
      user._id,
      updatedUserProfile,
      { new: true }
    ).exec();
  }

  @Authorized()
  @Mutation(() => User)
  async makeFriend(
    @Arg('id', () => ID) userId: string,
    @Ctx() { user }: Context
  ): Promise<User> {
    return await UserModel
      .findByIdAndUpdate(user._id, { $addToSet: { friends: userId } }, { new: true });
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  currentUser(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => AuthorizedUser)
  async register(
    @Args() { email, password }: UsernamePasswordInput,
    @Ctx() { res }: Context
  ): Promise<AuthorizedUser> {
    const hashedPassword = await argon2.hash(password)
    try {
      const user = await new UserModel({
        email,
        password: hashedPassword,
      }).save()

      const token = jwt.sign({ _id: user._id }, process.env.SESSION_SECRET);
      return {
        token,
        user
      };
    } catch (err) {
      return null
    }
  }

  @Mutation(() => AuthorizedUser)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<AuthorizedUser> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('That user doesn\'t exist')
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      throw new Error('Incorrect password')
    }
    const token = jwt.sign({ _id: user._id }, process.env.SESSION_SECRET, { expiresIn: "10d" });
    return {
      token,
      user
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME)
        if (err) {
          console.log(err)
          resolve(false)
          return
        }

        resolve(true)
      })
    )
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePage(@Ctx() { req, res }: Context) {
    
  }
}

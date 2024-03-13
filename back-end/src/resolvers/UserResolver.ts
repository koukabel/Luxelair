import {
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Field,
  ArgsType,
} from "type-graphql";
import User from "../entities/user";
import { MinLength, IsEmail } from "class-validator";
import { Context } from "..";
import { setUserSessionIdInCookie } from "../utils/cookie";

@ArgsType()
export class editOrCreateUser {
  @Field({ nullable: true })
  firstName!: string;

  @Field({ nullable: true })
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  // @Field()
  // role: string;

  @Field()
  @MinLength(12)
  password!: string;
}

@ArgsType()
export class signIn {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.getUsers();
  }

  @Mutation(() => User)
  createUser(@Args() args: editOrCreateUser) {
    return User.createNewUser(args);
  }
  @Mutation(() => User)
  async signIn(@Args() args: signIn, @Ctx() context: Context): Promise<User> {
    const { user, session } = await User.login(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    if (!user) {
      throw new Error(`Vous n'êtes pas connecté`);
    }
    return user;
  }
}

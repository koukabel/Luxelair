import {
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  Field,
  ArgsType,
  Arg,
  ID,
} from "type-graphql";
import User from "../entities/user";
import { MinLength, IsEmail } from "class-validator";
import { Context } from "..";
import { setUserSessionIdInCookie } from "../utils/cookie";

@ArgsType()
export class editOrCreateUser {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  @IsEmail()
  email!: string;

  // @Field()
  // role: string;

  @Field()
  @MinLength(12)
  password!: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  description?: string;
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
  updateUser(@Arg("id", () => ID) id: string, @Args() args: editOrCreateUser) {
    return User.editUserInfo(id, args);
  }

  @Mutation(() => User)
  async signIn(@Args() args: signIn, @Ctx() context: Context): Promise<User> {
    const { user, session } = await User.login(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return user as User;
  }

  @Query(() => User)
  user(@Arg("id", () => ID) id: string) {
    return User.getUserById(id);
  }
}

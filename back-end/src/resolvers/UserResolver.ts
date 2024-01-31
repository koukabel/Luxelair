import { Args, ArgsType, Field, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/user";
import { MinLength,IsEmail } from "class-validator";

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
  

@Resolver()
export class UserResolver {
    @Query(() =>[User])
    users(){
        return User.getUsers(); 
    }

    @Mutation(() => User)
    createUser(@Args() args: editOrCreateUser) {
      return User. createNewUser(args);
    }
}
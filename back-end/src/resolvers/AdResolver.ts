import { Args, ArgsType, Field, Float, Int, Mutation, Query, Resolver } from "type-graphql";
import Ad from "../entities/ad";
import { MinLength, Min } from "class-validator";

@ArgsType()
export class editOrCreateAd {
    @Field()
    @MinLength(2)
    title!: string;
  
    @Field({ nullable: true })
    description!: string;
  
    @Field()
    location!: string;
  
    @Field(() => Float)
    @Min(0)
    price!: number;
  
    @Field({ nullable: true })
    image!: string;
  
    // @Field({ nullable: true })
    // equipment!: string;
  
    // @Field()
    // type!: string;

  }

@Resolver()
export class AdResolver {
    @Query(() =>[Ad])
    ads(){
        return Ad.getAds(); 
    }

    @Mutation(() => Ad)
    createAd(@Args() args: editOrCreateAd) {
      return Ad.createAd(args);
    }
}



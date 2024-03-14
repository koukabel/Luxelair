import { Arg, Args, ArgsType, Field, Float, ID, InputType, Mutation, Query, Resolver, registerEnumType } from "type-graphql";
import Ad, { EquipmentTypeEnum, HousingTypeEnum } from "../entities/ad";
import { MinLength, Min } from "class-validator";


registerEnumType(HousingTypeEnum, {
  name: "HousingTypeEnum",
});

registerEnumType(EquipmentTypeEnum, {
  name: "EquipmentTypeEnum",
});

@InputType()
export class EquipmentValueInput {
    selectedValues?: string[];
}

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

    @Field(() => [String], { nullable: true })
    selectedEquipmentValues?: string[];

    @Field(() => HousingTypeEnum, { nullable: true })
    type!: HousingTypeEnum;
}

@Resolver()
export class AdResolver {
    @Query(() => [Ad])
    getAds() {
        return Ad.getAds(); 
    }

    @Query(() => Ad)
	ad(@Arg("id", () => ID) id: string) {
		return Ad.getAdById(id);
	}

    @Query(() => [HousingTypeEnum])
     getHousingTypes() {
      return Object.values(HousingTypeEnum);
    }

    @Mutation(() => Ad)
     createAd(@Args() args: editOrCreateAd) {
      return Ad.createAd(args);

  }
}

console.log("hi")
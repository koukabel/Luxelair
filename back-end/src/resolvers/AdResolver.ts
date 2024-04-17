import {
  Arg,
  Args,
  ArgsType,
  Field,
  Float,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
  registerEnumType,
} from "type-graphql";
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

  @Field()
  description!: string;

  @Field()
  location!: string;

  @Field(() => Float)
  @Min(0)
  price!: number;

  @Field()
  image!: string;

  @Field(() =>[String], { nullable: true })
  equipements!: string[];

  @Field(() => HousingTypeEnum, { nullable: true })
  housingType!: HousingTypeEnum;
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

  @Query(() => [String])
  getEquipmentTypes() {
    return Object.values(EquipmentTypeEnum);
  }


  @Query(() => [Ad])
  ads() {
    return Ad.getAds();
  }

  @Query(() => [Ad])
  search(@Arg("location") location: string) {
    return Ad.searchAd(location);
  }

  @Mutation(() => Ad)
  createAd(@Args() args: editOrCreateAd) {
    return Ad.createAd(args);
  }
}
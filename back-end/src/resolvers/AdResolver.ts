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
  // @Field({ nullable: true })
  // equipment!: string;

  @Field(() => HousingTypeEnum, { nullable: true })
  type!: HousingTypeEnum;
  // @Field()
  // type!: string;
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
  @Query(() => [Ad])
  ads() {
    return Ad.getAds();
  }

  @Query(() => [Ad])
  search(@Arg("title") title: string) {
    return Ad.searchAd(title);
  }

  @Mutation(() => Ad)
  createAd(@Args() args: editOrCreateAd) {
    return Ad.createAd(args);
  }
}

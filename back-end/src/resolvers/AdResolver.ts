import {
  Arg,
  Args,
  ArgsType,
  Field,
  Float,
  Ctx,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
  registerEnumType,
  createMethodDecorator
} from "type-graphql";
import { Context } from "..";
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

  @Field({ nullable: true })
  image!: string;

  @Field(() => [String], { nullable: true })
  equipements!: string[];

  @Field(() => HousingTypeEnum, { nullable: true })
  housingType!: HousingTypeEnum;

  @Field()
  userId!: string;
}

export function AdOwner() {
  return createMethodDecorator(async ({ args, context }, next) => {
    if (await (context as Context).user?.isAdOwner(args.id)) {
      return next();
    }
    throw new Error("You must own the ad to perform this action.");
  });
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
  search(@Arg("location") location: string) {
    return Ad.searchAd(location);
  }

  @Query(() => [Ad])
  async filterByHouseType(
    @Arg("type") housingType: HousingTypeEnum
  ): Promise<Ad[]> {
    return await Ad.filterAdByType(housingType);
  }

  @Query(() => [Ad])
  async filerByPrice(
    @Arg("min", () => Number) min: number,
    @Arg("max", () => Number) max: number
  ): Promise<Ad[]> {
    return await Ad.filterAdByPrice(min, max);
  }

  @Query(() => [Ad])
  async filterByEquipements(@Arg("equipement") equip: string): Promise<Ad[]> {
    return await Ad.filterAdByEquipments(equip);
  }

  @Mutation(() => Ad)
  createAd(@Args() args: editOrCreateAd) {
    return Ad.createAd(args);
  }
  @AdOwner()
  @Mutation(() => Ad)
  updateAd(@Arg("id", () => ID) id: string, @Args() args: editOrCreateAd) {
    return Ad.updateAd(id, args);
  }

  @AdOwner()
  @Mutation(() => Ad)
  deleteAd(@Arg("id", () => ID) id: string) {
    return Ad.deleteAd(id);
  }
}

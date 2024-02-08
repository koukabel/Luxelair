<<<<<<< HEAD
import { Arg, Args, ArgsType, Field, Float, InputType, Mutation, Query, Resolver, registerEnumType } from "type-graphql";
import Ad, { EquipmentTypeEnum, HousingTypeEnum } from "../entities/ad";
=======
import {
	Args,
	ArgsType,
	Field,
	Float,
	Int,
	Mutation,
	Query,
	Resolver,
	Arg,
	ID,
} from "type-graphql";
import Ad from "../entities/ad";
>>>>>>> dev
import { MinLength, Min } from "class-validator";
import { EquipmentResolver } from "./EquipementResolver";

registerEnumType(HousingTypeEnum, {
  name: "HousingTypeEnum",
});

registerEnumType(EquipmentTypeEnum, {
  name: "EquipmentTypeEnum",
});

@InputType()
export class EquipmentValueInput {
    @Field(() => EquipmentTypeEnum)
    equipmentType: EquipmentTypeEnum | undefined;

    @Field(() => [String], { nullable: true })
    selectedValues?: string[];
}

@ArgsType()
export class editOrCreateAd {
<<<<<<< HEAD
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

    @Field(() => [EquipmentTypeEnum], { nullable: true }) 
    equipments!: EquipmentTypeEnum[];

    @Field(() => [EquipmentValueInput], { nullable: true })
    selectedEquipmentValues?: EquipmentValueInput[];

    @Field(() => HousingTypeEnum, { nullable: true })
    type!: HousingTypeEnum;
=======
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
>>>>>>> dev
}

@Resolver()
export class AdResolver {
<<<<<<< HEAD
    @Query(() => [Ad])
    ads() {
        return Ad.getAds(); 
    }

    @Query(() => [HousingTypeEnum])
    async HousingTypes(): Promise<HousingTypeEnum[]> {
        return Object.values(HousingTypeEnum);
    }



    @Mutation(() => Ad)
    async createAd(@Args() args: editOrCreateAd) {
      const ad = new Ad(args);
      let allValidEquipmentValues: string[] = [];
      for (const equipmentType of args.equipments) {
          const equipmentValues = EquipmentResolver.getEquipmentValues(equipmentType);
          allValidEquipmentValues.push(...equipmentValues);
      }
      return Ad.createAd(args);
  }
=======
	@Query(() => [Ad])
	ads() {
		return Ad.getAds();
	}
	@Query(() => Ad)
	ad(@Arg("id", () => ID) id: string) {
		return Ad.getAdById(id);
	}

	@Mutation(() => Ad)
	createAd(@Args() args: editOrCreateAd) {
		return Ad.createAd(args);
	}
>>>>>>> dev
}

import { Args, ArgsType, Field, Float, InputType, Mutation, Query, Resolver, registerEnumType } from "type-graphql";
import Ad, { EquipmentTypeEnum, HousingTypeEnum } from "../entities/ad";
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
}

@Resolver()
export class AdResolver {
    @Query(() => [Ad])
    ads() {
        return Ad.getAds(); 
    }

   
    @Mutation(() => Ad)
    // async createAd(@Args() args: editOrCreateAd) {
      
    //     const adData = {
    //         title: args.title,
    //         description: args.description,
    //         location: args.location,
    //         price: args.price,
    //         image: args.image,
    //         type: args.type,
    //         equipments: args.equipments,
    //         selectedEquipmentValues: args.selectedEquipmentValues
    //     };

    //     return Ad.createAd(adData);
    // }

    async createAd(@Args() args: editOrCreateAd) {
      const ad = new Ad(args);
  


      
      // Initialize an array to store all valid equipment values
      let allValidEquipmentValues: string[] = [];
  
      // Iterate over each equipment type in the args.equipments array
      for (const equipmentType of args.equipments) {
          // Call getEquipmentValues for the current equipment type and concatenate its values
          const equipmentValues = EquipmentResolver.getEquipmentValues(equipmentType);
          allValidEquipmentValues.push(...equipmentValues);
      }
  
      // Now you have all the valid equipment values selected by the user
      
      
      
      
      
      console.log(allValidEquipmentValues);
  
      // Create the ad
      return Ad.createAd(args);
  }
}

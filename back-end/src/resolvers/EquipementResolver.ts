import { Query, Resolver, Arg, registerEnumType } from "type-graphql";
import Ad, { EquipmentTypeEnum, exceptionalServicesEnum,  SecurityEquipementEnum, EssentialEquipmentsEnum } from "../entities/ad";

registerEnumType(EquipmentTypeEnum, {
    name: "EquipmentTypeEnum",
});

@Resolver()
export class EquipmentResolver {
    static getEquipmentValues(type: EquipmentTypeEnum): string[] {
        switch(type) {
            case EquipmentTypeEnum.EssentialEquipmentsEnum:
                return Object.values(EssentialEquipmentsEnum);
  
            case EquipmentTypeEnum.ExceptionalServices:
                return Object.values(exceptionalServicesEnum);
    
            case EquipmentTypeEnum.SecurityEquipement:
                return Object.values(SecurityEquipementEnum);
            default:
                return [];
        }
    }

    @Query(() => [String])
    async getEquipmentsList(
        @Arg("equipmentTypes", () => [EquipmentTypeEnum]) equipmentTypes: EquipmentTypeEnum[]
    ): Promise<string[]> {
        const allValues: string[] = [];
        equipmentTypes.forEach((type) => {
            const values = EquipmentResolver.getEquipmentValues(type);
            allValues.push(...values);
        });
        return allValues;
    }
}

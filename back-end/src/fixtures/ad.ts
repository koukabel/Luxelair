import { faker, fakerFR } from "@faker-js/faker";
import Ad from "../entities/ad";
import { generateUsers } from "./user";
import { EquipmentTypeEnum, HousingTypeEnum } from "../entities/ad";

const ADS_COUNT = 100;

export const generateAds = async () => {
  const users = await generateUsers();
  const ads = [];
  for (let i = 0; i <= ADS_COUNT; i++) {
    const ad = new Ad();
    ad.title = fakerFR.lorem.words();
    ad.description = fakerFR.lorem.paragraph();
    ad.price = faker.number.int({ min: 800, max: 8000 });
    ad.location = fakerFR.location.city();
    ad.image = "";
    ad.equipements = [
      faker.helpers.arrayElement(
        Object.values(EquipmentTypeEnum)
      ) as EquipmentTypeEnum,
      faker.helpers.arrayElement(
        Object.values(EquipmentTypeEnum)
      ) as EquipmentTypeEnum,
    ];
    ad.housingType = faker.helpers.arrayElement(
      Object.values(HousingTypeEnum)
    ) as HousingTypeEnum;
    ad.user = faker.helpers.arrayElement(users);
    ads.push(ad);
  }
  await Ad.save(ads);
  return ads;
};

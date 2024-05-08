import { getDataSource } from "../database";
import Ad, { HousingTypeEnum } from "../entities/ad";

describe("Ad", () => {
  let newAds: any[] = [];

  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
    newAds = await Promise.all([
      Ad.createAd({
        title: "Chalet de montagne",
        description: "Magnifique chalet au cœur des Alpes",
        price: 200,
        location: "Annecy",
        equipements: ["WiFi", "Chauffage", "Piscine"],
        housingType: HousingTypeEnum.Chalet,
        image: "",
      }),
      Ad.createAd({
        title: "Appartement en ville",
        description: "Appartement moderne en centre-ville",
        price: 150,
        location: "Paris",
        equipements: ["WiFi", "Climatisation", "Parking"],
        housingType: HousingTypeEnum.Appartement,
        image: "",
      }),
      Ad.createAd({
        title: "Maison de campagne",
        description: "Belle maison dans la campagne française",
        price: 300,
        location: "Avignon",
        equipements: ["WiFi", "Jardin", "Piscine"],
        housingType: HousingTypeEnum.Maison,
        image: "",
      }),
    ]);
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("getAds", () => {
    it("must return all ads", async () => {
      const ads = await Ad.getAds();
      const sortedAds = ads
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      const sortedNewAds = newAds
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      expect(sortedAds).toEqual(sortedNewAds);
    });
  });

  describe("searchAd", () => {
    it("when location does not exist", async () => {
      await expect(Ad.searchAd("Bordeaux")).rejects.toThrow(
        "Location does not exist"
      );
    });
  });
});

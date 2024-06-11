import { getDataSource } from "../database";
import Ad from "../entities/ad";
import { createAds } from "./mocks/AdData";
import { createUsers } from "./mocks/userData";

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

    const users = await createUsers();
    const newUser = users[0];

    newAds = await createAds(newUser.id);
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
    it("when location is match", async () => {
      const ads = newAds.filter((ad) => ad.location === "Paris");
      const search = await Ad.searchAd("Paris");
      const sortedAds = ads
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      const sortedSearch = search
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
      expect(sortedAds).toEqual(sortedSearch);
    });
  });

  describe("getAdById", () => {
    it("when ad does not exist", async () => {
      await expect(
        Ad.getAdById("550e8400-e29b-41d4-a716-446655440000")
      ).rejects.toThrow("Ad does not exist");
    });
    it("must return ad", async () => {
      const adId = await newAds[0].id;
      expect(await Ad.getAdById(adId)).toMatchObject(newAds[0]);
    });
  });

  describe("updateAd", () => {
    it("when ad does not exist", async () => {
      const ad = newAds[0];
      await expect(
        Ad.updateAd("550e8400-e29b-41d4-a716-446655440000", ad)
      ).rejects.toThrow("Ad does not exist");
    });
    it("when ad exist, returns update ad", async () => {
      const ad = newAds[0];
      const updateAdInformation = {
        ...ad,
        title: "Nouveau titre annonce",
      };
      const updatedAd = await Ad.updateAd(ad.id, {
        ...ad,
        title: "Nouveau titre annonce",
      });
      expect(await Ad.updateAd(ad.id, updateAdInformation)).toEqual(updatedAd);
    });
  });

  describe("deleteAd", () => {
    it("when ad does not exist", async () => {
      await expect(
        Ad.deleteAd("550e8400-e29b-41d4-a716-446655440000")
      ).rejects.toThrow(
        "Ad with ID 550e8400-e29b-41d4-a716-446655440000 does not exist."
      );
    });
    it("when ad exist, returns void", async () => {
      const adId = newAds[0].id;
      await expect(Ad.deleteAd(adId)).resolves.toBeUndefined();
    });
  });
});

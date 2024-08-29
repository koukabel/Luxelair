import Ad, { HousingTypeEnum } from "../entities/ad";
import { getDataSource } from "../database";
import User from "../entities/user";

describe("User", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });

  describe("isAdOwner", () => {
    let me: User;
    let other: User;

    const adProperties = {
      title: "Maison magnifique",
      description: "lorem ipsum",
      price: 1000,
      image: "picture-url",
      location: "Paris",
      equipements: ["parking", "balcon"],
      housingType: HousingTypeEnum.Appartement,
    };

    beforeEach(async () => {
      me = await User.createNewUser({
        email: "me@test.com",
        firstName: "Arnaud",
        lastName: "Renaud",
        password: "azerty123456",
        roles: ["Host"],
      });

      other = await User.createNewUser({
        email: "other@test.com",
        firstName: "B.",
        lastName: "C.",
        password: "otherpassword",
        roles: ["Host"],
      });
    });

    describe("when ad does not exist", () => {
      it("returns false", async () => {
        expect(await me.isAdOwner(me.id)).toEqual(false);
      });
    });

    describe("when ad does exist", () => {
      describe("if user is not ad owner", () => {
        it("returns false", async () => {
          const ad = await Ad.createAd({
            ...adProperties,
            userId: other.id,
          });

          expect(await me.isAdOwner(ad.id)).toEqual(false);
        });
      });

      describe("if user is ad owner", () => {
        it("returns true", async () => {
          const ad = await Ad.createAd({
            ...adProperties,
            userId: me.id,
          });

          expect(await me.isAdOwner(ad.id)).toEqual(true);
        });
      });
    });
  });
});

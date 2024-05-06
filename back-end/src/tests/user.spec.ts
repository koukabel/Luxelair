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
  describe("getUser", () => {
    const { email, password } = {
      email: "testuser@test.com",
      password: "testtest8529",
    };
    describe("when email matches no user in database", () => {
      it("throws error", async () => {
        await expect(User.getUser({ email, password })).rejects.toThrow(
          "INVALID_CREDENTIALS"
        );
      });
    });
    describe("when email matches user in database", () => {
      describe("when password does not match password in database", () => {
        it("throws errors", async () => {
          await User.createNewUser({
            email,
            firstName: "Test",
            lastName: "test",
            password: "testtest9636",
          });
          await expect(User.getUser({ email, password })).rejects.toThrow(
            "INVALID_CREDENTIALS"
          );
        });
      });
      describe("when password matches password in database", () => {
        it("returns user", async () => {
          const user = await User.createNewUser({
            email,
            firstName: "Test",
            lastName: "test",
            password,
          });
          await expect(User.getUser({ email, password })).resolves.toEqual(
            user
          );
        });
      });
    });
  });
});

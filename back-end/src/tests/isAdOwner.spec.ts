// import { getDataSource } from "../database";
// import User from "../entities/user";
// import UserSession from "../entities/userSession";

// describe("User", () => {
//   beforeEach(async () => {
//     const database = await getDataSource();
//     for (const entity of database.entityMetadatas) {
//       const repository = database.getRepository(entity.name);
//       await repository.query(
//         `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
//       );
//     }
//   });

//   afterAll(async () => {
//     const database = await getDataSource();
//     await database.destroy();
//   });

//   describe("isAdOwner", () => {
//     let me: User;
//     let other: User;

//     const adProperties = {
//       title: "Mon annonce",
//       description: "lorem ipsum",
//       price: 100,
//       weightGrams: 200,
//       picture: "picture-url",
//       location: "Paris",
//       categoryId: 1,
//       tagIds: [],
//     };

//     beforeEach(async () => {
//       me = await User.saveNewUser({
//         email: "me@test.com",
//         firstName: "Arnaud",
//         lastName: "Renaud",
//         password: "azerty123456",
//       });

//       other = await User.saveNewUser({
//         email: "other@test.com",
//         firstName: "B.",
//         lastName: "C.",
//         password: "otherpassword",
//       });

//       await Category.saveNewCategoryIfNotExisting({
//         id: 1,
//         name: "Ameublement",
//       });
//     });

//     describe("when ad does not exist", () => {
//       it("returns false", async () => {
//         expect(
//           await me.isAdOwner("97f7b0c5-8290-4a1c-bb33-6cd04796f87f"),
//         ).toEqual(false);
//       });
//     });

//     describe("when ad does exist", () => {
//       describe("if user is not ad owner", () => {
//         it("returns false", async () => {
//           const ad = await Ad.saveNewAd({
//             ...adProperties,
//             owner: other,
//           });

//           expect(await me.isAdOwner(ad.id)).toEqual(false);
//         });
//       });

//       describe("if user is ad owner", () => {
//         it("returns true", async () => {
//           const ad = await Ad.saveNewAd({
//             ...adProperties,
//             owner: me,
//           });

//           expect(await me.isAdOwner(ad.id)).toEqual(true);
//         });
//       });
//     });
//   });

// })
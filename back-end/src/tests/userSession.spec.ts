// import { getDataSource } from "../database";
// import UserSession from "../entities/userSession";
// import User from "../entities/user";

// describe("UserSession", () => {
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

//   describe("saveNewSession", () => {
//     it("returns user with session", async () => {
//       const user = await User.createNewUser({
//         email: "test@email.com",
//         firstName: "Test",
//         lastName: "User",
//         password: "testpassword",
//       });

//       const session1 = await UserSession.saveNewSession(user);
//       const session2 = await UserSession.getSessionById(session1.id);

//       expect(session1.id).toEqual(session2.id);
//     });
//   });
// });

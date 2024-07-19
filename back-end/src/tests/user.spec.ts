// // import { getDataSource } from "../database";
// // import User from "../entities/user";
// // import UserSession from "../entities/userSession";

// // describe("User", () => {
// //   beforeEach(async () => {
// //     const database = await getDataSource();
// //     for (const entity of database.entityMetadatas) {
// //       const repository = database.getRepository(entity.name);
// //       await repository.query(
// //         `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
// //       );
// //     }
// //   });

//   afterAll(async () => {
//     const database = await getDataSource();
//     await database.destroy();
//   });
//   describe("getUser", () => {
//     const { email, password } = {
//       email: "testuser@test.com",
//       password: "testtest8529",
//     };
//     describe("when email matches no user in database", () => {
//       it("throws error", async () => {
//         await expect(User.getUser({ email, password })).rejects.toThrow(
//           "INVALID_CREDENTIALS"
//         );
//       });
//     });
//     describe("when email matches user in database", () => {
//       describe("when password does not match password in database", () => {
//         it("throws errors", async () => {
//           await User.createNewUser({
//             email,
//             firstName: "Test",
//             lastName: "test",
//             password: "testtest9636",
//             roles: ["Traveller"],
//           });
//           await expect(User.getUser({ email, password })).rejects.toThrow(
//             "INVALID_CREDENTIALS"
//           );
//         });
//       });
//       describe("when password matches password in database", () => {
//         it("returns user", async () => {
//           const user = await User.createNewUser({
//             email,
//             firstName: "Test",
//             lastName: "test",
//             password,
//             roles: ["Traveller"],
//           });
//           await expect(User.getUser({ email, password })).resolves.toEqual(
//             user
//           );
//         });
//       });
//     });
//   });

//   describe("createNewUser", () => {
//     it("return new user", async () => {
//       const user = await User.createNewUser({
//         email: "test@email.com",
//         firstName: "Testfirstname",
//         lastName: "Testlastname",
//         password: "testpassword456",
//         roles: ["Traveller"],
//       });
//       expect(user).toMatchObject({
//         email: "test@email.com",
//         firstName: "Testfirstname",
//         lastName: "Testlastname",
//       });
//     });
//   });
//   describe("getUsers", () => {
//     it("return all users in database", async () => {
//       const newUsers = await Promise.all([
//         User.createNewUser({
//           email: "user1@example.com",
//           firstName: "John",
//           lastName: "Doe",
//           password: "passwordtest1",
//           roles: ["Traveller"],
//         }),
//         User.createNewUser({
//           email: "user2@example.com",
//           firstName: "User2",
//           lastName: "User2",
//           password: "passwordtest2",
//           roles: ["Traveller"],
//         }),
//         User.createNewUser({
//           email: "user3@example.com",
//           firstName: "User3",
//           lastName: "User3",
//           password: "passwordtest3",
//           roles: ["Traveller"],
//         }),
//       ]);
//       const users = await User.getUsers();
//       const sortedUsers = users
//         .slice()
//         .sort((a, b) => a.email.localeCompare(b.email));
//       const sortedNewUsers = newUsers
//         .slice()
//         .sort((a, b) => a.email.localeCompare(b.email));

//       expect(sortedUsers).toEqual(sortedNewUsers);
//     });
//   });
//   describe("editUserInfo", () => {
//     it("when user does not exist", async () => {
//       const user = await User.createNewUser({
//         email: "test@email.com",
//         firstName: "Testfirstname",
//         lastName: "Testlastname",
//         password: "testpassword456",
//         roles: ["Traveller"],
//       });
//       await expect(
//         User.editUserInfo("550e8400-e29b-41d4-a716-446655440000", user)
//       ).rejects.toThrow("User does not exist");
//     });
//     it("when user exist, returns update user", async () => {
//       const user = await User.createNewUser({
//         email: "test@email.com",
//         firstName: "Testfirstname",
//         lastName: "Testlastname",
//         password: "testpassword456",
//         roles: ["Traveller"],
//       });
//       const userInfo = {
//         ...user,
//         firstName: "test",
//       };
//       const updatedUser = await User.editUserInfo(user.id, {
//         ...user,
//         firstName: "test",
//       });

//       expect(await User.editUserInfo(user.id, userInfo)).toEqual(updatedUser);
//     });
//   });
//   describe("getUserById", () => {
//     it("when user does not exist", async () => {
//       await expect(
//         User.getUserById("550e8400-e29b-41d4-a716-446655440000")
//       ).rejects.toThrow("User does not exist");
//     });
//     it("must return user", async () => {
//       const user = await User.createNewUser({
//         email: "test@email.com",
//         firstName: "Testfirstname",
//         lastName: "Testlastname",
//         password: "testpassword456",
//         roles: ["Traveller"],
//       });
//       expect(await User.getUserById(user.id)).toMatchObject(user);
//     });
//   });

//   describe("getUserWithSessionId", () => {
//     it("returns user associated with session", async () => {
//       const user = await User.createNewUser({
//         email: "test@email.com",
//         firstName: "Testfirstname",
//         lastName: "Testlastname",
//         password: "testpassword456",
//         roles: ["Traveller"],
//       });
//       const session = await UserSession.saveNewSession(user);
//       const sessionTest = session.user;

// //       expect(await User.getUserWithSessionId(session.id)).toEqual(sessionTest);
// //     });

// //     it("returns null if session does not exist", async () => {
// //       const user = await User.getUserWithSessionId("test");
// //       expect(user).toBeNull();
// //     });
// //   });
// // });

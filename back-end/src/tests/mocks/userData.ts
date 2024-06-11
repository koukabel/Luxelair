import User from "../../entities/user";

export const createUsers = async () => {
  const users = await Promise.all([
    User.createNewUser({
      email: "user1@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "passwordtest1",
      roles: ["Traveller", "Host"],
    }),
    User.createNewUser({
      email: "user2@example.com",
      firstName: "User2",
      lastName: "User2",
      password: "passwordtest2",
      roles: ["Traveller"],
    }),
    User.createNewUser({
      email: "user3@example.com",
      firstName: "User3",
      lastName: "User3",
      password: "passwordtest3",
      roles: ["Traveller"],
    }),
  ]);

  return users;
};

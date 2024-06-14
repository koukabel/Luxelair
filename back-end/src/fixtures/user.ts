import { faker } from "@faker-js/faker";
import User from "../entities/user";

const USERS_COUNT = 20;

export const generateUsers = async () => {
  const users = [];
  for (let i = 0; i <= USERS_COUNT; i++) {
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.roles = ["Traveller"];
    user.hashedPassword = "test";
    users.push(user);
  }
  await User.save(users);
  return users;
};

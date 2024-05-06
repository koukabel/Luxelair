import { DataSource } from "typeorm";
import Ad from "./entities/ad";
import Booking from "./entities/booking";
import User from "./entities/user";
import UserSession from "./entities/userSession";

let dataSource: DataSource;

//import { EquipmentResolver } from "./resolvers/EquipementResolver";
export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      url:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
      entities: [Ad, User, Booking, UserSession],
      synchronize: true,
    });
    await dataSource.initialize();
  }
  return dataSource;
};

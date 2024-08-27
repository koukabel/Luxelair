import { getDataSource } from "../database";
import Booking from "../entities/booking";
import { createUsers } from "./mocks/userData";
import { createAds } from "./mocks/AdData";
import { createBookings } from "./mocks/bookingData";

describe("Booking", () => {
  let users: any[];
  let ads: any[];
  let bookings: any[];

  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }

    users = await createUsers();
    ads = await createAds(users[0].id);
    bookings = await createBookings(ads, users);
  });

  afterAll(async () => {
    const database = await getDataSource();
    await database.destroy();
  });
  describe("getBookings", () => {
    it("return all bookings", async () => {
      const allBookings = await Booking.getBookings();
      const sortedBookings = allBookings
        .slice()
        .sort((a, b) => a.checkinDate.getTime() - b.checkinDate.getTime());
      const sortedNewBookings = bookings
        .slice()
        .sort((a, b) => a.checkinDate.getTime() - b.checkinDate.getTime());
      expect(sortedBookings).toEqual(sortedNewBookings);
    });
  });
});

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  In,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Ad from "./ad";
import User from "./user";
import { CreateOrUpdateBooking } from "src/resolvers/BookingResolver";
import Payment from "./payment";

@Entity()
@ObjectType()
class Booking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  checkinDate!: Date;

  @Column()
  @Field()
  checkoutDate!: Date;

  @Column()
  @Field()
  totalPrice!: number;

  @Column({ default: false })
  @Field()
  status!: boolean;

  @Column({ default: new Date() })
  @Field()
  datePayment!: Date;

  @Column({ default: false })
  @Field()
  statusPayment!: boolean;

  @ManyToOne(() => User, (user) => user.bookings)
  @Field(() => User)
  user!: User;


  @ManyToOne(() => Ad, (ad) => ad.bookings, { eager: true })
  @Field(() => Ad)
  ad!: Ad;

  @OneToMany(() => Payment, (payment) => payment.booking)
  @Field(() => [Payment])
  payments!: Payment[];

  constructor(booking?: Partial<Booking>) {
    super();
    if (booking) {
      if (!booking.checkinDate) {
        throw new Error("La date de départ est obligatoire");
      }
      this.checkinDate = booking.checkinDate;
      if (!booking.checkoutDate) {
        throw new Error("La date d'arrivée est obligatoire");
      }
      this.checkoutDate = booking.checkoutDate;
      if (!booking.totalPrice) {
        throw new Error("Le total est obligatoire");
      }
      this.totalPrice = booking.totalPrice;
    }
  }

  static async saveNewBooking(
    bookingData: CreateOrUpdateBooking
  ): Promise<Booking> {
    const booking = new Booking(bookingData);
    const user = await User.getUserById(bookingData.userId);
    const ad = await Ad.getAdById(bookingData.adId);

    booking.user = user;
    booking.ad = ad;

    const saveBooking = await booking.save();
    return saveBooking;
  }

  static async getBookings(): Promise<Booking[]> {
    const bookings = await Booking.find({
      relations: ["ad", "ad.user", "user"],
    });
    return bookings;
  }

  static async getBookingsByAd(adId: string): Promise<Booking[]> {
    const bookings = await Booking.find({
      where: { ad: { id: adId } },
      relations: ["ad"],
    });
    return bookings;
  }

  static async getBooking(id: string): Promise<Booking> {
    const booking = await Booking.findOne({
      where: { id: id },
      relations: ["ad", "user", "payments"],
    });
    if (!booking) {
      throw new Error("Booking does not exist");
    }
    return booking;
  }

  static async getBookingsByHost(userId: string): Promise<Booking[]> {
    const user = await User.findOne({
      where: { id: userId },
      relations: ["ads"],
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    const adIds = user.ads.map((ad) => ad.id);

    if (adIds.length === 0) {
      return [];
    }

    const bookings = await Booking.find({
      where: { ad: { id: In(adIds) } },
      relations: ["ad", "user"],
    });

    return bookings;
  }

  static async getBookingsByTraveller(userId: string): Promise<Booking[]> {
    const bookings = await Booking.find({
      where: { user: { id: userId } },
      relations: ["ad", "user", "payments"],  
    });

    if (bookings.length === 0) {
      throw new Error("No bookings found for this traveller");
    }

    return bookings;
  }
}

export default Booking;

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
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

  // Voir après pour mettre un enum pour mettre plusieurs status
  @Column({ default: false })
  @Field()
  status!: boolean;

  @Column({ default: new Date() })
  @Field()
  datePayment!: Date;

  @Column({ default: false })
  @Field()
  statusPayment!: boolean;

  @ManyToMany(() => User, (user) => user.bookings)
  @Field(() => User)
  users!: User[];

  @ManyToOne(() => Ad, (ad) => ad.bookings)
  @JoinColumn({ name: "adId" })
  @Field(() => Ad)
  ad!: Ad;

  @OneToMany(() => Payment, payment => payment.booking)
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

    booking.users = [user];
    booking.ad = ad;

    const saveBooking = await booking.save();
    return saveBooking;
  }

  static async getBookings(): Promise<Booking[]> {
    const bookings = await Booking.find({ relations: ["ad"] });
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
      relations: ["ad"],
    });
    if (!booking) {
      throw new Error("Booking does not exist");
    }
    return booking;
  }
}

export default Booking;

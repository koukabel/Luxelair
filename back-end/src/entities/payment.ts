import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID, Float, registerEnumType } from "type-graphql";
import Booking from "./booking";
import User from "./user";
import { stripe } from "../stripe";
import { EditOrCreatePayment } from "../resolvers/PaymentResolver";

export enum PaymentStatusEnum {
  Confirmed = "Confirmé",
  Failed = "échoué",
  Pending = "en attente",
}

registerEnumType(PaymentStatusEnum, {
  name: "PaymentStatusEnum",
  description: "The status of a payment",
});

@Entity()
@ObjectType()
class Payment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ type: "float" })
  @Field(() => Float)
  amount!: number;

  @Column()
  @Field()
  currency!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    nullable: true,
  })

  @Column({
    type: "enum",
    enum: PaymentStatusEnum,
    nullable: true,
  })
  @Field(() => PaymentStatusEnum, { nullable: true })
  status!: PaymentStatusEnum;

  @ManyToOne(() => Booking, (booking) => booking.payments, { eager: true })
  @JoinColumn({ name: "booking_id" })
  @Field(() => Booking)
  booking!: Booking;

  @ManyToOne(() => User, (user) => user.payments, { eager: true })
  @JoinColumn({ name: "user_id" })
  @Field(() => User)
  user!: User;

  constructor(payment?: EditOrCreatePayment) {
    super();
    if (payment) {
      this.amount = payment.amount;
      this.currency = payment.currency;
      this.status = payment.status || PaymentStatusEnum.Pending;
      this.createdAt = payment.createdAt;
    }
  }

  static async createStripePayment(
    amount: number,
    currency: string,
    bookingId: string,
    userId: string
  ): Promise<Payment> {
    const user = await User.findOne({ where: { id: userId } });
    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (!user || !booking) {
      throw new Error("User or Booking not found");
    }

    // creating the payment intent with stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency,
      automatic_payment_methods: { enabled: true },
    });

    // save the payment record in the db
    const payment = Payment.create({
      amount,
      currency,
      status: PaymentStatusEnum.Pending,
      booking,
      user,
      id: paymentIntent.id
    });

    await payment.save();

    return payment;
  }

  static async getPaymentById(id: string): Promise<Payment> {
    const payment = await Payment.findOne({
      where: { id: id },
      relations: ["booking", "user"],
    });
    if (!payment) {
      throw new Error("Payment does not exist");
    }
    return payment;
  }
}
export default Payment;

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Float, registerEnumType } from "type-graphql";
import Booking from "./booking";
import User from "./user";

export enum PaymentStatusEnum {
    Confirmed = "Confirmé",
    Failed = "échoué",
    Pending = "en attente"
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

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    @Field()
    updatedAt!: Date;

    @Column({
        type: "enum",
        enum: PaymentStatusEnum,
        nullable: true,
    })
    @Field(() => PaymentStatusEnum, { nullable: true })
    status!: PaymentStatusEnum;

    @OneToOne(() => Booking, booking => booking.payment)
    @JoinColumn({ name: "booking_id" })
    @Field(() => Booking)
    booking!: Booking;

    @OneToOne(() => User, user => user.payment, { eager: true })
    @JoinColumn({ name: "user_id" })
    @Field(() => User)
    user!: User;

    @Column()
    @Field()
    booking_id!: string;

    @Column()
    @Field()
    user_id!: string;
}

// constructor(payment?: CreatePayment) {
//     super();
//     if (payment) {
//         this.amount = payment.amount;
//         this.currency = payment.currency;
//         this.status = payment.status || PaymentStatusEnum.Pending;
//         this.booking = payment.booking;
//         this.user = payment.user;
//         this.booking_id = payment.booking.id;
//         this.user_id = payment.user.id;
//     }
//   }


// static async createStripePayment(amount: number, currency: string, customerId: string): Promise<Stripe.PaymentIntent> {}
//getbookingbypaymentid or status
//getpayment statusby 

export default Payment;

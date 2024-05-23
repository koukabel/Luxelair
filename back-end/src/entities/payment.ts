import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID, Float, registerEnumType } from "type-graphql";
import Booking from "./booking";
import User from "./user";
import { editOrCreatePayment } from "src/resolvers/PaymentResolver";

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
    @Field({ nullable: true })
    updatedAt!: Date;

    @Column({
        type: "enum",
        enum: PaymentStatusEnum,
        nullable: true,
    })
    @Field(() => PaymentStatusEnum, { nullable: true })
    status!: PaymentStatusEnum;

    // one booking one payment
    @OneToOne(() => Booking, { eager: true }) 
    @JoinColumn({ name: "booking_id" }) //  foreign key
    @Field(() => Booking)
    booking!: Booking;

    // one user one payment
    @OneToOne(() => User, { eager: true }) 
    @JoinColumn({ name: "user_id" }) // foreign key column 
    @Field(() => User)
    user!: User;


    constructor(payment?: editOrCreatePayment) {
        super();
        if (payment) {
            this.amount = payment.amount;
            this.currency = payment.currency;
            this.status = payment.status || PaymentStatusEnum.Pending;
            this.createdAt= payment.createdAt;
            this.updatedAt= payment.updatedAt
        }
    }
}


// static async createStripePayment(amount: number, currency: string, customerId: string):
// Promise<Stripe.PaymentIntent> {}
//getbookingbypaymentid or status
//getpayment statusby 

export default Payment;

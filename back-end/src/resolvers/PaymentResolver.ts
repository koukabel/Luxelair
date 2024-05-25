import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import Payment, { PaymentStatusEnum } from "../entities/payment";

@InputType()
export class EditOrCreatePayment {
  @Field()
  amount!: number;

  @Field()
  currency!: string;

  @Field()
  description!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => PaymentStatusEnum, { nullable: true })
  status!: PaymentStatusEnum;

  @Field()
  user_id!: string;

  @Field()
  booking_id!: string;
}

@Resolver()
export class PaymentResolver {
  @Mutation(() => Payment)
  async createStripePayment(
    @Arg("amount") amount: number,
    @Arg("currency") currency: string,
    @Arg("bookingId") bookingId: string,
    @Arg("userId") userId: string
  ): Promise<Payment> {
    return await Payment.createStripePayment(amount, currency, bookingId, userId);
  }

  @Query(() => Payment)
  async getPaymentById(@Arg("id") id: string): Promise<Payment> {
    return await Payment.getPaymentById(id);
  }
}

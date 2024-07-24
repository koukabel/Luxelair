import Booking from "../entities/booking";
import { PaymentStatusEnum } from "../entities/payment";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaymentStatusResult {
  @Field(() => PaymentStatusEnum)
  status!: PaymentStatusEnum;

  @Field(() => Booking, { nullable: true })
  booking?: Booking; 
}

export default PaymentStatusResult;

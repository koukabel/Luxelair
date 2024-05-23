import { PaymentStatusEnum } from "src/entities/payment";
import { ArgsType, Field, Resolver } from "type-graphql";


@ArgsType()
export class editOrCreatePayment {
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
}
  
  

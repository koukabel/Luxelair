import { PaymentStatusEnum } from "src/entities/payment";
import {
    Resolver,
    ArgsType,
    Field,
    Mutation,
    Args,
    Query,
    Arg,
    ID,
    registerEnumType
  } from "type-graphql";



@Resolver()
export class PaymentResolver {
//     @Query(() => Payment)
//   ad(@Arg("id", () => ID) id: string) {
//     return Payment.getById(id);
//   }
}


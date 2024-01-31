import { Query, Resolver } from "type-graphql";
import Ad from "../entities/ad";

@Resolver()
export class AdResolver {
    @Query(() =>[Ad])
    ads(){
        return Ad.getAds(); 
    }
}



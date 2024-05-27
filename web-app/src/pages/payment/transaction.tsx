
import  { useRouter } from "next/router";

import CheckoutSession from "@/components/Payment/CheckoutSession";


export default function Transaction () {
    const router = useRouter();
    //const { price } = router.query;

    return(
        <div>
   <CheckoutSession amount={100} currency="usd" bookingId="1b7b7f20-0dc6-44f3-9f8c-17471a5e2026" userId="1646ef1c-2c90-4522-90b5-6269071337b5" />


        </div>
    )
}


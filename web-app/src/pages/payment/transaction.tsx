
// import  { useRouter } from "next/router";
// import {loadStripe} from '@stripe/stripe-js';
// import CheckoutSession from "@/components/Payment/CheckoutSession";


// export default async function Transaction () {
//     const router = useRouter();
//     const { price } = router.query;

//     return(
//         <div>
//    <CheckoutSession amount={100} currency="usd" bookingId="booking_123" userId="user_123" />
// pay {price}

//         </div>
//     )
// }

import { useRouter } from "next/router";
import { loadStripe } from '@stripe/stripe-js';
import { CustomCheckoutProvider } from '@stripe/react-stripe-js';

export default function Transaction() {
    const router = useRouter();

    // Ensure that router.query has been resolved before rendering the component
    if (router.isReady) {
        const { price } = router.query;

        // Check if price is a string or undefined
        if (typeof price === 'string') {
            // Convert the price string to a number
            const amount = parseFloat(price);

            // Check if amount is a valid number
            if (!isNaN(amount)) {
                // Define the Stripe promise with your publishable key
                const stripePromise = loadStripe('pk_test_51PJd3M07GbaJqaEDWtBaETRYzha5dVydrINevHGkDOJZg64ixF8mPJkmE4Cbcj72BMD8pLQLJ7YCdUfy7UFYhxiG00fS1tuYJB');

                // Render the component with the obtained price and StripeProvider
                return (
                    <CustomCheckoutProvider  stripe={stripePromise}  options={{clientSecret: '...'}} >
                    {/* Your checkout component here */}
                </CustomCheckoutProvider>
                );
            } else {
                // Handle case where price string is not a valid number
                return <div>Invalid price value</div>;
            }
        } else {
            // Handle case where price is not a string (e.g., undefined)
            return <div>Price not found</div>;
        }
    } else {
        // You can render a loading indicator or placeholder content while router.query is being resolved
        return <div>Loading...</div>;
    }
}

import { useRouter } from "next/router";
function Success () {
  const router = useRouter();
   const redirectToHome = () => {
    router.push("/");
   }
        return (
          <div>
            <h1>Success</h1>
            <h2>Thank you for your purchase!</h2>
            <button onClick={redirectToHome}>Home</button>
          </div>
        );
      };
  
export default Success;
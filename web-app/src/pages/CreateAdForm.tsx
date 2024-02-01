import { ChakraProvider, Image, Text, Heading, Stack } from "@chakra-ui/react"
import CreateAdComponent from "@/components/CreateAdComponent";
import Footer from "@/components/Footer";
export default function CreateAdForm () {
    return (
        <ChakraProvider >
            <Image  maxW='sm' src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg" alt="Test image" w="90%" h="7rem" m="auto"/>
            <Stack spacing={4} m="auto" width="90%" mt={5} textAlign="center">
                <Heading as='h1' size='2xl'>
                Vous avez une propriété à mettre en location ?
                 </Heading>
                <Text fontSize='2xl'>
                 Profitez de notre réseau unique chez LuxeLair. Rencontrez des millions de voyageurs.
                 </Text>
            </Stack>
            <CreateAdComponent />
            <Footer /> 
         </ChakraProvider>
    );
}

import { 
    FormControl, 
    FormLabel,
    Input, 
    Textarea, 
    Button
} from "@chakra-ui/react";
import {useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {CreateAdMutation, CreateAdMutationVariables } from "@/gql/graphql";

const CREATE_AD = gql`
    mutation CreateAd(
        $title: String!, 
        $location: String!, 
        $price: Float!, 
        $description: String) {
    createAd(title: $title, location: $location, price: $price, description: $description) {
      title
      location
      price
      description
    }
  } 
`;

export default function CreateAdComponent() {

    const [publishAdInfo, setPublishAdInfo] =useState<CreateAdMutationVariables>({
        title: '', 
        description: '' ,
        location: '',
        price : 0

    })

    function handleChange(e: any) {
        const { name, value} = e.target; 
        //convert string to number (price)
        const newValue = name === 'price' ? parseFloat(value) : value; 
        setPublishAdInfo(prevState => ({
                ...prevState,
                [name]: newValue 
        }));
    }   
    
    const [createAd ]= useMutation<
    CreateAdMutation, 
    CreateAdMutationVariables
    >(CREATE_AD);

    const createNewAd = async () => {
        try {
        const { data } = await createAd({
            variables: {
                title: publishAdInfo.title,
                description: publishAdInfo.description,
                location: publishAdInfo.location,
                price: publishAdInfo.price
            },
        });
    } catch (error) {
            console.log(error)
        }
        
      }

    return (
      
        <form style={{ margin: 'auto', marginTop: '5rem', width: '50%'}} 
      >
            <FormControl m={2} isRequired >
            <FormLabel>Donner un titre à mon annonce</FormLabel>
            <Input type='text' name='title' onChange={handleChange} />
            </FormControl>
            <FormLabel m={2}>Description de mon logement</FormLabel>
            <Textarea m={2} placeholder='Description de mon annonce' name='description' onChange={handleChange} />
            <FormControl m={2} isRequired >
            <FormLabel>L'adresse du bien</FormLabel>
            <Input type='text' name='location' onChange={handleChange} />
            </FormControl>
            <FormLabel m={2}>A présent, fixez le prix d'une nuit</FormLabel>
            <Input type='number' m={2} name='price' onChange={handleChange} />
            <Button m={2} variant='solid' bg='#B4770A' color='white' _hover={{ bg: '#000000' }} onClick={createNewAd} >
                Mettre mon annonce en ligne
            </Button>
        </form>
    )
}
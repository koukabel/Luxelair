import { 
    FormControl, 
    FormLabel,
    Input, 
    Textarea, 
    NumberDecrementStepper, 
    NumberInputStepper,
    NumberIncrementStepper,
    NumberInput, 
    NumberInputField, 
    Button
} from "@chakra-ui/react";

export default function CreateAdComponent() {

    
    return (
      
        <form style={{ margin: 'auto', marginTop: '5rem', width: '50%'}}>
            <FormControl m={2} isRequired >
            <FormLabel>Donner un titre à mon annonce</FormLabel>
            <Input type='text' />
            </FormControl>
            <FormLabel m={2}>Description de mon logement</FormLabel>
            <Textarea m={2} placeholder='Description de mon annonce' />
            <FormControl m={2} isRequired >
            <FormLabel>L'adresse du bien</FormLabel>
            <Input type='text' />
            </FormControl>
            <FormLabel m={2}>A présent, fixez le prix d'une nuit</FormLabel>
            <NumberInput m={2} w="35%" precision={2} min={100} >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
            <Button m={2} variant='solid' bg='#B4770A' color='white' _hover={{ bg: '#000000' }}>
                Mettre mon annonce en ligne
            </Button>
        </form>
    )
}
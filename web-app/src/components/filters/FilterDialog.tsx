import {
    useDisclosure, AlertDialog, Button, AlertDialogOverlay, AlertDialogContent,
    AlertDialogHeader, Flex, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,
    HStack, Link, InputLeftElement, Box, InputGroup, Input, Heading, Text, VStack, StackDivider, Grid, Checkbox
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import { Divider } from '@chakra-ui/react'
import PriceRangeSlider from './PriceRangeSlider';
const FilterDialog = ({ onClose, isOpen }) => {
    const GET_EQUIPEMENTS = gql`
query getEquipements {
  getEquipmentTypes
}
`;
    const { loading, error, data } = useQuery(GET_EQUIPEMENTS);
    const cancelRef = useRef();
    //const [equipmentTypes, setEquipmentTypes] = useState<string[]>([]);
    const [limit, setLimit] = useState(8);
    const handleSeeMore = () => {
        setLimit(prevLimit => prevLimit + 8); 
      };

    React.useEffect(() => {
        data
    }, []);
    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent maxW='3xl' p='20px' maxH='80vh' >
                    <AlertDialogHeader textAlign='center' fontSize='sm'>Filtres</AlertDialogHeader>
                    <Divider />
                    <AlertDialogCloseButton />
                    <AlertDialogBody overflowY='auto' >
                        <VStack
                            divider={<StackDivider borderColor='gray.200' />}
                            spacing={4}
                            align='stretch'
                        >             <Box>
                                <Heading as='h5' size='md' pt='10px' fontWeight='500'>Fourchette de prix </Heading>
                                <Text fontSize='sm' pt='10px'
                                >Prix par nuit, frais et taxes compris</Text>
                                <HStack>
                                    <HStack class="priceRange" pt='10px' >
                                        <PriceRangeSlider min={0} max={10000}  onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}/>
                                    </HStack>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='sm'>
                                            €
                                        </InputLeftElement>
                                        <Input placeholder='Minimum' fontSize='xs'/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                            €
                                        </InputLeftElement>
                                        <Input placeholder='Maximum' fontSize='xs' />
                                    </InputGroup>
                                </HStack>
                            </Box>
                            <Box>
                                <Heading as='h5' size='md' fontWeight='500'>  Équipements </Heading>
                                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                                    {data?.getEquipmentTypes && data.getEquipmentTypes.slice(0, limit).map((equipment: string) => (
                                        <Checkbox pt='20px' size='lg' colorScheme='gray' spacing='1rem' key={equipment}>
                                            {equipment}
                                        </Checkbox>
                                    ))}
                                </Grid>
                                <Flex>  <Link fontWeight='500' textDecoration='underline' onClick={handleSeeMore}>Afficher plus</Link> </Flex>
                            
                              
                            </Box>
                        </VStack>
                    </AlertDialogBody>
                    <Divider />
                    <AlertDialogFooter justifyContent="space-between">
                        <Button ref={cancelRef} bg="white">
                            Tout effacer
                        </Button>
                        <Button bg='#B4770A' ml={3} onClick={onClose} color='white'>
                            Afficher les logements
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default FilterDialog;


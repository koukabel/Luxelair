import React, { useState, useRef } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

import { Divider, Input, InputGroup, InputLeftElement, Flex, Heading, Text, HStack, VStack, StackDivider, Box, Grid, Checkbox, Link, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import PriceRangeSlider from './PriceRangeSlider';

const FilterDialog = ({ onClose, isOpen }) => {
    const GET_EQUIPEMENTS = gql`
        query getEquipements {
            getEquipmentTypes
        }
    `;

    const FILTER_BY_PRICE_RANGE = gql`
    query FilerByPrice($max: Float!, $min: Float!) {
        filerByPrice(max: $max, min: $min) {
          id
        }
      
}`;
    const min = 500;
    const max = 10000;
    const { loading, error, data } = useQuery(GET_EQUIPEMENTS);
    //const [filteredAdsByPrice] = useLazyQuery<FilterTypeQuery>(FILTER_BY_PRICE_RANGE);
    const cancelRef = useRef();
    const [newSliderValue, setNewSliderValue] = useState([min, max]);

    const handleSliderValueChange = (newSliderValue) => {
        console.log("New Slider Value:", newSliderValue);
        setNewSliderValue(newSliderValue); // Update the newSliderValue state
    };

    const [limit, setLimit] = useState(8);
    const handleSeeMore = () => {
        setLimit(prevLimit => prevLimit + 8);
    };

    function showResults() {


    }
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
                        >
                            <Flex direction='column'>
                                <Heading as='h5' size='md' pt='10px' fontWeight='500'>Fourchette de prix </Heading>
                                <Text fontSize='sm' pt='10px'>Prix par nuit, frais et taxes compris</Text>
                                <PriceRangeSlider min={min} max={max} newSliderValue={newSliderValue} onSliderValueChange={handleSliderValueChange} />
                                <HStack>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='sm'>
                                            €
                                        </InputLeftElement>
                                        <Input placeholder='Minimum' fontSize='xs' value={newSliderValue[0]} readOnly />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                                            €
                                        </InputLeftElement>
                                        <Input placeholder='Maximum' fontSize='xs' value={newSliderValue[1]} readOnly />
                                    </InputGroup>
                                </HStack>
                            </Flex>
                            <Box>
                                <Heading as='h5' size='md' fontWeight='500'>  Équipements </Heading>
                                <Grid templateColumns='repeat(2, 1fr)' gap={2}>
                                    {data?.getEquipmentTypes && data.getEquipmentTypes.slice(0, limit).map((equipment: string) => (
                                        <Checkbox pt='20px' size='sm' colorScheme='gray' spacing='1rem' key={equipment}>
                                            {equipment}
                                        </Checkbox>
                                    ))}
                                </Grid>
                                <Flex>  <Link fontWeight='400' pt="10px" textDecoration='underline' onClick={handleSeeMore}>Afficher plus</Link> </Flex>
                            </Box>
                        </VStack>
                    </AlertDialogBody>
                    <Divider />
                    <AlertDialogFooter justifyContent="space-between">
                        <Button ref={cancelRef} bg="white">
                            Tout effacer
                        </Button>
                        <Button bg='#B4770A' ml={3} onClick={onClose} color='white' onClick={showResults}>
                            Afficher les logements
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default FilterDialog;

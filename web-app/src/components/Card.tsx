import { Badge, Box } from "@chakra-ui/react"; 
import { Image } from '@chakra-ui/react'
import { StarIcon} from '@chakra-ui/icons'

  const cardProperties = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt:"",
    //imageAlt: 'Rear view of modern home with pool',
    // beds: 3,
    // baths: 2,
    location : "Pau, France",
    title: 'Modern home in city center in the heart of historic Los Angeles',
    price: '$1,900.00',
    
  }

export default function Card  ()  {
  

  return (
    <Box cursor = 'pointer'  maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    <Image src={cardProperties.imageUrl} alt={cardProperties.imageAlt} />
   
    <Box p='6'>
      <Box display='flex' alignItems='baseline'>
        <Badge borderRadius='full' px='2' bg="#B4770A" color="white">
          New
        </Badge>
        {/* <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          ml='2'
        >
          {cardProperties.beds} beds &bull; {cardProperties.baths} baths
        </Box> */}
      </Box>

      <Box
        mt='1'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
        noOfLines={1}
      >
        {cardProperties.location}
      </Box>

      <Box>
        {cardProperties.price}
        <Box as='span' color='gray.600' fontSize='sm'>
        </Box>
      </Box>

      
    </Box>
  </Box>
  )
}
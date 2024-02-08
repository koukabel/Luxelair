import {  Badge, Box } from "@chakra-ui/react"; 
import { Image } from '@chakra-ui/react';
import Link from "next/link";


 interface props {
    id: string, 
    location: string, 
    price: number, 

  }

 const Card: React.FC<props> = ({id, location, price}) => {
  
  return (
        <Link href={`/ad/${id}`}>
          <Box cursor='pointer'  maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'> 
    <Image objectFit='cover' src="welcomePage.png" alt={id} /> 
   
    <Box p='6'></Box>
      <Box display='flex' alignItems='baseline'>
        <Badge borderRadius='full' px='2' bg="#B4770A" color="white">
          New
        </Badge>
      </Box>

      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" className="chakra-icon css-dnxjkp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">
        </path></svg>

      <Box
        mt='1'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
        noOfLines={1}
      >
        {location}
      </Box>

      <Box>
        {price}
        <Box as='span' color='gray.600' font-size='sm'>
        </Box>
      </Box>

      </Box>
    </Link>
 
  )
}

export default Card;



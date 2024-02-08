import { gql, useQuery } from "@apollo/client"
import { Box, Card, CardHeader, Heading, SimpleGrid, VStack } from "@chakra-ui/react"

export default function HouseType() {
    const GET_House_TYPES = gql`
query Query {
    HousingTypes
  }
  `

  const {data} = useQuery(GET_House_TYPES); 
console.log(data)
  const saveHousingType = (type: string) => {

  } 
    return (
        <VStack>
      <Box
        margin={"auto"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Heading p={10} textAlign={"left"}>
        Parmi les propositions suivantes, laquelle décrit le mieux votre logement ?
        </Heading>
        <SimpleGrid
          p={20}
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {data?.HousingTypes
            ? data.HousingTypes.map((type: string) => (
                <Card
                  key={type}
                  cursor="pointer"
                  onClick={() => saveHousingType(type)}
                >
                  <CardHeader>
                    <Heading size="sm">{type}</Heading>
                  </CardHeader>
                </Card>
              ))
            : null}
        </SimpleGrid>
      </Box>
    </VStack>
       
    
    
       )
}


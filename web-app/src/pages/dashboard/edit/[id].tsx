import {
  ChakraProvider,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  useToast,
  Flex,
} from "@chakra-ui/react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GET_MY_PROFIL } from "../../publishAd/CreateAdForm";
import {
  GetMyProfileQuery,
  HousingTypeEnum,
  UpdateAdMutation,
  UpdateAdMutationVariables,
} from "@/gql/graphql";
import { FaHouse } from "react-icons/fa6";

const GET_AD = gql`
  query ad($adId: ID!) {
    ad(id: $adId) {
      title
      price
      id
      location
      housingType
      equipements
      description
    }
  }
`;

const UPDATE_AD = gql`
  mutation UpdateAd(
    $title: String!
    $description: String!
    $location: String!
    $price: Float!
    $updateAdId: ID!
    $housingType: HousingTypeEnum
    $equipements: [String!]
    $userId: String!
  ) {
    updateAd(
      title: $title
      description: $description
      location: $location
      price: $price
      id: $updateAdId
      housingType: $housingType
      equipements: $equipements
      userId: $userId
    ) {
      id
      location
      price
      title
      housingType
      equipements
      description
    }
  }
`;

const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: ID!) {
    deleteAd(id: $deleteAdId) {
      id
      title
    }
  }
`;

export default function EditAd() {
  const GET_EQUIPEMENTS = gql`
    query getEquipements {
      getEquipmentTypes
    }
  `;

  const GET_HOUSE_TYPES = gql`
    query GetHousingTypes {
      getHousingTypes
    }
  `;
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GET_AD, {
    variables: { adId: id as string },
  });
  const { loading, error, data: equipementData } = useQuery(GET_EQUIPEMENTS);
  const { data: profileData, error: profileError } =
    useQuery<GetMyProfileQuery>(GET_MY_PROFIL);

  const [selectedEquipmentValues, setSelectedEquipmentValues] = useState<
    string[]
  >([]);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const { data: housingData } = useQuery(GET_HOUSE_TYPES);
  const [selectedType, setSelectedType] = useState<HousingTypeEnum | null>(
    null
  );
  const toast = useToast();
  const [deleteAd] = useMutation(DELETE_AD);

  const [updateAd, setUpdateAd] = useState<UpdateAdMutationVariables>({
    title: "",
    description: "",
    location: "",
    price: 0,
    housingType: "" as HousingTypeEnum,
    equipements: [],
    updateAdId: "",
    userId: "",
  });

  useEffect(() => {
    if (data) {
      const { ad } = data;
      setUpdateAd((prevState: any) => ({
        ...prevState,
        title: ad.title,
        description: ad.description,
        location: ad.location,
        price: ad.price,
        housingType: ad.housingType,
        equipements: ad.equipements,
        updateAdId: ad.id,
        userId: profileData?.myProfile.id || "",
      }));
    }
  }, [data]);

  const saveHousingType = (type: HousingTypeEnum) => {
    setSelectedType(type);
    setUpdateAd((prevState) => ({
      ...prevState,
      housingType: type,
    }));
  };

  const saveEquipementsList = (equipment: string) => {
    if (selectedCards.has(equipment)) {
      setSelectedCards((prevSelectedCards) => {
        const newSelectedCards = new Set(prevSelectedCards);
        newSelectedCards.delete(equipment);
        return newSelectedCards;
      });
      setSelectedEquipmentValues((prevValues) =>
        prevValues.filter((value) => value !== equipment)
      );
    } else {
      setSelectedCards((prevSelectedCards) =>
        new Set(prevSelectedCards).add(equipment)
      );
      setSelectedEquipmentValues((prevValues) => [...prevValues, equipment]);
    }
  };

  function handleChange(e: any) {
    const { name, value } = e.target;
    if (name === "price") {
      setUpdateAd((prevState) => ({
        ...prevState,
        [name]: parseFloat(value),
      }));
    } else {
      setUpdateAd((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  const [modifyAd] = useMutation<UpdateAdMutation, UpdateAdMutationVariables>(
    UPDATE_AD
  );
  const modifyNewAd = async () => {
    try {
      const loadingToastId = toast({
        title: "Chargement...",
        status: "info",
        duration: 500,
        isClosable: false,
      });
      setTimeout(async () => {
        try {
          const { data: dataAd } = await modifyAd({
            variables: {
              title: updateAd.title,
              description: updateAd.description,
              location: updateAd.location,
              price: updateAd.price,
              housingType: updateAd.housingType,
              equipements: selectedEquipmentValues,
              updateAdId: updateAd.updateAdId,
              userId: profileData?.myProfile.id || "",
            },
          });
          if (dataAd) {
            toast.close(loadingToastId);
            toast({
              title: "Modification effectuée",
              description:
                "Les nouvelles modifications ont bien été prises en compte",
              status: "success",
              duration: 2500,
              isClosable: true,
            });
            setTimeout(() => {
              router.push(`/dashboard/${profileData?.myProfile.id}`);
            }, 1500);
          }
        } catch (error) {
          toast.close(loadingToastId);
          toast({
            title: "Erreur lors de la modification",
            description:
              "Une erreur s'est produite lors de modification. Veuillez réessayer.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAd = async () => {
    try {
      const loadingToastId = toast({
        title: "Suppression en cours...",
        status: "info",
        duration: 500,
        isClosable: false,
      });

      const { data: deletedAd } = await deleteAd({
        variables: {
          deleteAdId: updateAd.updateAdId,
        },
      });

      if (deletedAd) {
        toast.close(loadingToastId);
        toast({
          title: "Annonce supprimée",
          description: "L'annonce a été supprimée avec succès.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setTimeout(() => {
          router.push(`/dashboard/${profileData?.myProfile.id}`);
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Erreur lors de la suppression",
        description:
          "Une erreur s'est produite lors de la suppression de l'annonce. Veuillez réessayer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (data) {
    return (
      <ChakraProvider>
        <Navbar />
        <VStack p="4" maxW="3xl" mx="auto" spacing="6">
          <FormControl>
            <FormLabel>Titre de l'annonce</FormLabel>
            <Input
              type="text"
              value={updateAd.title}
              name="title"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Prix de l'annonce</FormLabel>
            <Input
              type="number"
              value={updateAd.price}
              name="price"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Localisation</FormLabel>
            <Input
              type="text"
              value={updateAd.location}
              name="location"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Type du logement</FormLabel>
            <SimpleGrid
              columns={4}
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {housingData?.getHousingTypes.map((type: HousingTypeEnum) => (
                <Card
                  key={type}
                  cursor="pointer"
                  onClick={() => saveHousingType(type)}
                  bg={selectedType === type ? "lightGray" : "white"}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <CardHeader>
                    <FaHouse size={24} />
                  </CardHeader>
                  <CardBody>
                    <Heading size="xs">{type}</Heading>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </FormControl>

          <FormControl id="equipements">
            <FormLabel>Equipements du logement</FormLabel>
            <SimpleGrid columns={4} spacing={4}>
              {equipementData?.getEquipmentTypes.map((equipment: string) => (
                <Card
                  key={equipment}
                  cursor="pointer"
                  onClick={() => saveEquipementsList(equipment)}
                  bg={selectedCards.has(equipment) ? "lightGray" : "white"}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <CardHeader>
                    <Heading size="sm">{equipment}</Heading>
                  </CardHeader>
                </Card>
              ))}
            </SimpleGrid>
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={updateAd.description}
              name="description"
              onChange={handleChange}
            />
          </FormControl>
          <Flex>
            <Button colorScheme="blue" onClick={modifyNewAd}>
              Modifier
            </Button>
            <Button
              marginLeft="2rem"
              colorScheme="red"
              onClick={handleDeleteAd}
            >
              Supprimer
            </Button>
          </Flex>
        </VStack>
        <Footer />
      </ChakraProvider>
    );
  }
}

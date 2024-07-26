// eslint-disable-next-line
import { Box, ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import FirstStep from "@/components/AdCreationComponents/FirstStep/FirstStep";
import ControlButtons from "@/components/AdCreationComponents/FirstStep/ControlButtons";
import Login from "@/pages/authentication/login";
import Equipements from "@/components/AdCreationComponents/SecondStep/Equipements";
import HouseType from "@/components/AdCreationComponents/FirstStep/HouseType";
import SecondStep from "@/components/AdCreationComponents/SecondStep/SecondStep";
import ImageUploader from "@/components/AdCreationComponents/SecondStep/ImageUploader";
// import Location from "@/components/AdCreationComponents/FirstStep/Location";
import { useToast } from '@chakra-ui/react'
import AdTitle from "@/components/AdCreationComponents/SecondStep/AdTitle";
import AdDescription from "@/components/AdCreationComponents/SecondStep/AdDescription";
import ThirdStep from "@/components/AdCreationComponents/ThirdStep/ThirdStep";
import AdPrice from "@/components/AdCreationComponents/ThirdStep/AdPrice";
import FinalStep from "@/components/AdCreationComponents/ThirdStep/FinalStep";
import { gql, useMutation, useQuery } from "@apollo/client";
import router from "next/router";
import {
	AdCreationMutation,
	AdCreationMutationVariables,
	GetMyProfileQuery,
} from "@/gql/graphql";

import dynamic from "next/dynamic";

const Location = dynamic(
	() => import("../../components/AdCreationComponents/FirstStep/Location"),
	{
		ssr: false,
	}
);

export const GET_MY_PROFIL = gql`
	query GetMyProfile {
		myProfile {
			email
			id
			firstName
			lastName
		}
	}
`;

export default function CreateAdForm() {
	const [currentComponent, setCurrentComponent] = useState(1);
	const [progressValue, setProgressValue] = useState(10);
	const [hidePreviousButton, setHidePreviousButton] = useState(true);
	const [hideNextButton, setHideNextButton] = useState(false);
	const [isPublicationButtonShown, setIsPublicationButtonShown] =  useState(false);
	const { data, error } = useQuery<GetMyProfileQuery>(GET_MY_PROFIL);

	const [publishAdInfo, setPublishAdInfo] =
		useState<AdCreationMutationVariables>({
			title: "",
			description: "",
			location: "",
			price: 0,
			equipements: [],
			housingType: null,
			userId: "",
		});
	const [fileInForm, setFileInForm] = useState<File | null>(null);

	useEffect(() => {
		if (data?.myProfile) {
			setPublishAdInfo({
				...publishAdInfo,
				userId: data.myProfile.id,
			});
		}
	}, [data]);

	const handleChange = (fieldName: string, newValue: string | number) => {
		setPublishAdInfo({
			...publishAdInfo,
			[fieldName]: newValue,
		});
	};

	const handleNext = () => {
		setProgressValue((prevProgress) => prevProgress + 10);
		setCurrentComponent((currentComponent) => currentComponent + 1);
	};

	const handlePrevious = () => {
		setProgressValue((prevProgress) => prevProgress - 10);
		setCurrentComponent((currentComponent) => currentComponent - 1);
	};
	const toast = useToast()
	const CREATE_AD = gql`
		mutation adCreation(
			$title: String!
			$description: String!
			$location: String!
			$price: Float!
			$equipements: [String!]
			$housingType: HousingTypeEnum
			$userId: String!
		) {
			createAd(
				title: $title
				description: $description
				location: $location
				price: $price
				equipements: $equipements
				housingType: $housingType
				userId: $userId
			) {
				id
			}
		}
	`;

	const [createAd] = useMutation<
		AdCreationMutation,
		AdCreationMutationVariables
	>(CREATE_AD);

	const uploadImage = async (id: string) => {
		const { readAndCompressImage } = await import("browser-image-resizer");
		if (fileInForm) {
			const resizedJpgFile = await readAndCompressImage(fileInForm, {
				quality: 0.75,
				maxWidth: 1440,
			});
			const body = new FormData();
			body.append("file", resizedJpgFile, `${id}.jpg`);
			await fetch("/file-hosting", {
				method: "POST",
				body,
			});
		}
	};

	const publishAd = async () => {
		try {
			const { data } = await createAd({
				variables: {
					title: publishAdInfo.title,
					price: publishAdInfo.price as number,
					location: publishAdInfo.location,
					description: publishAdInfo.description,
					equipements: publishAdInfo.equipements,
					housingType: publishAdInfo.housingType,
					userId: publishAdInfo.userId,
				},
			});

			if (data) {
				const { id } = data.createAd;
				await uploadImage(id);
				router.push(`/ad/${data.createAd.id}`);
				toast({
					title: "Félicitation 🎉",
					description: "Votre annonce est désormais publiée",
					status: "success",
					duration: 5000,
					position: 'top-right',
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Error publishing ad:", error);
			toast({
				title: "Erreur de publication",
				description: "Une erreur est survenue lors de la publication de l'annonce.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleSubmit = () => {
		publishAd();
	};


	useEffect(() => {
		// Hide previous button if currentComponent is 1
		setHidePreviousButton(currentComponent === 1);
		// Hide next button if currentComponent is 11
		setHideNextButton(currentComponent === 10);

		setIsPublicationButtonShown(currentComponent === 10)
	  }, [currentComponent]);

	  
	return !data?.myProfile ? (
		<Login />
	) : (
		<ChakraProvider>
			<Box height="100vh" display="flex" flexDirection="column">
				<Navbar />
				<Box flex="1" overflow="auto" mt="182px">
					{currentComponent === 1 && <FirstStep />}
					{currentComponent === 2 && (
						<Equipements
							onSelectedEquipmentChange={(selectedValues) =>
								setPublishAdInfo({
									...publishAdInfo,
									equipements: selectedValues,
								})
							}
						/>
					)}
					{currentComponent === 3 && (
						<HouseType
							onSelectedTypeChange={(housingType) =>
								setPublishAdInfo({
									...publishAdInfo,
									housingType: housingType,
								})
							}
						/>
					)}

					{currentComponent === 4 && <SecondStep />}
					{currentComponent === 5 && (
						<ImageUploader
							onFileSelect={(file: File | null) => setFileInForm(file)}
						/>
					)}

					{currentComponent === 6 && (
						<Location
							onLocationChange={(newLocation: string) =>
								setPublishAdInfo({ ...publishAdInfo, location: newLocation })
							}
						/>
					)}

					{currentComponent === 7 && (
						<AdTitle
							value={publishAdInfo.title}
							onChange={(newValue: string) => handleChange("title", newValue)}
						/>
					)}
					{currentComponent === 8 && (
						<AdDescription
							value={publishAdInfo.description}
							onChange={(newValue: string) =>
								handleChange("description", newValue)
							}
						/>
					)}
					{currentComponent === 9 && <ThirdStep />}
					{currentComponent === 10 && (
						<AdPrice
							value={publishAdInfo.price}
							onChange={(newValue: number) => handleChange("price", newValue)}
						/>
					)}

					<ControlButtons
						handleNext={handleNext}
						handlePrevious={handlePrevious}
						progressValue={progressValue}
						hidePreviousButton={hidePreviousButton}
						hideNextButton={hideNextButton}
						handleSubmit={handleSubmit}
						isPublicationButtonShown={isPublicationButtonShown}
					/>
				</Box>
				<Footer />
			</Box>
		</ChakraProvider>
	);
}

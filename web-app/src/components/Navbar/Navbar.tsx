import React from "react";
import { Flex, Image, Heading, Spacer, Link, Avatar } from "@chakra-ui/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GetMyProfileQuery, SignOutMutation } from "@/gql/graphql";

const GET_MY_PROFIL = gql`
  query GetMyProfile {
    myProfile {
      email
      id
      firstName
      lastName
    }
  }
`;

const LOGOUT = gql`
  mutation SignOut {
    signOut
  }
`;

export default function Navbar() {
  const { data, error } = useQuery<GetMyProfileQuery>(GET_MY_PROFIL);
  const [signOut] = useMutation<SignOutMutation>(LOGOUT);

  const handleSignOut = async () => {
    await signOut();
  };

	return (
		<Flex alignItems="center">
			<Link href="/">
				<Image src="/logoWhite.png" boxSize="150px" objectFit="contain" />
			</Link>
			<Heading className="mainHeading">LUXELAIR</Heading>
			<Spacer />
			<Flex direction="row" alignItems="center" gap={5} padding="10">
				<Link
					cursor={"pointer"}
					fontWeight="light"
					fontSize="16px"
					href={data?.myProfile ? "/publishAd/CreateAdForm" : "/authentification/login"}
				>
					Mettre ma propriété sur Luxelair
				</Link>
				{data?.myProfile ? (
           <>
           <Link
            cursor={"pointer"}
            fontWeight="light"
            fontSize="16px"
            onClick={handleSignOut}
            href="/login"
          >
            Déconnexion
          </Link>
					<Link
						cursor={"pointer"}
						fontWeight="light"
						fontSize="16px"
						href={`/profil/traveler/${data?.myProfile.id}`}
					>
						<Avatar cursor="pointer" bg="#B4770A" />
					</Link>
          </>
				) : (
					<Link
						cursor={"pointer"}
						fontWeight="light"
						fontSize="16px"
						href="/authentication/login"
					>
						Connexion
					</Link>
				)}
			</Flex>
		</Flex>
	);
}

import { render, screen, waitFor } from "@testing-library/react";
import CreateAdForm from "@/pages/CreateAdForm";
import { GetMyProfileQuery } from "@/gql/graphql";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_MY_PROFIL } from "@/pages/CreateAdForm";
import exp from "constants";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("CreateAdForm", () => {
  const MOCK_GET_MY_PROFIL_SIGN_IN: MockedResponse<GetMyProfileQuery> = {
    request: {
      query: GET_MY_PROFIL,
    },
    result: {
      data: {
        myProfile: {
          id: "1234",
          email: "test@test.com",
          firstName: "test",
          lastName: "test",
        },
      },
    },
  };
  describe("if user not signed-in", () => {
    const MOCK_GET_MY_PROFIL_NOT_SIGN_IN: MockedResponse<GetMyProfileQuery> = {
      request: {
        query: GET_MY_PROFIL,
      },
    };
    it("renders links to sign-in", () => {
      render(
        <MockedProvider mocks={[MOCK_GET_MY_PROFIL_NOT_SIGN_IN]}>
          <CreateAdForm />
        </MockedProvider>
      );
      expect(screen.getByText("Connectez-vous"));
      expect(screen.getByText("Se connecter"));
      expect(screen.getByRole("button", { name: "Se connecter" }));
    });
  });
  describe("if user signed-in", () => {
    it("renders form", async () => {
      render(
        <MockedProvider mocks={[MOCK_GET_MY_PROFIL_SIGN_IN]}>
          <CreateAdForm />
        </MockedProvider>
      );
      await waitFor(() => {
        expect(screen.getByText("Étape 1"));
        expect(screen.queryByRole("form")).not.toBeInTheDocument();
        expect(
          screen.getByText(
            "Au cours de cette étape, nous allons vous demander quel type de logement vous proposez et si les voyageurs pourront le réserver dans son intégralité ou si vous ne louez qu'une chambre. Nous vous demanderons ensuite d'indiquer son emplacement et sa capacité d'accueil."
          )
        ).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Test image" }));
      });
    });
  });
});

/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n    query GetHousingTypes {\n      getHousingTypes\n    }\n  ":
    types.GetHousingTypesDocument,
  "\nquery getEquipements {\n  getEquipmentTypes\n}\n":
    types.GetEquipementsDocument,
  "\n  mutation Login($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation CreateUser(\n    $email: String!\n    $password: String!\n    $lastName: String!\n    $firstName: String!\n  ) {\n    createUser(\n      email: $email\n      password: $password\n      lastName: $lastName\n      firstName: $firstName\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n":
    types.CreateUserDocument,
  "\n        query getEquipements {\n            getEquipmentTypes\n        }\n    ":
    types.GetEquipementsDocument,
  "\n    query FilerByPrice($max: Float!, $min: Float!) {\n        filerByPrice(max: $max, min: $min) {\n          id\n        }\n    }":
    types.FilerByPriceDocument,
  "\n  query GetHousingTypes {\n    getHousingTypes\n  }\n":
    types.GetHousingTypesDocument,
  "\nquery filterType($type: String!) {\n  filterByHouseType(type: $type) {\n    housingType\n    id\n  }\n}":
    types.FilterTypeDocument,
  "\n  query GetMyProfile {\n    myProfile {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n":
    types.GetMyProfileDocument,
  "\n  mutation SignOut {\n    signOut\n  }\n": types.SignOutDocument,
  "\nquery SearchAd($location: String!) {\n  search(location: $location) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n":
    types.SearchAdDocument,
  "\n\tquery GetMyProfilUpdate {\n\t  myProfile {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t\tlocation\n\t\tdescription\n\t\tcity\n\t\tphoneNumber\n\t  }\n\t}\n  ":
    types.GetMyProfilUpdateDocument,
  "\n\tmutation UpdateUser(\n\t  $email: String!\n\t  $updateUserId: ID!\n\t  $description: String\n\t  $city: String\n\t  $location: String\n\t  $phoneNumber: String\n\t  $lastName: String!\n\t  $firstName: String!\n\t) {\n\t  updateUser(\n\t\temail: $email\n\t\tid: $updateUserId\n\t\tdescription: $description\n\t\tcity: $city\n\t\tlocation: $location\n\t\tphoneNumber: $phoneNumber\n\t\tlastName: $lastName\n\t\tfirstName: $firstName\n\t  ) {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t  }\n\t}\n  ":
    types.UpdateUserDocument,
  "\n  query GetBookingsByUser($userId: String!) {\n    getBookingsByUser(userId: $userId) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      statusPayment\n      totalPrice\n      status\n      ad {\n        id\n        image\n        title\n        description\n      }\n    }\n  }\n":
    types.GetBookingsByUserDocument,
  "\n\tquery GetMyProfil {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tfirstName\n\t\t\tid\n\t\t\tlastName\n\t\t\tcity\n\t\t\tlocation\n\t\t\tphoneNumber\n\t\t\tdescription\n\t\t}\n\t}\n":
    types.GetMyProfilDocument,
  "\n  query getAd($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      price\n      location\n      description\n      image\n      equipements\n      housingType\n    }\n  }\n":
    types.GetAdDocument,
  "\n  query ad($adId: ID!) {\n    ad(id: $adId) {\n      title\n      price\n      id\n      location\n      housingType\n      equipements\n      description\n    }\n  }\n":
    types.AdDocument,
  "\n  mutation createBooking(\n    $checkinDate: DateTimeISO!\n    $checkoutDate: DateTimeISO!\n    $adId: String!\n    $userId: String!\n    $statusPayment: Boolean!\n    $totalPrice: Float!\n  ) {\n    createBooking(\n      checkinDate: $checkinDate\n      checkoutDate: $checkoutDate\n      adId: $adId\n      userId: $userId\n      statusPayment: $statusPayment\n      totalPrice: $totalPrice\n    ) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      totalPrice\n    }\n  }\n":
    types.CreateBookingDocument,
  "\n  query GetBooking($getBookingId: String!) {\n    getBooking(id: $getBookingId) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      status\n      statusPayment\n      totalPrice\n      ad {\n        id\n        housingType\n        equipements\n        description\n        image\n        price\n        title\n        location\n      }\n    }\n  }\n":
    types.GetBookingDocument,
  "\n  query User($userId: ID!) {\n    user(id: $userId) {\n      id\n      lastName\n      location\n      phoneNumber\n      firstName\n      email\n      description\n      city\n    }\n  }\n":
    types.UserDocument,
  "\n    mutation adCreation(\n      $title: String!\n      $description: String!\n      $location: String!\n      $price: Float!\n      $equipements: [String!]\n      $housingType: HousingTypeEnum\n      $userId: String!\n    ) {\n      createAd(\n        title: $title\n        description: $description\n        location: $location\n        price: $price\n        equipements: $equipements\n        housingType: $housingType\n        userId: $userId\n      ) {\n        id\n      }\n    }\n  ":
    types.AdCreationDocument,
  "\n  query Ads {\n    getAds {\n      location\n      price\n      title\n      id\n    }\n  }\n":
    types.AdsDocument,
  "\n  query FilterByPrice($min: Float!, $max: Float!) {\n    filerByPrice(min: $min, max: $max) {\n      id\n      price\n      location\n      image\n    }\n  }\n":
    types.FilterByPriceDocument,
  "\nquery FilterByHouseType($type: String!) {\n  filterByHouseType(type: $type) {\n    id\n  }\n}\n":
    types.FilterByHouseTypeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GetHousingTypes {\n      getHousingTypes\n    }\n  "
): (typeof documents)["\n    query GetHousingTypes {\n      getHousingTypes\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\nquery getEquipements {\n  getEquipmentTypes\n}\n"
): (typeof documents)["\nquery getEquipements {\n  getEquipmentTypes\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Login($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n"
): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateUser(\n    $email: String!\n    $password: String!\n    $lastName: String!\n    $firstName: String!\n  ) {\n    createUser(\n      email: $email\n      password: $password\n      lastName: $lastName\n      firstName: $firstName\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateUser(\n    $email: String!\n    $password: String!\n    $lastName: String!\n    $firstName: String!\n  ) {\n    createUser(\n      email: $email\n      password: $password\n      lastName: $lastName\n      firstName: $firstName\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        query getEquipements {\n            getEquipmentTypes\n        }\n    "
): (typeof documents)["\n        query getEquipements {\n            getEquipmentTypes\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query FilerByPrice($max: Float!, $min: Float!) {\n        filerByPrice(max: $max, min: $min) {\n          id\n        }\n    }"
): (typeof documents)["\n    query FilerByPrice($max: Float!, $min: Float!) {\n        filerByPrice(max: $max, min: $min) {\n          id\n        }\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetHousingTypes {\n    getHousingTypes\n  }\n"
): (typeof documents)["\n  query GetHousingTypes {\n    getHousingTypes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\nquery filterType($type: String!) {\n  filterByHouseType(type: $type) {\n    housingType\n    id\n  }\n}"
): (typeof documents)["\nquery filterType($type: String!) {\n  filterByHouseType(type: $type) {\n    housingType\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetMyProfile {\n    myProfile {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n"
): (typeof documents)["\n  query GetMyProfile {\n    myProfile {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SignOut {\n    signOut\n  }\n"
): (typeof documents)["\n  mutation SignOut {\n    signOut\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\nquery SearchAd($location: String!) {\n  search(location: $location) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n"
): (typeof documents)["\nquery SearchAd($location: String!) {\n  search(location: $location) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tquery GetMyProfilUpdate {\n\t  myProfile {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t\tlocation\n\t\tdescription\n\t\tcity\n\t\tphoneNumber\n\t  }\n\t}\n  "
): (typeof documents)["\n\tquery GetMyProfilUpdate {\n\t  myProfile {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t\tlocation\n\t\tdescription\n\t\tcity\n\t\tphoneNumber\n\t  }\n\t}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tmutation UpdateUser(\n\t  $email: String!\n\t  $updateUserId: ID!\n\t  $description: String\n\t  $city: String\n\t  $location: String\n\t  $phoneNumber: String\n\t  $lastName: String!\n\t  $firstName: String!\n\t) {\n\t  updateUser(\n\t\temail: $email\n\t\tid: $updateUserId\n\t\tdescription: $description\n\t\tcity: $city\n\t\tlocation: $location\n\t\tphoneNumber: $phoneNumber\n\t\tlastName: $lastName\n\t\tfirstName: $firstName\n\t  ) {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t  }\n\t}\n  "
): (typeof documents)["\n\tmutation UpdateUser(\n\t  $email: String!\n\t  $updateUserId: ID!\n\t  $description: String\n\t  $city: String\n\t  $location: String\n\t  $phoneNumber: String\n\t  $lastName: String!\n\t  $firstName: String!\n\t) {\n\t  updateUser(\n\t\temail: $email\n\t\tid: $updateUserId\n\t\tdescription: $description\n\t\tcity: $city\n\t\tlocation: $location\n\t\tphoneNumber: $phoneNumber\n\t\tlastName: $lastName\n\t\tfirstName: $firstName\n\t  ) {\n\t\temail\n\t\tfirstName\n\t\tid\n\t\tlastName\n\t  }\n\t}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetBookingsByUser($userId: String!) {\n    getBookingsByUser(userId: $userId) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      statusPayment\n      totalPrice\n      status\n      ad {\n        id\n        image\n        title\n        description\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetBookingsByUser($userId: String!) {\n    getBookingsByUser(userId: $userId) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      statusPayment\n      totalPrice\n      status\n      ad {\n        id\n        image\n        title\n        description\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tquery GetMyProfil {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tfirstName\n\t\t\tid\n\t\t\tlastName\n\t\t\tcity\n\t\t\tlocation\n\t\t\tphoneNumber\n\t\t\tdescription\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery GetMyProfil {\n\t\tmyProfile {\n\t\t\temail\n\t\t\tfirstName\n\t\t\tid\n\t\t\tlastName\n\t\t\tcity\n\t\t\tlocation\n\t\t\tphoneNumber\n\t\t\tdescription\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getAd($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      price\n      location\n      description\n      image\n      equipements\n      housingType\n    }\n  }\n"
): (typeof documents)["\n  query getAd($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      price\n      location\n      description\n      image\n      equipements\n      housingType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ad($adId: ID!) {\n    ad(id: $adId) {\n      title\n      price\n      id\n      location\n      housingType\n      equipements\n      description\n    }\n  }\n"
): (typeof documents)["\n  query ad($adId: ID!) {\n    ad(id: $adId) {\n      title\n      price\n      id\n      location\n      housingType\n      equipements\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation createBooking(\n    $checkinDate: DateTimeISO!\n    $checkoutDate: DateTimeISO!\n    $adId: String!\n    $userId: String!\n    $statusPayment: Boolean!\n    $totalPrice: Float!\n  ) {\n    createBooking(\n      checkinDate: $checkinDate\n      checkoutDate: $checkoutDate\n      adId: $adId\n      userId: $userId\n      statusPayment: $statusPayment\n      totalPrice: $totalPrice\n    ) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      totalPrice\n    }\n  }\n"
): (typeof documents)["\n  mutation createBooking(\n    $checkinDate: DateTimeISO!\n    $checkoutDate: DateTimeISO!\n    $adId: String!\n    $userId: String!\n    $statusPayment: Boolean!\n    $totalPrice: Float!\n  ) {\n    createBooking(\n      checkinDate: $checkinDate\n      checkoutDate: $checkoutDate\n      adId: $adId\n      userId: $userId\n      statusPayment: $statusPayment\n      totalPrice: $totalPrice\n    ) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      totalPrice\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetBooking($getBookingId: String!) {\n    getBooking(id: $getBookingId) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      status\n      statusPayment\n      totalPrice\n      ad {\n        id\n        housingType\n        equipements\n        description\n        image\n        price\n        title\n        location\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetBooking($getBookingId: String!) {\n    getBooking(id: $getBookingId) {\n      checkinDate\n      checkoutDate\n      datePayment\n      id\n      status\n      statusPayment\n      totalPrice\n      ad {\n        id\n        housingType\n        equipements\n        description\n        image\n        price\n        title\n        location\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Ads {\n    getAds {\n      location\n      price\n      title\n      id\n    }\n  }\n"
): (typeof documents)["\n  query Ads {\n    getAds {\n      location\n      price\n      title\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query User($userId: ID!) {\n    user(id: $userId) {\n      id\n      lastName\n      location\n      phoneNumber\n      firstName\n      email\n      description\n      city\n    }\n  }\n"
): (typeof documents)["\n  query User($userId: ID!) {\n    user(id: $userId) {\n      id\n      lastName\n      location\n      phoneNumber\n      firstName\n      email\n      description\n      city\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation adCreation(\n      $title: String!\n      $description: String!\n      $location: String!\n      $price: Float!\n      $equipements: [String!]\n      $housingType: HousingTypeEnum\n      $userId: String!\n    ) {\n      createAd(\n        title: $title\n        description: $description\n        location: $location\n        price: $price\n        equipements: $equipements\n        housingType: $housingType\n        userId: $userId\n      ) {\n        id\n      }\n    }\n  "
): (typeof documents)["\n    mutation adCreation(\n      $title: String!\n      $description: String!\n      $location: String!\n      $price: Float!\n      $equipements: [String!]\n      $housingType: HousingTypeEnum\n      $userId: String!\n    ) {\n      createAd(\n        title: $title\n        description: $description\n        location: $location\n        price: $price\n        equipements: $equipements\n        housingType: $housingType\n        userId: $userId\n      ) {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Ads {\n    getAds {\n      location\n      price\n      title\n      id\n    }\n  }\n"
): (typeof documents)["\n  query Ads {\n    getAds {\n      location\n      price\n      title\n      id\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query FilterByPrice($min: Float!, $max: Float!) {\n    filerByPrice(min: $min, max: $max) {\n      id\n      price\n      location\n      image\n    }\n  }\n"
): (typeof documents)["\n  query FilterByPrice($min: Float!, $max: Float!) {\n    filerByPrice(min: $min, max: $max) {\n      id\n      price\n      location\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\nquery FilterByHouseType($type: String!) {\n  filterByHouseType(type: $type) {\n    id\n  }\n}\n"
): (typeof documents)["\nquery FilterByHouseType($type: String!) {\n  filterByHouseType(type: $type) {\n    id\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\nmutation Login($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n": types.LoginDocument,
    "\n  mutation CreateAd(\n    $title: String!\n    $location: String!\n    $price: Float!\n    $description: String\n  ) {\n    createAd(\n      title: $title\n      location: $location\n      price: $price\n      description: $description\n    ) {\n      id\n      title\n      location\n      price\n      description\n    }\n  }\n": types.CreateAdDocument,
    "\n  query GetMyProfile {\n    myProfile {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n": types.GetMyProfileDocument,
    "\nmutation CreateUser($email: String!, $password: String!, $lastName: String!, $firstName: String!) {\n    createUser(email: $email, password: $password, lastName: $lastName, firstName: $firstName) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n": types.CreateUserDocument,
    "\nquery SearchAd($title: String!) {\n  search(title: $title) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n": types.SearchAdDocument,
    "\n  query GetMyProfilUpdate {\n    myProfile {\n      email\n      firstName\n      id\n      lastName\n      location\n      description\n      city\n      phoneNumber\n    }\n  }\n": types.GetMyProfilUpdateDocument,
    "\n  mutation UpdateUser(\n    $email: String!\n    $updateUserId: ID!\n    $description: String\n    $city: String\n    $location: String\n    $phoneNumber: String\n    $lastName: String!\n    $firstName: String!\n    $password: String!\n  ) {\n    updateUser(\n      email: $email\n      id: $updateUserId\n      description: $description\n      city: $city\n      location: $location\n      phoneNumber: $phoneNumber\n      lastName: $lastName\n      firstName: $firstName\n      password: $password\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n": types.UpdateUserDocument,
    "\nquery GetMyProfil {\n\tmyProfile {\n\t  email\n\t  firstName\n\t  id\n\t  lastName\n\t  city\n\t  location\n\t  phoneNumber\n\t  description\n\t}\n  }\n": types.GetMyProfilDocument,
    "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n": types.AdDocument,
    "\n\tquery Ads {\n\t\tads {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n": types.AdsDocument,
    "\nquery User($userId: ID!) {\n\tuser(id: $userId) {\n\t  id\n\t  lastName\n\t  location\n\t  phoneNumber\n\t  firstName\n\t  email\n\t  description\n\t  city\n\t}\n  }\n": types.UserDocument,
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
export function graphql(source: "\nmutation Login($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n"): (typeof documents)["\nmutation Login($email: String!, $password: String!) {\n  signIn(email: $email, password: $password) {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAd(\n    $title: String!\n    $location: String!\n    $price: Float!\n    $description: String\n  ) {\n    createAd(\n      title: $title\n      location: $location\n      price: $price\n      description: $description\n    ) {\n      id\n      title\n      location\n      price\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAd(\n    $title: String!\n    $location: String!\n    $price: Float!\n    $description: String\n  ) {\n    createAd(\n      title: $title\n      location: $location\n      price: $price\n      description: $description\n    ) {\n      id\n      title\n      location\n      price\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyProfile {\n    myProfile {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query GetMyProfile {\n    myProfile {\n      email\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateUser($email: String!, $password: String!, $lastName: String!, $firstName: String!) {\n    createUser(email: $email, password: $password, lastName: $lastName, firstName: $firstName) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"): (typeof documents)["\nmutation CreateUser($email: String!, $password: String!, $lastName: String!, $firstName: String!) {\n    createUser(email: $email, password: $password, lastName: $lastName, firstName: $firstName) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery SearchAd($title: String!) {\n  search(title: $title) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n"): (typeof documents)["\nquery SearchAd($title: String!) {\n  search(title: $title) {\n    title\n    price\n    location\n    id\n    description\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyProfilUpdate {\n    myProfile {\n      email\n      firstName\n      id\n      lastName\n      location\n      description\n      city\n      phoneNumber\n    }\n  }\n"): (typeof documents)["\n  query GetMyProfilUpdate {\n    myProfile {\n      email\n      firstName\n      id\n      lastName\n      location\n      description\n      city\n      phoneNumber\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser(\n    $email: String!\n    $updateUserId: ID!\n    $description: String\n    $city: String\n    $location: String\n    $phoneNumber: String\n    $lastName: String!\n    $firstName: String!\n    $password: String!\n  ) {\n    updateUser(\n      email: $email\n      id: $updateUserId\n      description: $description\n      city: $city\n      location: $location\n      phoneNumber: $phoneNumber\n      lastName: $lastName\n      firstName: $firstName\n      password: $password\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser(\n    $email: String!\n    $updateUserId: ID!\n    $description: String\n    $city: String\n    $location: String\n    $phoneNumber: String\n    $lastName: String!\n    $firstName: String!\n    $password: String!\n  ) {\n    updateUser(\n      email: $email\n      id: $updateUserId\n      description: $description\n      city: $city\n      location: $location\n      phoneNumber: $phoneNumber\n      lastName: $lastName\n      firstName: $firstName\n      password: $password\n    ) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetMyProfil {\n\tmyProfile {\n\t  email\n\t  firstName\n\t  id\n\t  lastName\n\t  city\n\t  location\n\t  phoneNumber\n\t  description\n\t}\n  }\n"): (typeof documents)["\nquery GetMyProfil {\n\tmyProfile {\n\t  email\n\t  firstName\n\t  id\n\t  lastName\n\t  city\n\t  location\n\t  phoneNumber\n\t  description\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ads {\n\t\tads {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ads {\n\t\tads {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery User($userId: ID!) {\n\tuser(id: $userId) {\n\t  id\n\t  lastName\n\t  location\n\t  phoneNumber\n\t  firstName\n\t  email\n\t  description\n\t  city\n\t}\n  }\n"): (typeof documents)["\nquery User($userId: ID!) {\n\tuser(id: $userId) {\n\t  id\n\t  lastName\n\t  location\n\t  phoneNumber\n\t  firstName\n\t  email\n\t  description\n\t  city\n\t}\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
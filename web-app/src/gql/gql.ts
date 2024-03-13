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
    "\n    mutation CreateAd(\n        $title: String!, \n        $location: String!, \n        $price: Float!, \n        $description: String) {\n    createAd(title: $title, location: $location, price: $price, description: $description) {\n      title\n      location\n      price\n      description\n    }\n  } \n": types.CreateAdDocument,
    "\nquery GetMyProfile {\n  myProfile {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n": types.GetMyProfileDocument,
    "\nmutation CreateUser($email: String!, $password: String!, $lastName: String, $firstName: String) {\n    createUser(email: $email, password: $password, lastName: $lastName, firstName: $firstName) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n": types.CreateUserDocument,
    "\n  query Ads {\n    ads {\n      location\n      price\n      title\n      id\n    }\n  }\n": types.AdsDocument,
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
export function graphql(source: "\n    mutation CreateAd(\n        $title: String!, \n        $location: String!, \n        $price: Float!, \n        $description: String) {\n    createAd(title: $title, location: $location, price: $price, description: $description) {\n      title\n      location\n      price\n      description\n    }\n  } \n"): (typeof documents)["\n    mutation CreateAd(\n        $title: String!, \n        $location: String!, \n        $price: Float!, \n        $description: String) {\n    createAd(title: $title, location: $location, price: $price, description: $description) {\n      title\n      location\n      price\n      description\n    }\n  } \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetMyProfile {\n  myProfile {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n"): (typeof documents)["\nquery GetMyProfile {\n  myProfile {\n    email\n    id\n    firstName\n    lastName\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateUser($email: String!, $password: String!, $lastName: String, $firstName: String) {\n    createUser(email: $email, password: $password, lastName: $lastName, firstName: $firstName) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"): (typeof documents)["\nmutation CreateUser($email: String!, $password: String!, $lastName: String, $firstName: String) {\n    createUser(email: $email, password: $password, lastName: $lastName, firstName: $firstName) {\n      email\n      firstName\n      id\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Ads {\n    ads {\n      location\n      price\n      title\n      id\n    }\n  }\n"): (typeof documents)["\n  query Ads {\n    ads {\n      location\n      price\n      title\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
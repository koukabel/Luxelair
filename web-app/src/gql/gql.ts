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
    "\n    query GetHousingTypes {\n        getHousingTypes\n      }\n  ": types.GetHousingTypesDocument,
    "\n  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {\n    getEquipmentsList(equipmentTypes: $equipmentTypes)\n  }\n": types.GetEquipmentsDocument,
    "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n": types.AdDocument,
    "\n\tquery Ads {\n\t\tgetAds {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n": types.AdsDocument,
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
export function graphql(source: "\n    query GetHousingTypes {\n        getHousingTypes\n      }\n  "): (typeof documents)["\n    query GetHousingTypes {\n        getHousingTypes\n      }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {\n    getEquipmentsList(equipmentTypes: $equipmentTypes)\n  }\n"): (typeof documents)["\n  query getEquipments($equipmentTypes: [EquipmentTypeEnum!]!) {\n    getEquipmentsList(equipmentTypes: $equipmentTypes)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ads {\n\t\tgetAds {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ads {\n\t\tgetAds {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
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
<<<<<<< HEAD
    "\n  mutation CreateAd(\n    $title: String!\n    $location: String!\n    $price: Float!\n    $description: String\n    $type: HousingTypeEnum\n    $equipments: [EquipmentTypeEnum!]\n    $selectedEquipmentValues: [EquipmentValueInput!]\n  ) {\n    createAd(\n      title: $title\n      location: $location\n      price: $price\n      description: $description\n      type: $type\n      equipments: $equipments\n      selectedEquipmentValues: $selectedEquipmentValues\n    ) {\n      title\n      price\n      location\n      description\n    }\n  }\n": types.CreateAdDocument,
    "\n  query Query($equipmentTypes: [EquipmentTypeEnum!]!) {\n    equipmentValues(equipmentTypes: $equipmentTypes)\n  }\n": types.QueryDocument,
    "\n  query Ads {\n    ads {\n      location\n      price\n      title\n      id\n    }\n  }\n": types.AdsDocument,
=======
    "\n    mutation CreateAd(\n        $title: String!, \n        $location: String!, \n        $price: Float!, \n        $description: String) {\n    createAd(title: $title, location: $location, price: $price, description: $description) {\n      title\n      location\n      price\n      description\n    }\n  } \n": types.CreateAdDocument,
    "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n": types.AdDocument,
    "\n\tquery Ads {\n\t\tads {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n": types.AdsDocument,
>>>>>>> dev
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
export function graphql(source: "\n  mutation CreateAd(\n    $title: String!\n    $location: String!\n    $price: Float!\n    $description: String\n    $type: HousingTypeEnum\n    $equipments: [EquipmentTypeEnum!]\n    $selectedEquipmentValues: [EquipmentValueInput!]\n  ) {\n    createAd(\n      title: $title\n      location: $location\n      price: $price\n      description: $description\n      type: $type\n      equipments: $equipments\n      selectedEquipmentValues: $selectedEquipmentValues\n    ) {\n      title\n      price\n      location\n      description\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAd(\n    $title: String!\n    $location: String!\n    $price: Float!\n    $description: String\n    $type: HousingTypeEnum\n    $equipments: [EquipmentTypeEnum!]\n    $selectedEquipmentValues: [EquipmentValueInput!]\n  ) {\n    createAd(\n      title: $title\n      location: $location\n      price: $price\n      description: $description\n      type: $type\n      equipments: $equipments\n      selectedEquipmentValues: $selectedEquipmentValues\n    ) {\n      title\n      price\n      location\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Query($equipmentTypes: [EquipmentTypeEnum!]!) {\n    equipmentValues(equipmentTypes: $equipmentTypes)\n  }\n"): (typeof documents)["\n  query Query($equipmentTypes: [EquipmentTypeEnum!]!) {\n    equipmentValues(equipmentTypes: $equipmentTypes)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ad($adId: ID!) {\n\t\tad(id: $adId) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tprice\n\t\t\tlocation\n\t\t\tdescription\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Ads {\n\t\tads {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Ads {\n\t\tads {\n\t\t\tlocation\n\t\t\tprice\n\t\t\ttitle\n\t\t\tid\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
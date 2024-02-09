/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  bookings: Array<Booking>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  location: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  checkinDate: Scalars['DateTimeISO']['output'];
  checkoutDate: Scalars['DateTimeISO']['output'];
  datePayment: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  status: Scalars['Boolean']['output'];
  statusPayment: Scalars['Boolean']['output'];
};

export enum EquipmentTypeEnum {
  Bathroom = 'Bathroom',
  Electronics = 'Electronics',
  EssentialEquipmentsEnum = 'EssentialEquipmentsEnum',
  ExceptionalServices = 'ExceptionalServices',
  Forniture = 'Forniture',
  Kitchen = 'Kitchen',
  SecurityEquipement = 'SecurityEquipement'
}

export type EquipmentValueInput = {
  equipmentType: EquipmentTypeEnum;
  selectedValues?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum HousingTypeEnum {
  Appartement = 'Appartement',
  Chalet = 'Chalet',
  Chateau = 'Chateau',
  Duplex = 'Duplex',
  HotelParticulier = 'Hotel_particulier',
  Loft = 'Loft',
  Maison = 'Maison'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  createUser: User;
};


export type MutationCreateAdArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  equipments?: InputMaybe<Array<EquipmentTypeEnum>>;
  image?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  selectedEquipmentValues?: InputMaybe<Array<EquipmentValueInput>>;
  title: Scalars['String']['input'];
  type?: InputMaybe<HousingTypeEnum>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  ad: Ad;
  getAds: Array<Ad>;
  getEquipmentsList: Array<Scalars['String']['output']>;
  getHousingTypes: Array<HousingTypeEnum>;
  users: Array<User>;
};


export type QueryAdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEquipmentsListArgs = {
  equipmentTypes: Array<EquipmentTypeEnum>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type GetHousingTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHousingTypesQuery = { __typename?: 'Query', getHousingTypes: Array<HousingTypeEnum> };

export type GetEquipmentsQueryVariables = Exact<{
  equipmentTypes: Array<EquipmentTypeEnum> | EquipmentTypeEnum;
}>;


export type GetEquipmentsQuery = { __typename?: 'Query', getEquipmentsList: Array<string> };

export type AdQueryVariables = Exact<{
  adId: Scalars['ID']['input'];
}>;


export type AdQuery = { __typename?: 'Query', ad: { __typename?: 'Ad', id: string, title: string, price: number, location: string, description: string } };

export type AdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdsQuery = { __typename?: 'Query', getAds: Array<{ __typename?: 'Ad', location: string, price: number, title: string, id: string }> };


export const GetHousingTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHousingTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHousingTypes"}}]}}]} as unknown as DocumentNode<GetHousingTypesQuery, GetHousingTypesQueryVariables>;
export const GetEquipmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEquipments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipmentTypes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EquipmentTypeEnum"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEquipmentsList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"equipmentTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipmentTypes"}}}]}]}}]} as unknown as DocumentNode<GetEquipmentsQuery, GetEquipmentsQueryVariables>;
export const AdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AdQuery, AdQueryVariables>;
export const AdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdsQuery, AdsQueryVariables>;
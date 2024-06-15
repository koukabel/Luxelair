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
  bookings: Booking;
  description: Scalars['String']['output'];
  equipements?: Maybe<Array<Scalars['String']['output']>>;
  housingType?: Maybe<HousingTypeEnum>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  location: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type Booking = {
  __typename?: 'Booking';
  ad: Ad;
  checkinDate: Scalars['DateTimeISO']['output'];
  checkoutDate: Scalars['DateTimeISO']['output'];
  datePayment: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  payments: Array<Payment>;
  status: Scalars['Boolean']['output'];
  statusPayment: Scalars['Boolean']['output'];
  totalPrice: Scalars['Float']['output'];
  user: User;
};

export enum HousingTypeEnum {
  Appartement = 'Appartement',
  Bateau = 'Bateau',
  Chalet = 'Chalet',
  Chateau = 'Chateau',
  Duplex = 'Duplex',
  HotelParticulier = 'Hotel_particulier',
  LogementSurLEau = 'Logement_sur_l_eau',
  Maison = 'Maison',
  Tour = 'Tour'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  createBooking: Booking;
  createStripeCheckoutSession: Scalars['String']['output'];
  createUser: User;
  handlePaymentIntentSucceededWebhook: PaymentStatusResult;
  signIn: User;
  signOut: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationCreateAdArgs = {
  description: Scalars['String']['input'];
  equipements?: InputMaybe<Array<Scalars['String']['input']>>;
  housingType?: InputMaybe<HousingTypeEnum>;
  image?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateBookingArgs = {
  adId: Scalars['String']['input'];
  checkinDate: Scalars['DateTimeISO']['input'];
  checkoutDate: Scalars['DateTimeISO']['input'];
  statusPayment: Scalars['Boolean']['input'];
  totalPrice: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateStripeCheckoutSessionArgs = {
  amount: Scalars['Float']['input'];
  bookingId: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationHandlePaymentIntentSucceededWebhookArgs = {
  bookingId: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  booking: Booking;
  createdAt: Scalars['DateTimeISO']['output'];
  currency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status?: Maybe<PaymentStatusEnum>;
  user: User;
};

/** The status of a payment */
export enum PaymentStatusEnum {
  Confirmed = 'Confirmed',
  Failed = 'Failed',
  Pending = 'Pending'
}

export type PaymentStatusResult = {
  __typename?: 'PaymentStatusResult';
  booking?: Maybe<Booking>;
  status: PaymentStatusEnum;
};

export type Query = {
  __typename?: 'Query';
  ad: Ad;
  ads: Array<Ad>;
  filerByPrice: Array<Ad>;
  filterByEquipements: Array<Ad>;
  filterByHouseType: Array<Ad>;
  getAds: Array<Ad>;
  getAdsByUser: Array<Ad>;
  getBooking: Booking;
  getBookings: Array<Booking>;
  getBookingsByAds: Array<Booking>;
  getBookingsByHost: Array<Booking>;
  getBookingsByTraveller: Array<Booking>;
  getEquipmentTypes: Array<Scalars['String']['output']>;
  getHousingTypes: Array<HousingTypeEnum>;
  getPaymentByBookingById: Payment;
  getPaymentById: Payment;
  getRolesTypes: Array<RolesTypesEnum>;
  myProfile: User;
  search: Array<Ad>;
  user: User;
  users: Array<User>;
};


export type QueryAdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFilerByPriceArgs = {
  max: Scalars['Float']['input'];
  min: Scalars['Float']['input'];
};


export type QueryFilterByEquipementsArgs = {
  equipement: Scalars['String']['input'];
};


export type QueryFilterByHouseTypeArgs = {
  type: Scalars['String']['input'];
};


export type QueryGetAdsByUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetBookingArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBookingsByAdsArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBookingsByHostArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetBookingsByTravellerArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetPaymentByBookingByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPaymentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  location: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum RolesTypesEnum {
  Host = 'Host',
  Traveller = 'Traveller'
}

export type User = {
  __typename?: 'User';
  ads: Array<Ad>;
  bookings: Booking;
  city: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  location: Scalars['String']['output'];
  payments: Array<Payment>;
  phoneNumber: Scalars['String']['output'];
  roles?: Maybe<Array<Scalars['String']['output']>>;
};

export type GetHousingTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHousingTypesQuery = { __typename?: 'Query', getHousingTypes: Array<HousingTypeEnum> };

export type GetEquipementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEquipementsQuery = { __typename?: 'Query', getEquipmentTypes: Array<string> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', email: string, id: string, firstName: string, lastName: string } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string } };

export type FilerByPriceQueryVariables = Exact<{
  max: Scalars['Float']['input'];
  min: Scalars['Float']['input'];
}>;


export type FilerByPriceQuery = { __typename?: 'Query', filerByPrice: Array<{ __typename?: 'Ad', id: string }> };

export type FilterTypeQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type FilterTypeQuery = { __typename?: 'Query', filterByHouseType: Array<{ __typename?: 'Ad', housingType?: HousingTypeEnum | null, id: string }> };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', myProfile: { __typename?: 'User', email: string, id: string, firstName: string, lastName: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type SearchAdQueryVariables = Exact<{
  location: Scalars['String']['input'];
}>;


export type SearchAdQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Ad', title: string, price: number, location: string, id: string, description: string }> };

export type CreateStripeCheckoutSessionMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  bookingId: Scalars['String']['input'];
  currency: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type CreateStripeCheckoutSessionMutation = { __typename?: 'Mutation', createStripeCheckoutSession: string };

export type GetMyProfilUpdateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfilUpdateQuery = { __typename?: 'Query', myProfile: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string, location: string, description: string, city: string, phoneNumber: string } };

export type UpdateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  updateUserId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string } };

export type GetMyProfilQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfilQuery = { __typename?: 'Query', myProfile: { __typename?: 'User', email: string, firstName: string, id: string, lastName: string, city: string, location: string, phoneNumber: string, description: string } };

export type GetAdsByUserQueryVariables = Exact<{
  getAdsByUserId: Scalars['ID']['input'];
}>;


export type GetAdsByUserQuery = { __typename?: 'Query', getAdsByUser: Array<{ __typename?: 'Ad', id: string, image: string, location: string, price: number, title: string, housingType?: HousingTypeEnum | null, equipements?: Array<string> | null, description: string }> };

export type GetAdQueryVariables = Exact<{
  adId: Scalars['ID']['input'];
}>;


export type GetAdQuery = { __typename?: 'Query', ad: { __typename?: 'Ad', id: string, title: string, price: number, location: string, description: string, image: string, equipements?: Array<string> | null, housingType?: HousingTypeEnum | null } };

export type GetBookingsByAdsQueryVariables = Exact<{
  getBookingsByAdsId: Scalars['String']['input'];
}>;


export type GetBookingsByAdsQuery = { __typename?: 'Query', getBookingsByAds: Array<{ __typename?: 'Booking', checkinDate: any, checkoutDate: any, id: string }> };

export type AdQueryVariables = Exact<{
  adId: Scalars['ID']['input'];
}>;


export type AdQuery = { __typename?: 'Query', ad: { __typename?: 'Ad', title: string, price: number, id: string, location: string, housingType?: HousingTypeEnum | null, equipements?: Array<string> | null, description: string } };

export type CreateBookingMutationVariables = Exact<{
  checkinDate: Scalars['DateTimeISO']['input'];
  checkoutDate: Scalars['DateTimeISO']['input'];
  adId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  statusPayment: Scalars['Boolean']['input'];
  totalPrice: Scalars['Float']['input'];
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', checkinDate: any, checkoutDate: any, datePayment: any, id: string, totalPrice: number } };

export type GetBookingQueryVariables = Exact<{
  getBookingId: Scalars['String']['input'];
}>;


export type GetBookingQuery = { __typename?: 'Query', getBooking: { __typename?: 'Booking', checkinDate: any, checkoutDate: any, datePayment: any, id: string, status: boolean, statusPayment: boolean, totalPrice: number, ad: { __typename?: 'Ad', id: string, housingType?: HousingTypeEnum | null, equipements?: Array<string> | null, description: string, image: string, price: number, title: string, location: string }, user: { __typename?: 'User', id: string } } };

export type AdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdsQuery = { __typename?: 'Query', getAds: Array<{ __typename?: 'Ad', location: string, price: number, title: string, id: string }> };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, lastName: string, location: string, phoneNumber: string, firstName: string, email: string, description: string, city: string } };

export type AdCreationMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  equipements?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  housingType?: InputMaybe<HousingTypeEnum>;
  userId: Scalars['String']['input'];
}>;


export type AdCreationMutation = { __typename?: 'Mutation', createAd: { __typename?: 'Ad', id: string } };

export type FilterByPriceQueryVariables = Exact<{
  min: Scalars['Float']['input'];
  max: Scalars['Float']['input'];
}>;


export type FilterByPriceQuery = { __typename?: 'Query', filerByPrice: Array<{ __typename?: 'Ad', id: string, price: number, location: string, image: string }> };

export type FilterByHouseTypeQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;


export type FilterByHouseTypeQuery = { __typename?: 'Query', filterByHouseType: Array<{ __typename?: 'Ad', id: string, location: string, image: string, price: number }> };


export const GetHousingTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHousingTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHousingTypes"}}]}}]} as unknown as DocumentNode<GetHousingTypesQuery, GetHousingTypesQueryVariables>;
export const GetEquipementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getEquipements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEquipmentTypes"}}]}}]} as unknown as DocumentNode<GetEquipementsQuery, GetEquipementsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const FilerByPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilerByPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"max"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"min"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filerByPrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"max"},"value":{"kind":"Variable","name":{"kind":"Name","value":"max"}}},{"kind":"Argument","name":{"kind":"Name","value":"min"},"value":{"kind":"Variable","name":{"kind":"Name","value":"min"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FilerByPriceQuery, FilerByPriceQueryVariables>;
export const FilterTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"filterType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterByHouseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"housingType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FilterTypeQuery, FilterTypeQueryVariables>;
export const GetMyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetMyProfileQuery, GetMyProfileQueryVariables>;
export const SignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signOut"}}]}}]} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const SearchAdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchAd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<SearchAdQuery, SearchAdQueryVariables>;
export const CreateStripeCheckoutSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStripeCheckoutSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStripeCheckoutSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}},{"kind":"Argument","name":{"kind":"Name","value":"currency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currency"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}]}]}}]} as unknown as DocumentNode<CreateStripeCheckoutSessionMutation, CreateStripeCheckoutSessionMutationVariables>;
export const GetMyProfilUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyProfilUpdate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]} as unknown as DocumentNode<GetMyProfilUpdateQuery, GetMyProfilUpdateQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetMyProfilDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyProfil"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetMyProfilQuery, GetMyProfilQueryVariables>;
export const GetAdsByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdsByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getAdsByUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAdsByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getAdsByUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"housingType"}},{"kind":"Field","name":{"kind":"Name","value":"equipements"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetAdsByUserQuery, GetAdsByUserQueryVariables>;
export const GetAdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"equipements"}},{"kind":"Field","name":{"kind":"Name","value":"housingType"}}]}}]}}]} as unknown as DocumentNode<GetAdQuery, GetAdQueryVariables>;
export const GetBookingsByAdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingsByAds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getBookingsByAdsId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookingsByAds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getBookingsByAdsId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkinDate"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetBookingsByAdsQuery, GetBookingsByAdsQueryVariables>;
export const AdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ad"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ad"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"housingType"}},{"kind":"Field","name":{"kind":"Name","value":"equipements"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AdQuery, AdQueryVariables>;
export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkinDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkoutDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"adId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statusPayment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checkinDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkinDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"checkoutDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkoutDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"adId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"adId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"statusPayment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statusPayment"}}},{"kind":"Argument","name":{"kind":"Name","value":"totalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"totalPrice"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkinDate"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutDate"}},{"kind":"Field","name":{"kind":"Name","value":"datePayment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const GetBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getBookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getBookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkinDate"}},{"kind":"Field","name":{"kind":"Name","value":"checkoutDate"}},{"kind":"Field","name":{"kind":"Name","value":"datePayment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusPayment"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"ad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"housingType"}},{"kind":"Field","name":{"kind":"Name","value":"equipements"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookingQuery, GetBookingQueryVariables>;
export const AdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdsQuery, AdsQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const AdCreationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adCreation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"price"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipements"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"housingType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"HousingTypeEnum"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"price"}}},{"kind":"Argument","name":{"kind":"Name","value":"equipements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipements"}}},{"kind":"Argument","name":{"kind":"Name","value":"housingType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"housingType"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdCreationMutation, AdCreationMutationVariables>;
export const FilterByPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterByPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"min"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"max"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filerByPrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"min"},"value":{"kind":"Variable","name":{"kind":"Name","value":"min"}}},{"kind":"Argument","name":{"kind":"Name","value":"max"},"value":{"kind":"Variable","name":{"kind":"Name","value":"max"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<FilterByPriceQuery, FilterByPriceQueryVariables>;
export const FilterByHouseTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilterByHouseType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterByHouseType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<FilterByHouseTypeQuery, FilterByHouseTypeQueryVariables>;
import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserDataStructure extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

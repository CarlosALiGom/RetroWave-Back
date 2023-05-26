import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserDataStructure extends UserCredentials {
  _id: string;
}

export interface UserDbStructure extends UserCredentials {
  _id: Types.ObjectId;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

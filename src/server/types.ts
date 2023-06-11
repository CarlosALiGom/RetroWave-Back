import { type Request } from "express";
import { type Types } from "mongoose";
import { type SynthsStructure } from "../mocks/synthMocks";

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

export interface IdParamsRequest extends Request {
  userId: string;
  params: {
    synthId: string;
  };
}

export interface CustomRequest extends Request {
  userId: string;
  query: {
    skip: string;
    limit: string;
    type?: "Analog" | "Hybrid" | "Digital";
  };
}
export interface AddSynthRequest extends CustomRequest {
  body: {
    synth: SynthsStructure;
  };
}

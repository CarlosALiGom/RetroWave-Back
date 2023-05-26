import {
  type ResponseMessageStructure,
  type ResponseStatusCodeStructure,
} from "../types";

export const responseStatusCode: ResponseStatusCodeStructure = {
  ok: 200,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
};

export const responseMessage: ResponseMessageStructure = {
  ok: "OK",
  unauthorized: "Wrong credentials",
  notFound: "Not found",
  generalError: "General Error",
};

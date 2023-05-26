import {
  type ResponseMessageStructure,
  type ResponseStatusCodeStructure,
} from "../types";

export const responseStatusCode: ResponseStatusCodeStructure = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
};

export const responseMessage: ResponseMessageStructure = {
  ok: "OK",
  badRequest: "Validation Failed",
  unauthorized: "Wrong credentials",
  notFound: "Not found",
  generalError: "General Error",
};

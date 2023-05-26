export interface PathsStructure {
  pingController: string;
  user: string;
  login: string;
  synths: string;
}

export interface ResponseStatusCodeStructure {
  ok: number;
  badRequest: number;
  unauthorized: number;
  notFound: number;
  internalServerError: number;
}

export interface ResponseMessageStructure {
  ok: string;
  badRequest: string;
  unauthorized: string;
  missingToken: string;
  notFound: string;
  generalError: string;
}

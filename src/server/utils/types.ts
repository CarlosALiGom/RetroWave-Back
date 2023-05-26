export interface PathsStructure {
  pingController: string;
}

export interface ResponseStatusCodeStructure {
  ok: number;
  unauthorized: number;
  notFound: number;
  internalServerError: number;
}

export interface ResponseMessageStructure {
  ok: string;
  unauthorized: string;
  notFound: string;
  generalError: string;
}

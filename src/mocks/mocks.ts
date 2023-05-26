import { type UserCredentials, type UserDataStructure } from "../server/types";

export const userMock: UserCredentials = {
  username: "Judit",
  password: "Judit",
};

export const userDbMock: UserCredentials = {
  username: "Judit",
  password: "$2y$10$U.6UzF4tD9/AZapllmhqdOZZjBSEqD82QEzMoyRKtaIvPGxtz52t2",
};

export const wrongUserDbMock = {
  name: "Judit",
  word: "Judit",
};

export const userDataMock: UserDataStructure = {
  username: "Judit",
  password: "Judit",
  _id: "JuditVives",
};

export const tokenMock = {
  token: "token",
};

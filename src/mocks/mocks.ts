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

export const juditTokenMock =
  "$2y$10$U.6UzF4tD9/AZapllmhqdOZZjBSEqD82QEzMoyRKtaIvPGxtz52t2";

export const adminTokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJzdWIiOiI2NDcwN2RkZjJkMDljZDE1NDBmMGZhYWYiLCJpYXQiOjE2ODYwNDk0MDR9.a6L3kwd2Mu1fVKHU4iuFuPINuhPKtEfmX3rarInSrhw";

export const adminUserDbMock: UserCredentials = {
  username: "admin",
  password: "$2y$10$axrXmTPso405LBs/NPfjquRMBxnf472njEekDLbnulCE35I4aVsyu",
};

export const tokenMock = {
  token: "token",
};

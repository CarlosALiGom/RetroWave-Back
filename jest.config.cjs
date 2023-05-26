/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/database/connectToDatabase.ts",
    "!src/loadEnviroments.ts",
    "!src/database/models/User.ts",
  ],
  testPathIgnorePatterns: ["node_modules"],
};

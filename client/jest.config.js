/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "axios": "axios/dist/node/axios.cjs"
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json"
    }
  },
  testPathIgnorePatterns: [
    "node_modules/(?!axios)"
  ],
  testTimeout: 5000,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
};
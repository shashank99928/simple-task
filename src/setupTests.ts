/// <reference types="node" />
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  IS_REACT_ACT_ENVIRONMENT: true,
});

// Mock MUI TouchRipple to prevent "not wrapped in act(...)" warnings
jest.mock("@mui/material/ButtonBase/TouchRipple", () => ({
  __esModule: true,
  default: () => null,
}));

// Suppress expected "act" warnings for suspended resources (lazy-loaded components)
const originalError = console.error;
console.error = (...args: unknown[]) => {
  const errorMessage = args[0]?.toString() || "";
  // Filter out expected Suspense boundary warnings
  if (
    errorMessage.includes("A suspended resource finished loading inside a test")
  ) {
    return;
  }
  originalError.call(console, ...args);
};

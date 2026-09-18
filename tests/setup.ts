import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// RTL's automatic cleanup only self-registers when `afterEach` is a global;
// this project intentionally doesn't enable vitest's `test.globals`, so
// cleanup is wired explicitly instead.
afterEach(() => {
  cleanup();
});

// jsdom doesn't implement window.matchMedia at all. Both Framer Motion's
// useReducedMotion() hook and ServiceTypewriter's manual reduced-motion
// check call it, so components using either would throw without this.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

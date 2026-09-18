import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Static-analysis guard for FR-049: lib/gemini/client.ts (and the
 * GEMINI_API_KEY it reads) must never be imported, directly or
 * transitively, by a "use client" file. `next build` also enforces this at
 * the bundler level via the `server-only` package, but this test makes the
 * guarantee explicit and independent of the build tool.
 */

const ROOT = join(__dirname, "..");
const SCAN_DIRS = ["components", "app"];

function collectFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collectFiles(full, acc);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

function isClientFile(source: string): boolean {
  const firstStatement = source.trimStart().split("\n")[0]?.trim();
  return firstStatement === '"use client";' || firstStatement === "'use client';";
}

describe("No client-side Gemini access", () => {
  it("never imports lib/gemini/client (or GEMINI_API_KEY) from a \"use client\" file", () => {
    const files = SCAN_DIRS.flatMap((dir) => collectFiles(join(ROOT, dir)));
    const violations: string[] = [];

    for (const file of files) {
      const source = readFileSync(file, "utf-8");
      if (!isClientFile(source)) continue;

      if (/gemini\/client/.test(source) || /GEMINI_API_KEY/.test(source)) {
        violations.push(file);
      }
    }

    expect(violations).toEqual([]);
  });

  it("the API route file is the only place GEMINI_API_KEY is read from", () => {
    const files = SCAN_DIRS.flatMap((dir) => collectFiles(join(ROOT, dir))).concat(
      collectFiles(join(ROOT, "lib")),
    );
    const readers = files.filter((file) => readFileSync(file, "utf-8").includes("GEMINI_API_KEY"));

    expect(readers).toEqual([join(ROOT, "lib", "gemini", "client.ts")]);
  });
});

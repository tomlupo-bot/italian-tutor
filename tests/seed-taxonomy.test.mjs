import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const seedSource = fs.readFileSync(new URL("../convex/seed.ts", import.meta.url), "utf8");
const fastTrackSource = fs.readFileSync(new URL("../convex/fastTrackDocsContent.ts", import.meta.url), "utf8");

const ALLOWED_TAGS = new Set([
  "basics",
  "bureaucracy",
  "food",
  "health",
  "home",
  "planning",
  "routine",
  "shopping",
  "social",
  "time",
  "travel",
  "work",
]);

function extractArray(source, name) {
  const match = source.match(new RegExp(`(?:export const|const) ${name}(?::[^=]+)? = \\[`));
  assert.ok(match, `${name} should exist`);

  const arrayStart = match.index + match[0].length - 1;
  let depth = 0;
  let end = -1;

  for (let i = arrayStart; i < source.length; i += 1) {
    const char = source[i];
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  assert.notEqual(end, -1, `${name} array should close`);
  return vm.runInNewContext(`(${source.slice(arrayStart, end + 1)})`);
}

const BASE_VOCAB = extractArray(seedSource, "baseVocab");
const FAST_TRACK_DOCS_CONTENT = extractArray(fastTrackSource, "FAST_TRACK_DOCS_CONTENT");

test("base vocab uses only runtime seed tags", () => {
  for (const card of BASE_VOCAB) {
    assert.ok(ALLOWED_TAGS.has(card.tag), `Unexpected base vocab tag ${card.tag} for ${card.it}`);
  }
});

test("fast-track docs content uses only runtime seed tags", () => {
  for (const card of FAST_TRACK_DOCS_CONTENT) {
    assert.ok(ALLOWED_TAGS.has(card.tag), `Unexpected fast-track tag ${card.tag} for ${card.it}`);
  }
});

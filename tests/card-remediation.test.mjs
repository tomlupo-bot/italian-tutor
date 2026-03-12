import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../convex/cardRemediation.ts", import.meta.url), "utf8");

function extractArray(name) {
  const match = source.match(new RegExp(`export const ${name}(?::[^=]+)? = \\[`));
  assert.ok(match, `${name} should exist`);

  const start = match.index;
  const arrayStart = start + match[0].length - 1;
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

const SEED_CARD_INSERTS = extractArray("SEED_CARD_INSERTS");
const A1_AUDIT_EXPANSION = extractArray("A1_AUDIT_EXPANSION");
const A2_AUDIT_EXPANSION = extractArray("A2_AUDIT_EXPANSION");
const B1_AUDIT_EXPANSION = extractArray("B1_AUDIT_EXPANSION");

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

test("remediation inserts stay within the default A2-B1 seed scope", () => {
  for (const row of SEED_CARD_INSERTS) {
    assert.ok(["A2", "B1"].includes(row.level), `${row.it} should stay out of default B2 seed inserts`);
    assert.ok(ALLOWED_TAGS.has(row.tag), `${row.it} should use an allowed practical tag`);
  }
});

test("audit expansion packs use consistent levels and app-facing tags", () => {
  for (const row of A1_AUDIT_EXPANSION) {
    assert.equal(row.level, "A1", `${row.it} should stay in A1 expansion`);
    assert.ok(ALLOWED_TAGS.has(row.tag), `${row.it} should use an allowed practical tag`);
  }

  for (const row of A2_AUDIT_EXPANSION) {
    assert.equal(row.level, "A2", `${row.it} should stay in A2 expansion`);
    assert.ok(ALLOWED_TAGS.has(row.tag), `${row.it} should use an allowed practical tag`);
  }

  for (const row of B1_AUDIT_EXPANSION) {
    assert.equal(row.level, "B1", `${row.it} should stay in B1 expansion`);
    assert.ok(ALLOWED_TAGS.has(row.tag), `${row.it} should use an allowed practical tag`);
  }
});

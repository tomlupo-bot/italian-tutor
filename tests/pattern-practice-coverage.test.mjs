import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const progressionSource = fs.readFileSync(new URL("../convex/progressionCatalog.ts", import.meta.url), "utf8");
const patternSource = fs.readFileSync(new URL("../src/lib/patternFocus.ts", import.meta.url), "utf8");

function extractArray(source, name) {
  const match = source.match(new RegExp(`(?:export const|const) ${name}(?::[^=]+)? = \\[`));
  assert.ok(match, `${name} should exist`);

  const start = match.index + match[0].length - 1;
  let depth = 0;
  let end = -1;

  for (let i = start; i < source.length; i += 1) {
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
  return vm.runInNewContext(`(${source.slice(start, end + 1)})`);
}

function extractObject(source, name) {
  const match = source.match(new RegExp(`export const ${name}(?::[^=]+)? = \\{`));
  assert.ok(match, `${name} should exist`);

  const start = match.index + match[0].length - 1;
  let depth = 0;
  let end = -1;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  assert.notEqual(end, -1, `${name} object should close`);
  return vm.runInNewContext(`(${source.slice(start, end + 1)})`);
}

const MISSIONS = extractArray(progressionSource, "MISSIONS");
const PATTERN_PRACTICE_LEVELS = extractArray(patternSource, "PATTERN_PRACTICE_LEVELS");
const PATTERN_FOCUS_CONFIG = extractObject(patternSource, "PATTERN_FOCUS_CONFIG");

test("pattern practice levels stay within the generated template levels", () => {
  assert.deepEqual(Array.from(PATTERN_PRACTICE_LEVELS), ["A1", "A2", "B1"]);
});

test("every visible pattern lane has live mission coverage at each supported level", () => {
  for (const level of PATTERN_PRACTICE_LEVELS) {
    const missionsAtLevel = MISSIONS.filter((mission) => mission.level === level);
    assert.ok(missionsAtLevel.length > 0, `Expected missions at ${level}`);

    for (const [patternKey, config] of Object.entries(PATTERN_FOCUS_CONFIG)) {
      const covered = missionsAtLevel.some((mission) => {
        const missionTags = mission.tags ?? [];
        const missionErrorFocus = mission.errorFocus ?? [];
        return (
          missionTags.some((tag) => config.tags?.includes(tag)) ||
          missionErrorFocus.some((errorKey) => config.errorFocus?.includes(errorKey))
        );
      });

      assert.ok(covered, `${patternKey} should have mission-backed coverage at ${level}`);
    }
  }
});

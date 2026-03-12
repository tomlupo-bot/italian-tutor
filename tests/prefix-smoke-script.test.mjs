import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../scripts/smoke-prefix.mjs", import.meta.url), "utf8");

test("prefix smoke script covers required /tutor routes", () => {
  assert.match(
    source,
    /SMOKE_BASE_PATH \?\? "\/tutor"/,
    "smoke script should default to the /tutor mount",
  );

  const requiredSuffixes = [
    '${basePath}/',
    '${basePath}/patterns',
    '${basePath}/missions/current',
    '${basePath}/progress',
    '${basePath}/manifest.json',
    '${basePath}/sw.js',
  ];

  for (const route of requiredSuffixes) {
    assert.match(
      source,
      new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `smoke script should probe ${route} route`,
    );
  }
});

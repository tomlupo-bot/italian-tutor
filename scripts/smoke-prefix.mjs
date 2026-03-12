import { spawn } from "node:child_process";
import process from "node:process";

const basePath = normalizeBasePath(process.env.SMOKE_BASE_PATH ?? "/tutor");
const port = Number(process.env.SMOKE_PORT ?? "3011");
const host = process.env.SMOKE_HOST ?? "127.0.0.1";
const baseUrl = `http://${host}:${port}`;

const routes = [
  { path: `${basePath}/`, type: "html" },
  { path: `${basePath}/patterns`, type: "html" },
  { path: `${basePath}/missions/current`, type: "html" },
  { path: `${basePath}/progress`, type: "html" },
  { path: `${basePath}/manifest.json`, type: "json" },
  { path: `${basePath}/sw.js`, type: "js" },
];

function normalizeBasePath(value) {
  if (!value || value === "/") return "";
  return value.startsWith("/") ? value.replace(/\/+$/, "") : `/${value.replace(/\/+$/, "")}`;
}

function run(cmd, args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: process.cwd(),
      env: { ...process.env, ...extraEnv },
      stdio: "inherit",
    });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // Server not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for server at ${url}`);
}

async function probeRoute(route) {
  const url = `${baseUrl}${route.path}`;
  const res = await fetch(url, { redirect: "follow" });
  if (res.status !== 200) {
    throw new Error(`${route.path} returned ${res.status}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (route.type === "html" && !contentType.includes("text/html")) {
    throw new Error(`${route.path} did not return HTML (${contentType || "unknown content-type"})`);
  }
  if (route.type === "json" && !contentType.includes("application/json")) {
    throw new Error(`${route.path} did not return JSON (${contentType || "unknown content-type"})`);
  }
  if (route.type === "js" && !contentType.includes("javascript")) {
    throw new Error(`${route.path} did not return JavaScript (${contentType || "unknown content-type"})`);
  }

  const body = await res.text();
  if (route.type === "html" && !body.includes("Italian Tutor")) {
    throw new Error(`${route.path} HTML did not include expected app marker`);
  }
  if (route.path.endsWith("/sw.js") && !body.includes("getBasePath")) {
    throw new Error(`${route.path} does not contain expected base-path logic`);
  }
}

async function main() {
  console.log(`Building app with NEXT_PUBLIC_BASE_PATH=${basePath || "/"}`);
  await run("node", ["node_modules/next/dist/bin/next", "build"], {
    NEXT_PUBLIC_BASE_PATH: basePath || "/",
  });

  console.log(`Starting app on ${baseUrl} with base path ${basePath || "/"}`);
  const server = spawn(
    "node",
    ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", host],
    {
      cwd: process.cwd(),
      env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath || "/" },
      stdio: "inherit",
    },
  );

  const shutdown = () => {
    if (!server.killed) server.kill("SIGINT");
  };
  process.on("exit", shutdown);
  process.on("SIGINT", () => {
    shutdown();
    process.exit(130);
  });

  try {
    await waitForServer(`${baseUrl}${basePath || "/"}`);
    for (const route of routes) {
      await probeRoute(route);
      console.log(`OK ${route.path}`);
    }
  } finally {
    shutdown();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

import assert from "node:assert/strict";

const base = (process.env.SEO_CHECK_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

const pages = ["/"];

const decode = (s) =>
  s
    ?.replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
const attr = (tag, name) =>
  decode(tag.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1]);
const tags = (html, name) =>
  html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) || [];
const meta = (html, name) =>
  attr(
    tags(html, "meta").find(
      (t) => attr(t, "name") === name || attr(t, "property") === name,
    ) || "",
    "content",
  );
const canonical = (html) =>
  attr(
    tags(html, "link").find((t) => attr(t, "rel") === "canonical") || "",
    "href",
  );

let count = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  count++;
};

const results = await Promise.all(
  pages.map(async (path) => {
    const response = await fetch(base + path);
    check(response.status === 200, `${path}: status ${response.status}`);
    return [path, await response.text()];
  }),
);

const origin = new URL(canonical(results[0][1])).origin;
const indexable = !meta(results[0][1], "robots")?.includes("noindex");

for (const [path, html] of results) {
  const expected = new URL(path, origin).href;
  check(
    new URL(canonical(html)).href === expected,
    `${path}: canonical must be ${expected}`,
  );
  check(new URL(meta(html, "og:url")).href === expected, `${path}: OG URL`);
  check(meta(html, "description")?.length > 20, `${path}: description`);
  check(
    meta(html, "twitter:card") === "summary_large_image",
    `${path}: Twitter card`,
  );
  check(
    meta(html, "robots")?.includes(indexable ? "index" : "noindex"),
    `${path}: indexing`,
  );
  check(tags(html, "h1").length === 1, `${path}: one H1`);
  check(
    meta(html, "og:image")?.includes("/api/og?"),
    `${path}: page-specific OG`,
  );
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    JSON.parse(json);
    count++;
  }
}

const home = results.find(([p]) => p === "/")[1];
check(home.includes('"@type":["WebSite","WebApplication"]') || home.includes("WebApplication"), "home: WebApplication JSON-LD");
check(home.includes("Skip to content"), "home: skip link");

const sitemap = await fetch(base + "/sitemap.xml");
check(sitemap.status === 200, "sitemap status");
const xml = await sitemap.text();
check(
  xml.includes(`<loc>${new URL("/", origin).href}</loc>`) === indexable,
  "/: sitemap index policy",
);
check(!xml.includes("/games"), "sitemap omits removed routes");
check(!xml.includes("/cart"), "sitemap omits cart");

const robots = await fetch(base + "/robots.txt");
check(robots.status === 200, "robots status");
const robotsText = await robots.text();
check(robotsText.includes("Allow: /"), "robots allows crawling");
check(robotsText.includes("Sitemap:") === indexable, "robots sitemap policy");

const missing = await fetch(base + "/missing-seo-check-page");
check(missing.status === 404, "missing page: real 404");

for (const path of ["/api/og?title=oTTeDesign", "/icon"]) {
  const res = await fetch(base + path);
  check(
    res.status === 200 && res.headers.get("content-type")?.includes("image/png"),
    `${path}: PNG response`,
  );
  const bytes = new Uint8Array(await res.arrayBuffer());
  check(
    bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71,
    `${path}: PNG bytes`,
  );
}

console.log(
  `Passed ${count} SEO response checks against ${base}; canonical origin ${origin}; indexable=${indexable}.`,
);

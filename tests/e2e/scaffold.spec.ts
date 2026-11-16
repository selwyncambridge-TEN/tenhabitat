import { expect, test } from "@playwright/test";

import { retiredPaths } from "../../lib/retired-pages";
import { absoluteUrl, seoRoutes, socialImage } from "../../lib/seo";

const liveSeoRoutes = Object.entries(seoRoutes).filter(
  ([path]) => !(retiredPaths as readonly string[]).includes(path),
);

test.describe("TEN Habitat website", () => {
  test("/ loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("After nearly two decades").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "TEN Habitat home" })).toBeVisible();
  });

  for (const path of retiredPaths) {
    test(`${path} redirects to the intro page`, async ({ page, request }) => {
      const response = await request.get(path, { maxRedirects: 0 });
      expect(response.status()).toBe(307);
      expect(response.headers()["location"]).toBe("/");

      await page.goto(path);
      await expect(page).toHaveURL(/\/$/);
      await expect(page.getByText("After nearly two decades")).toBeVisible();
    });
  }

  test("/welcome redirects to the splash landing page", async ({ page }) => {
    await page.goto("/welcome");

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText("After nearly two decades")).toBeVisible();
  });

  test("splash primary action links to the Venture Habitat website", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Explore Venture Habitat →" })).toHaveAttribute(
      "href",
      "https://venturehabitat.org",
    );
    await expect(page.getByRole("link", { name: "Skip intro →" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "TEN Habitat home" })).toHaveAttribute("href", "/");
  });

  test("splash shows the evolved headline and the TEN Habitat banners", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "After nearly two decades of helping Caribbean businesses start and grow… we have evolved.",
    );
    await expect(page.getByRole("heading", { name: /For nearly two decades, TEN Habitat/ })).toBeVisible();
    await expect(page.getByText("Now comes the layer we were always missing.")).toBeVisible();
  });
});

test.describe("TEN Habitat SEO", () => {
  for (const [path, seo] of liveSeoRoutes) {
    test(`${path} has unique crawl and social metadata`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveTitle(seo.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        seo.description,
      );
      const expectedCanonical = path === "/" ? "https://tenhabitat.com" : absoluteUrl(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        expectedCanonical,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        seo.title,
      );
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
        "content",
        seo.description,
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        absoluteUrl(socialImage.url),
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      expect(await page.locator('link[rel="icon"][href*="icon.svg"]').count()).toBeGreaterThan(0);
    });
  }

  test("robots, sitemap, and Organization schema are available", async ({ page, request }) => {
    const robots = await request.get("/robots.txt");
    await expect(robots).toBeOK();
    expect(robots.headers()["content-type"]).toContain("text/plain");
    await expect(await robots.text()).toContain("Sitemap: https://tenhabitat.com/sitemap.xml");

    const sitemap = await request.get("/sitemap.xml");
    await expect(sitemap).toBeOK();
    expect(sitemap.headers()["content-type"]).toContain("xml");
    const sitemapXml = await sitemap.text();
    for (const [path] of liveSeoRoutes) {
      expect(sitemapXml).toContain(`<loc>${absoluteUrl(path)}</loc>`);
    }
    for (const path of retiredPaths) {
      expect(sitemapXml).not.toContain(`<loc>${absoluteUrl(path)}</loc>`);
    }

    await page.goto("/");
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const structuredData = JSON.parse(jsonLd ?? "{}") as {
      "@graph"?: Array<{ "@type"?: string; name?: string; url?: string }>;
    };

    expect(structuredData["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "Organization",
          name: "TEN Habitat",
          url: "https://tenhabitat.com",
        }),
        expect.objectContaining({
          "@type": "WebSite",
          name: "TEN Habitat",
          url: "https://tenhabitat.com",
        }),
      ]),
    );
  });
});

import { expect, test } from "@playwright/test";

import { absoluteUrl, seoRoutes, socialImage } from "../../lib/seo";

const routes = [
  { path: "/", heading: "After nearly two decades" },
  { path: "/home", heading: "While everyone is hunting the next unicorn" },
  { path: "/builders", heading: "Are you a Builder?" },
  { path: "/backers", heading: "Are you a Backer?" },
  { path: "/investors", heading: "You’ve always sent something home." },
  { path: "/join", heading: "Join the Founding Community" },
] as const;

test.describe("TEN Habitat website", () => {
  for (const route of routes) {
    test(`${route.path} loads`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByText(route.heading).first()).toBeVisible();
      await expect(page.getByRole("link", { name: "TEN Habitat home" }).first()).toBeVisible();
    });
  }

  test("join form validates and submits with role prefill", async ({ page }) => {
    await page.route("**/api/community-signup", async (route) => {
      await route.fulfill({
        body: JSON.stringify({ signup: { id: "test-signup" } }),
        contentType: "application/json",
        status: 201,
      });
    });

    await page.goto("/join?role=investor");

    await expect(page.getByRole("button", { name: "Investor" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.getByRole("button", { name: "Join the Founding Community" }).click();
    await expect(page.getByText("Please add your name and a valid email address.")).toBeVisible();

    await page.getByLabel("Full name").fill("Selwyn Cambridge");
    await page.getByLabel("Email").fill("selwyn@example.com");
    await page.getByLabel("Country or territory").fill("Barbados");
    await page.getByRole("button", { name: "Join the Founding Community" }).click();

    await expect(page.getByText("You’re on the list.")).toBeVisible();
    await expect(
      page.getByText("Thanks, Selwyn — you’ve joined the founding community as a founding investor."),
    ).toBeVisible();
  });

  test("mobile menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/home");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile primary" })).toBeVisible();

    await page.getByRole("navigation", { name: "Mobile primary" }).getByRole("link", { name: "Backers" }).click();

    await expect(page).toHaveURL(/\/backers$/);
    await expect(page.getByText("Are you a Backer?")).toBeVisible();
  });

  test("/welcome redirects to the splash landing page", async ({ page }) => {
    await page.goto("/welcome");

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText("After nearly two decades")).toBeVisible();
  });
});

test.describe("TEN Habitat SEO", () => {
  for (const [path, seo] of Object.entries(seoRoutes)) {
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
    for (const path of Object.keys(seoRoutes)) {
      expect(sitemapXml).toContain(`<loc>${absoluteUrl(path)}</loc>`);
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

import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "While everyone is hunting the next unicorn" },
  { path: "/builders", heading: "Are you a Builder?" },
  { path: "/backers", heading: "Are you a Backer?" },
  { path: "/investors", heading: "You’ve always sent something home." },
  { path: "/join", heading: "Join the Founding Community" },
  { path: "/welcome", heading: "After nearly two decades" },
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
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile primary" })).toBeVisible();

    await page.getByRole("navigation", { name: "Mobile primary" }).getByRole("link", { name: "Backers" }).click();

    await expect(page).toHaveURL(/\/backers$/);
    await expect(page.getByText("Are you a Backer?")).toBeVisible();
  });
});

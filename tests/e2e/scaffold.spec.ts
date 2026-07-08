import { expect, test } from "@playwright/test";

const routes = ["/", "/builders", "/backers", "/investors", "/join"] as const;

test.describe("application scaffold", () => {
  for (const route of routes) {
    test(`${route} loads`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByRole("link", { name: "TEN Habitat" })).toBeVisible();
    });
  }
});

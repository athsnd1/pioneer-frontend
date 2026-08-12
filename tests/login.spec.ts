import { test, expect } from "@playwright/test";

test("user can login", async ({ page }) => {

    await page.goto("/login");

    await page.getByLabel("Email").fill("attahsundayjr@gmail.com");
    await page.getByLabel("Password").fill("815153$$Athsnd");
    
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page).toHaveURL("http://localhost:5173/");

});
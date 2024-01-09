import { test, expect } from '@playwright/test';

const URL = "http://localhost:5173/";


/**
 * Test case for user registration functionality
 */
test('Should allow user to register', async ({ page }) => {
  const randomEmail = `${Math.random().toString(36).slice(-8)}@test.com`
  //Go to the home page
  await page.goto(URL);

  // Expect to see a register button
  await expect(page.getByRole("button", {name: "Register"})).toBeVisible();

  // Go to the Register page
  await page.getByRole("button", {name: "Register"}).click();

  // Expect to see Create an account text
  await expect(page.getByText("Create an account")).toBeVisible();

  // Fill out the form
  await page.locator("[id=firstName]").fill("test");
  await page.locator("[id=lastName]").fill("test");
  await page.locator("[id=email]").fill(randomEmail);
  await page.locator("[id=password]").fill("test1234");
  await page.locator("[id=confirmPassword]").fill("test1234");

  // Click the submit button
  await page.getByRole("button", {name: "Create Account"}).click();

  // Expect to see the home page and user's name on navbar
  await expect(page.getByText("The best hotels for you")).toBeVisible();
  await expect(page.getByText("test test")).toBeVisible();

});

/**
 * Test case for login functionality
 */
test('Should allow user to login', async({page}) => {

  // Go To the home page
  await page.goto(URL);

  // Expect to see login button
  await expect(page.getByRole("button", {name: "Login"})).toBeVisible();

  // Go to login page
  await page.getByRole("button", {name: "Login"}).click();

  // Expect to see "Welcome back, Login in" text
  await expect(page.getByText("Welcome back, Login in")).toBeVisible();

  // Fill out the form
  await page.locator("[id=email]").fill("test@test.com");
  await page.locator("[id=password]").fill("test1234");

  // Click the "Sign in" button
  await page.getByRole("button", {name:"Sign in"}).click();

  // Expect to see the home page and user's name on navbar
  await expect(page.getByText("The best hotels for you")).toBeVisible();
  await expect(page.getByText("test test")).toBeVisible();

})

/**
 *  Test case for user logout
 */
test(`Should allow user to logout`, async ({page}) => {
  // Go to the home page
  await page.goto(URL);

  // Go to login page
  await page.getByRole("button", {name: "Login"}).click();

  // Fill out the form
  await page.locator("[id=email]").fill("test@test.com");
  await page.locator("[id=password]").fill("test1234");

  // Click the "Sign in" button
  await page.getByRole("button", {name:"Sign in"}).click();

  // Toggle the menu
  await page.getByText("test test").click();

  //Expect to see the logout button in menu
  await expect(page.getByText("Logout")).toBeVisible();

  // Click the logout button
  await page.getByText("Logout").click();

  // Expect to see Register and Login buttons in navigation bar
  await expect(page.getByRole("button", {name:"Register"})).toBeVisible();
  await expect(page.getByRole("button", {name:"Login"})).toBeVisible();

})


import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: 2,

  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: "html",

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "https://form.mbank.pl/",

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "Chromium",
      use: {
        // Configure the browser to use.
        browserName: "chromium",

        // Any Chromium-specific options.
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
})

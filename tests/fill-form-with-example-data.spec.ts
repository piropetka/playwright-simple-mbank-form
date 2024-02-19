import { test, expect } from "@playwright/test"

test.describe("Interacting with mBank client evaluation form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/app/khs/index.htm?typKlienta=OF&produkt=wk_of_kh&kampania=promo_www_symulacja_kalkulator__kategoria__kategoria&option=mbank&sprzedawca=symulacjaKalkulator"
    )
  })

  test("Check if form is available", async ({ page }) => {
    await expect(page).toHaveTitle(/mBank/)
    await expect(page).toHaveURL(/symulacjaKalkulator/)
  })

  test("Fill the form with example data", async ({ page }) => {
    // await page.locator('//input[@id="client_new"]/parent::label').click()
    await page.getByText("chcę dołączyć").click()
    await page.getByRole("button", { name: "wypełnij dane" }).click()
    await page.waitForURL(/Page2/)
    await expect(
      page.getByRole("heading", { name: "Symulacja kredytu hipotecznego" })
    ).toBeVisible()
    await page
      // .locator("ex-radio-group")
      .locator('[widgettype="radiogroupmodel"]')
      .filter({ hasText: "W ile osób bierzesz kredyt?" })
      .getByText("1")
      .click()
    await page
      .locator('[widgettype="datepickermodel"]')
      .filter({ hasText: "Data urodzenia" })
      .getByRole("textbox")
      .fill("01-02-1990")
    await page.locator('div[widgettype="comboboxmodel"]').filter({ hasText: "płeć" }).click()
    await page.getByRole("option").getByText("Mężczyzna").click()
    // await page.getByLabel(/Miesięczny dochód netto/).fill("10000")
    await page
      .locator('div[widgettype="comboboxmodel"]')
      .filter({ hasText: "Forma zatrudnienia" })
      .click()
    await page.getByRole("option").getByText("Działalność gospodarcza").click()
    await page.getByLabel("Suma miesięcznie spłacanych alimentów").fill("888")
    await page.getByLabel("Suma miesięcznie spłacanych alimentów").blur()
    await expect(page.getByLabel(/Suma miesięcznie spłacanych alimentów/)).toHaveValue("888,00")
  })
})

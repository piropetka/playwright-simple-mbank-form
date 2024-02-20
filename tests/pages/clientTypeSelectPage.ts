import { Page, Locator, expect } from "@playwright/test"

export class clientTypeSelectPage {
  readonly page: Page
  readonly url: string =
    "/app/khs/index.htm?typKlienta=OF&produkt=wk_of_kh&kampania=promo_www_symulacja_kalkulator__kategoria__kategoria&option=mbank&sprzedawca=symulacjaKalkulator"
  readonly newClientRadio: Locator
  readonly continueToForm: Locator

  public constructor(page: Page) {
    this.page = page
    this.newClientRadio = page.getByText("chcę dołączyć")
    this.continueToForm = page.getByRole("button", { name: "wypełnij dane" })
  }
  async visit() {
    await this.page.goto(this.url)
  }
  async isPageAvailable() {
    await expect(this.page).toHaveTitle(/mBank/)
    await expect(this.page).toHaveURL(/symulacjaKalkulator/)
  }
  async goToFormAsNewClient() {
    await this.newClientRadio.click()
    await this.continueToForm.click()
    await this.page.waitForURL(/Page2/)
  }
}

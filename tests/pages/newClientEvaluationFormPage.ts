import { Page, Locator, expect } from "@playwright/test"
import { genderTypes, participantsType } from "../../types/formTypes"

export class newClientEvaluationFormPage {
  readonly page: Page
  readonly url: string =
    "/app/khs/index.htm?typKlienta=OF&produkt=wk_of_kh&kampania=promo_www_symulacja_kalkulator__kategoria__kategoria&option=mbank&sprzedawca=symulacjaKalkulator"
  readonly formTitleHeader: Locator
  readonly participantsCount: Locator
  readonly birthDatePicker: Locator
  readonly gender: Locator
  readonly netIncome: Locator
  readonly alimonyObligations: Locator

  public constructor(page: Page) {
    this.page = page
    this.formTitleHeader = page.getByRole("heading", { name: "Symulacja kredytu hipotecznego" })
    this.participantsCount = page
      .locator('[widgettype="radiogroupmodel"]')
      .filter({ hasText: "W ile osób bierzesz kredyt?" })
    this.birthDatePicker = page
      .locator('[widgettype="datepickermodel"]')
      .filter({ hasText: "Data urodzenia" })
      .getByRole("textbox")
    this.gender = page.locator('div[widgettype="comboboxmodel"]').filter({ hasText: "płeć" })
    this.netIncome = page.getByLabel(/Miesięczny dochód netto/)
    this.alimonyObligations = page.getByLabel("Suma miesięcznie spłacanych alimentów")
  }
  async visit() {
    await this.page.goto(this.url)
  }
  async checkIfFormWasLoaded() {
    await expect(this.formTitleHeader).toBeVisible
    await expect(this.page).toHaveURL(/Page2/)
  }

  async selectNumberOfCreditParticipants(participantsCount: participantsType) {
    await this.participantsCount.getByText(`${participantsCount}`).click()
  }

  async enterBirthDate(birthDate: string) {
    await this.birthDatePicker.fill(birthDate)
  }

  async pickGender(gender: genderTypes) {
    await this.gender.click()
    await this.page.getByRole("option").getByText(`${gender}`).click()
  }

  async enterAlimonyObligationsAmount(alimonyObligations: number) {
    await this.alimonyObligations.fill(`${alimonyObligations}`)
  }

  async checkAlimonyObligationsAmount(fullAmount: string) {
    await this.alimonyObligations.blur()
    await expect(this.alimonyObligations).toHaveValue(fullAmount)
  }
}

import { test } from "@playwright/test"
import { clientTypeSelectPage } from "./pages/clientTypeSelectPage"
import { newClientEvaluationFormPage } from "./pages/newClientEvaluationFormPage"

test("Select new user and partially fill the form", async ({ page }) => {
  const clientTypePage = new clientTypeSelectPage(page)
  const clientEvaluationFormPage = new newClientEvaluationFormPage(page)
  await clientTypePage.visit()
  await clientTypePage.isPageAvailable()
  await clientTypePage.goToFormAsNewClient()
  await clientEvaluationFormPage.selectNumberOfLoanParticipants(1)
  await clientEvaluationFormPage.enterBirthDate("01-02-1990")
  await clientEvaluationFormPage.pickGender("Kobieta")
  await clientEvaluationFormPage.enterAlimonyObligationsAmount(10000)
  await clientEvaluationFormPage.checkAlimonyObligationsAmount("10 000,00")
})

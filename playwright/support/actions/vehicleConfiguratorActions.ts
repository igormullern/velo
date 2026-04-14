import { expect, Page } from "@playwright/test"

export function createVehicleConfiguratorActions(page: Page) {

  const colorButton = (name: string | RegExp) =>
    page.getByRole("button", { name })

  const wheelsButton = (name: string | RegExp) =>
    page.getByRole("button", { name })

  const optionalCheckbox = (testId: string) =>
    page.getByTestId(testId)

  const checkoutButton = page.getByTestId("checkout-button")

  return {

    async open() {
      await page.goto("/configure")
    },

    async selectColor(name: string | RegExp) {
      await colorButton(name).click()
    },

    async selectWheels(name: string | RegExp) {
      await wheelsButton(name).click()
    },

    async toggleOptional(testId: string) {
      await optionalCheckbox(testId).click()
    },

    async expectOptionalChecked(testId: string, checked: boolean) {
      await expect(optionalCheckbox(testId)).toHaveAttribute(
        "data-state",
        checked ? "checked" : "unchecked"
      )
    },

    async goToCheckout() {
      await checkoutButton.click()
      await page.waitForURL("**/order")
    },

    async expectPrice(price: string) {
      const totalPrice = page.getByTestId("total-price")
      await expect(totalPrice).toBeVisible()
      await expect(totalPrice).toHaveText(price)
    },

    async expectCarImageSrc(src: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(carImage).toHaveAttribute("src", src)
    },
  }
}

export type VehicleConfiguratorActions = ReturnType<
  typeof createVehicleConfiguratorActions
>

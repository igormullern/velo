import { test as base } from "@playwright/test"
import { createOrderLookupActions } from "./actions/orderLookupActions"
import { createVehicleConfiguratorActions } from "./actions/vehicleConfiguratorActions"

type App = {
  orderLookup: ReturnType<typeof createOrderLookupActions>
  vehicleConfigurator: ReturnType<typeof createVehicleConfiguratorActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLookupActions(page),
      vehicleConfigurator: createVehicleConfiguratorActions(page),
    }

    await use(app)
  },
})

export { expect } from "@playwright/test"

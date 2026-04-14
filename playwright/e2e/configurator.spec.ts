import { expect, test } from '../support/fixtures'

test.describe('Configuração de Veículo', () => {
  test.beforeEach(async ({ app }) => {
    await app.vehicleConfigurator.open()
  })

  test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ app }) => {
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')

    await app.vehicleConfigurator.selectColor('Midnight Black')
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')
    
    await app.vehicleConfigurator.expectCarImageSrc('/src/assets/midnight-black-aero-wheels.png')
  })

  test('deve atualizar o preço e a imagem ao alterar as rodas, e restaurar os valores padrão', async ({ app }) => {
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')

    await app.vehicleConfigurator.selectWheels(/Sport Wheels/)
    await app.vehicleConfigurator.expectPrice('R$ 42.000,00')
    await app.vehicleConfigurator.expectCarImageSrc('/src/assets/glacier-blue-sport-wheels.png')

    await app.vehicleConfigurator.selectWheels(/Aero Wheels/)
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')
    await app.vehicleConfigurator.expectCarImageSrc('/src/assets/glacier-blue-aero-wheels.png')
  })
})

test.describe('CT03 - Configuração de Opcionais', () => {
  test.beforeEach(async ({ page, app }) => {
    await page.addInitScript(() => localStorage.removeItem('velo-configurator-storage'))
    await app.vehicleConfigurator.open()
  })

  test('deve acrescentar e reverter R$ 5.500 ao marcar/desmarcar "Precision Park"', async ({ app }) => {
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')

    await app.vehicleConfigurator.toggleOptional('opt-precision-park')
    await app.vehicleConfigurator.expectOptionalChecked('opt-precision-park', true)
    await app.vehicleConfigurator.expectPrice('R$ 45.500,00')

    await app.vehicleConfigurator.toggleOptional('opt-precision-park')
    await app.vehicleConfigurator.expectOptionalChecked('opt-precision-park', false)
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')
  })

  test('deve acrescentar e reverter R$ 5.000 ao marcar/desmarcar "Flux Capacitor"', async ({ app }) => {
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')

    await app.vehicleConfigurator.toggleOptional('opt-flux-capacitor')
    await app.vehicleConfigurator.expectOptionalChecked('opt-flux-capacitor', true)
    await app.vehicleConfigurator.expectPrice('R$ 45.000,00')

    await app.vehicleConfigurator.toggleOptional('opt-flux-capacitor')
    await app.vehicleConfigurator.expectOptionalChecked('opt-flux-capacitor', false)
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')
  })

  test('deve acumular e reverter o preço ao marcar/desmarcar ambos os opcionais', async ({ app }) => {
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')

    await app.vehicleConfigurator.toggleOptional('opt-precision-park')
    await app.vehicleConfigurator.expectPrice('R$ 45.500,00')

    await app.vehicleConfigurator.toggleOptional('opt-flux-capacitor')
    await app.vehicleConfigurator.expectOptionalChecked('opt-precision-park', true)
    await app.vehicleConfigurator.expectOptionalChecked('opt-flux-capacitor', true)
    await app.vehicleConfigurator.expectPrice('R$ 50.500,00')

    await app.vehicleConfigurator.toggleOptional('opt-precision-park')
    await app.vehicleConfigurator.toggleOptional('opt-flux-capacitor')
    await app.vehicleConfigurator.expectOptionalChecked('opt-precision-park', false)
    await app.vehicleConfigurator.expectOptionalChecked('opt-flux-capacitor', false)
    await app.vehicleConfigurator.expectPrice('R$ 40.000,00')
  })


  test('deve redirecionar para /order ao clicar em "Monte o Seu"', async ({ page, app }) => {
    await app.vehicleConfigurator.toggleOptional('opt-precision-park')
    await app.vehicleConfigurator.toggleOptional('opt-flux-capacitor')
    await app.vehicleConfigurator.expectPrice('R$ 50.500,00')

    await app.vehicleConfigurator.goToCheckout()
    await expect(page).toHaveURL(/\/order/)
  })
})

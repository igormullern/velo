import { test, expect } from '@playwright/test'
/// AAA - Arrange, Act, Assert


test('deve consultar um pedido aprovado', async ({ page }) => {
  const numeroPedido = 'VLO-MIT3P9'

  //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  await page.getByLabel('Número do Pedido').fill(numeroPedido)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  //Assert
  await expect(page.getByText(numeroPedido)).toBeVisible({timeout: 10_000})
  await expect(page.getByTestId('order-result-'+ numeroPedido)).toContainText(numeroPedido);
  
  await expect(page.getByText('APROVADO')).toBeVisible()
})  
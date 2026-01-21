import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  //Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  
  await page.getByTestId('search-order-id').fill('VLO-MIT3P9')
  await page.getByTestId('search-order-button').click()

  //Checkpoint
  
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-MIT3P9')
  //Checkpoint status do pedido
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  
})
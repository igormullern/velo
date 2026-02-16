import { test, expect } from '@playwright/test'
import { gerarCodigoPedido } from '../support/helpers'
/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido',() => {

  test.beforeEach(async ({ page }) => {
    //Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    //TestData
    //const numeroPedido = 'VLO-NZVGUZ'

    const order = {
      number: 'VLO-NZVGUZ',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'João Fonseca',
        email: 'jf@hotmail.com',
      },
      payment: 'À Vista',
    }
      
    //Act
    await page.getByLabel('Número do Pedido').fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
       //Assert
    /*const containerPedido = page.getByRole('paragraph')
      .filter({hasText: /^Pedido$/})
      .locator('..')
       await expect(containerPedido).toContainText(numeroPedido, {timeout: 10_000})
    await expect(page.getByText('APROVADO')).toBeVisible();*/
       await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({hasText: order.status})
      
      await expect(statusBadge).toHaveClass(/bg-red-100/)
      await expect(statusBadge).toHaveClass(/text-red-700/)

      const statusIcon = await statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-x/)
  }); 
      
  test('deve consultar um pedido aprovado', async ({ page }) => {
    //TestData
    //const numeroPedido = 'VLO-MIT3P9'
    const order = {
      number: 'VLO-MIT3P9',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Igor Muller',
        email: 'igor.natal@hotmail.com',
      },
      payment: 'À Vista',
    }

    //Act
    await page.getByLabel('Número do Pedido').fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    //Assert
    /*const containerPedido = page.getByRole('paragraph')
      .filter({hasText: /^Pedido$/})
      .locator('..')

    await expect(containerPedido).toContainText(numeroPedido, {timeout: 10_000})
    await expect(page.getByText('APROVADO')).toBeVisible();*/

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({hasText: order.status})
      
      await expect(statusBadge).toHaveClass(/bg-green-100/)
      await expect(statusBadge).toHaveClass(/text-green-700/)

      const statusIcon = await statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)
  });

  test('deve consultar um pedido em análise', async ({ page }) => {
    //TestData
    //const numeroPedido = 'VLO-MIT3P9'
    const order = {
      number: 'VLO-ESMBCM',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Maria Teresa',
        email: 'mt@gmail.com',
      },
      payment: 'À Vista',
    }

    //Act
    await page.getByLabel('Número do Pedido').fill(order.number)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    //Assert
    /*const containerPedido = page.getByRole('paragraph')
      .filter({hasText: /^Pedido$/})
      .locator('..')

    await expect(containerPedido).toContainText(numeroPedido, {timeout: 10_000})
    await expect(page.getByText('APROVADO')).toBeVisible();*/

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

      const statusBadge = page.getByRole('status').filter({hasText: order.status})
      
      await expect(statusBadge).toHaveClass(/bg-amber-100/)
      await expect(statusBadge).toHaveClass(/text-amber-700/)

      const statusIcon = await statusBadge.locator('svg')
      await expect(statusIcon).toHaveClass(/lucide-clock/)
  });

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
  const order = gerarCodigoPedido()
  
   //Act
  await page.getByLabel('Número do Pedido').fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  //Assert
 //const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
 //await expect(title).toBeVisible();
 
 //const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
 //await expect(message).toBeVisible();

 await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `)
  })
}) 


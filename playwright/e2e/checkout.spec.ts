import { expect, test } from '../support/fixtures'
import { deleteOrderByDocument } from '../support/database/orderRepository'

test.describe('Checkout', () => {

  test.describe('Validações de campos obrigatórios', () => {

    let alerts: any

    test.beforeEach(async ({ page, app }) => {
      await page.goto('/order')
      await expect(page.getByRole('heading', {name: 'Finalizar Pedido'})).toBeVisible()

      alerts = app.checkout.elements.alerts

    })

    test('deve validar a obrigatoriedade de todos os campos em branco', async ({ app }) => {
        
    
    //Act
    await app.checkout.submit()

    //Assert
    await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
    await expect(alerts.lastName).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
    await expect(alerts.email).toHaveText('Email inválido')
    await expect(alerts.phone).toHaveText('Telefone inválido')
    await expect(alerts.document).toHaveText('CPF inválido')
    await expect(alerts.store).toHaveText('Selecione uma loja')
    await expect(alerts.terms).toHaveText('Aceite os termos')
    })

    test('deve validar limite mínimo de carecteres para nome e sobrenome', async ({ app }) => {
      
      const customer = {
          name: 'J',
          lastName: 'S',
          email: 'joao.silva@email.com',
          phone: '(11)9999-9999',
          document: '123.456.789-01',
        }

      //Arrange
      await app.checkout.fillCustomerData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      //Act
      await app.checkout.submit()

      //Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastName).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ app }) => {
         
      const customer = {
        name: 'João',
        lastName: 'Silva',
        email: 'cliente@com',
        phone: '(11)9999-9999',
        document: '123.456.789-01',
      }

    //Arrange
    await app.checkout.fillCustomerData(customer)
    await app.checkout.selectStore('Velô Paulista')
    await app.checkout.acceptTerms()

    //Act
    await app.checkout.submit()

    //Assert
    await expect(alerts.email).toHaveText('Email inválido')
    })

    test('deve exibir erro para documento inválido', async ({ app }) => {

      const customer = {
        name: 'Fernando',
        lastName: 'Papito',
        email: 'papito@test.com',
        document: '00000014199',
        phone: '(11) 99999-9999'
      }

      // Arrange
      await app.checkout.fillCustomerData(customer)
      await app.checkout.selectStore('Velô Paulista')
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.document).toHaveText('CPF inválido')
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ app }) => {

      const customer = {
        name: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com',
        phone: '(11)9999-9999',
        document: '123.456.789-01',
      }
    

    //Arrange
    await app.checkout.fillCustomerData(customer)
    await app.checkout.selectStore('Velô Paulista')
    
    await expect(app.checkout.elements.terms).not.toBeChecked()
    
    //Act
    await app.checkout.submit()
    
    //Assert
    await expect(alerts.terms).toHaveText('Aceite os termos')
    })
  })

  test.describe('Pagamento e Confirmação', () => {

    test.beforeEach(async () => {
      await deleteOrderByDocument('441.458.180-08')
    })

    test('deve criar um pedido com sucesso para pagamento à vista', async ({ page, app }) => {
      const customer = {
        name: 'João',
        lastName: 'Silva',
        email: 'joao.silva@email.com',
        phone: '(11)9999-9999',
        document: '441.458.180-08',
      }
      const storeName = 'Velô Paulista'

      // Arrange
      await page.goto('/')
      await page.getByRole('link', { name: /Configure Agora/i }).first().click()
      
      await expect(page).toHaveURL(/\/configure/)
      await app.configurator.finishConfigurator()
      
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerData(customer)
      await app.checkout.selectStore(storeName)
      
      // Act
      await app.checkout.selectPaymentMethod('À Vista')
      await app.checkout.expectSummaryTotal('R$ 40.000,00')
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await expect(page).toHaveURL(/\/success/)
      await expect(page.getByRole('heading', { name: 'Pedido Aprovado!' })).toBeVisible()
    })
  })
})

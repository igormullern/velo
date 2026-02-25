export function gerarCodigoPedido() {
  const prefixo = "VLO"
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numeros = "0123456789"

  let codigoLetras = ""
  let codigoNumeros = ""

  for (let i = 0; i < 3; i++) {
    codigoLetras += letras.charAt(Math.floor(Math.random() * letras.length))
    codigoNumeros += numeros.charAt(Math.floor(Math.random() * numeros.length))
  }

  return `${prefixo}-${codigoLetras}${codigoNumeros}`
}

import { Page } from "@playwright/test"

export async function searchOrder(page: Page, orderNumber: string) {
  await page
    .getByRole("textbox", { name: "Código do Pedido" })
    .fill(orderNumber)
  await page.getByRole("button", { name: "Buscar Pedido" }).click()
}

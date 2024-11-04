// cypress/support/commands.ts
declare namespace Cypress {
  interface Chainable {
    setLoanAmount(amount: number): Chainable<void>

    setLoanPeriod(months: number): Chainable<void>

    getMonthlyPayment(): Chainable<string>
  }
}

Cypress.Commands.add('setLoanAmount', (amount: number) => {
  cy.get('input[label="Amount"]').clear().type(amount.toString())
})

Cypress.Commands.add('setLoanPeriod', (months: number) => {
  cy.get('input[label="Date"]').click()
  cy.contains(`${months} months`).click()
})

Cypress.Commands.add('getMonthlyPayment', () => {
  return cy
    .get('.calculator__info .calculator__heading')
    .invoke('text')
    .then(text => text.replace('€', '').trim())
})

// cypress/e2e/calculator.cy.ts
describe('Loan Calculator', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#calculator-section').should('be.visible')
  })

  it('completes a successful loan calculation flow', () => {
    // Input amount via text field
    cy.get('.v-text-field input')
      .first()
      .clear()
      .type('5000')
      .should('have.value', '5,000')

    // Select loan period from dropdown
    cy.get('.v-select').click()
    cy.get('.v-list-item').contains('24 months').click()

    // Verify all values are displayed correctly in the calculator section
    cy.get('#calculator-section').within(() => {
      // Verify input field shows correct amount
      cy.get('.v-text-field input').first().should('have.value', '5,000')

      // Verify period is selected
      cy.get('.v-select input').should('have.value', '24')

      // Verify monthly payment
      cy.get('.calculator__info .calculator__heading').should(
        'contain',
        '208.33€',
      )
    })

    // Test that the Apply button is enabled
    cy.get('.calculator__button').should('not.be.disabled')
  })

  it('validates input constraints', () => {
    const amountInput = cy.get('.v-text-field input').first()

    // Test minimum amount validation
    amountInput.clear().type('200')
    cy.contains('Minimum amount is 300€').should('be.visible')
    cy.get('.calculator__button').should('be.disabled')

    // Test maximum amount validation
    amountInput.clear().type('8000')
    cy.contains('Maximum amount is 7200€').should('be.visible')
    cy.get('.calculator__button').should('be.disabled')

    // Test valid amount enables button
    amountInput.clear().type('5000')
    cy.get('.calculator__button').should('not.be.disabled')
  })

  it('handles number formatting correctly', () => {
    const amountInput = cy.get('.v-text-field input').first()

    // Test basic input formatting
    amountInput.clear().type('1000').should('have.value', '1,000')

    // Test comma separated input
    amountInput.clear().type('2,500').should('have.value', '2,500')

    // Test that non-numeric characters are filtered
    amountInput.clear().type('1,234.56').should('have.value', '123,456')
  })

  it('synchronizes slider and input field', () => {
    // Move slider and verify input updates
    cy.get('.v-slider')
      .first()
      .click('center')
      .then(() => {
        // Get input value and verify it's in range
        cy.get('.v-text-field input')
          .first()
          .invoke('val')
          .then(value => {
            const numericValue = Number(value.toString().replace(/[^0-9]/g, ''))
            expect(numericValue).to.be.gte(300)
            expect(numericValue).to.be.lte(7200)
          })
      })

    // Update input and verify slider updates
    cy.get('.v-text-field input').first().clear().type('5000')

    cy.get('.v-slider input').first().should('have.value', '5000')
  })
})

/// <reference types="Cypress" />
import 'cypress-axe'

describe("My Second Test", () => {
  it('Navigate to CIS V5', () => {
    cy.visit('https://cisv5dev.infinitycis.com/')
    cy.wait(1000)
    cy.get('input[id$="_username"]').type('advanced', {force: true})
    cy.wait(1000)
    cy.get('input[id$="password"]').type('ciscon4{enter}', {force: true})

    cy.wait(10000)

    cy.injectAxe()
    cy.checkAccessbility("V5Report")
  })
})
/// <reference types="Cypress" />
import 'cypress-axe'

describe('My First Test', () => {
  it('Link Dev login page', () => {
    var reportName = "MyReport.html"
    cy.visit('https://qalinkv4.infinitycis.com/dev/en-ca/')

    cy.injectAxe()
    cy.checkAccessbility("AccessibilityReport")
  })
})
describe('Custom Command Get Text Demo', () => {

    it('should use custom command to get text', () => {
      cy.visit('https://www.letskodeit.com/practice')

      cy.get('#openwindow').then(($element) => {
        const itemText = $element.text()
        expect(itemText).eq('Open Window')
      })

      cy.get('#openwindow').getText().then((elementText) => {
        expect(elementText).eq('Open Window')
        cy.log(elementText.text())
      })
    })
  })

  ///----------In support/commands.ts-------------------------
  // ---add this code ----------
  /*

  declare namespace Cypress {
    interface Chainable<Subject> {
      getText(elementText: string): Chainable<Subject>;
    }
  }

  Cypress.Commands.add('getText', {prevSubject: 'element'}, ($element) => {
    cy.wrap($element).scrollIntoView()
    return cy.wrap($element).invoke('text')
  })


  */
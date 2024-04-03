describe('Providing empty data to input field', () => {
    
    it('should not login to app using empty username', () => {
      cy.visit('https://www.letskodeit.com/login')
      cy.get('#email').type('{backspace}')
      cy.get('#login').click()

    })
  })


  ///----------In support/e2e.ts-------------------------
  // ---add this code ----------
  /*
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })


  */
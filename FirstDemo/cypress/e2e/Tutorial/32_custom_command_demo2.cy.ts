describe('Custom Command Practical Demo', () => {

    it('should use custom command to login', () => {
      cy.visit('https://www.letskodeit.com/login')
      cy.login('test@email.com', 'abcabc')
    })

    it('should use custom command to search', () => {
      cy.visit('https://www.letskodeit.com/courses')
      cy.searchCourse("All", "java")
    })
  })

  ///----------In support/commands.ts-------------------------
  // ---add this code ----------
  /*

  declare namespace Cypress {
    interface Chainable<Subject> {
      getText(elementText: string): Chainable<Subject>;
      login(email: string, password: string): Chainable<Subject>;
      searchCourse(category: string, courseString: string): Chainable<Subject>;
    }
  }

Cypress.Commands.add('login', (email, password) => {
    cy.get('#email').type(email)
    cy.get('#login-password').type(password)
    cy.get('#login').click()
    cy.get('#dropdownMenu1').should('exist')
})

Cypress.Commands.add('searchCourse', (category, courseString) => {
    cy.get('select[name="categories"]').select(category)
    cy.get('input[placeholder="Search Course"]').type(courseString)
    cy.get('button[class="find-course search-course"]').click()
})


  */
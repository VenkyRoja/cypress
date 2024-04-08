Cypress.Commands.add('parseXlsx', (inputfile) => {
    return cy.task('parseXlsx', { filepath: inputfile})
})
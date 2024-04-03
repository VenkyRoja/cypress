describe('Cypress implicit assertions - demo', () => {
   
    it('should understand implicit assertions of cypress',  () => {
        cy.visit('https://www.letskodeit.com/practice')
        
        cy.get('#product')
        .should('have.class', 'table-display')
        .and('be.visible')
        .find('tbody tr:nth-child(2)')
        .find('td')
        .last()
        .should('contain', '35')
        .and('have.text', '35')
        .and('have.class', 'price')

       
    })
})
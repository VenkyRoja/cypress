describe('Cypress Asynchronous nature - demo', () => {
   
    it('should understand asynchronous nature of cypress',  () => {
        cy.visit('https://www.letskodeit.com/practice')
        
        cy.wait(5000)
        
        cy.get('button')

        cy.get('#open-window-example-div')

        cy.get('#opentab')

        cy.get('#name')

        console.log('I am a JavaScript command')
    })
})
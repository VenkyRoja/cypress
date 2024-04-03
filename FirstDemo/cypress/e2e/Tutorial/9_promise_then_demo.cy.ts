describe('Cypress promise handling - demo', () => {
   
    it('should understand promise handling nature of cypress',  () => {

        cy.visit('https://www.letskodeit.com/practice').then( () => {
            
            cy.get('button')
        })
        
        cy.wait(5000)

        cy.get('#open-window-example-div')

        cy.get('#opentab')

        cy.get('#name').then(() => {
            
            console.log('I am a JavaScript command')

        })

        
    })
})
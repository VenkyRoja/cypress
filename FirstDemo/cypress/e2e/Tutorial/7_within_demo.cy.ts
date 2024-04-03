describe('Within command - demo', () => {
   
    it('should learn within command details',  () => {
        cy.visit('https://www.letskodeit.com/practice')
        
        cy.get('button')

        cy.get('#open-window-example-div').within(() => {
            cy.get('button')
        }).should('have.id', 'openwindow')  
        
        cy.get('#open-window-example-div').within(() => {
            cy.get('button').click()
        }).should('have.id', 'open-window-example-div')  

        cy.get('#open-window-example-div').find('button').click()

        cy.get('#open-window-example-div').find('button').should('have.id', 'openwindow').click()

        cy.get('#open-window-example-div').find('button', {log: false})

        cy.get('#open-window-example-div').find('button', {timeout: 12000})

    })
})
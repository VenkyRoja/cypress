describe('Cypress explicit assertions - demo', () => {
   
    it('should understand explicit assertions of cypress',  () => {
        cy.visit('https://www.letskodeit.com/practice')
        
        let firsttext
        let secondtext

        cy.get('#product').find('tbody tr:nth-child(2)').find('td')
        .first().then(($first) =>{
            firsttext = $first.text()
        })
        
        cy.get('#product').find('tbody tr:nth-child(3)').find('td')
        .first().then(($second) =>{
            secondtext = $second.text()
            expect(secondtext, 'Verify first and second text').to.equal(firsttext)
        })

       
    })
})
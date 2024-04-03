describe('Get Method details - demo', () => {
   
    it('should learn get() method details',  () => {
        cy.visit('https://www.letskodeit.com/practice')
        
        cy.get('input', {log: false})  //defalt is true

        cy.get('input', {timeout: 6000})  //timeout time is milli seconds (ms)
    })
})
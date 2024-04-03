describe('Printing information', () => {
   
    it('01 Print sample', function () {

        const data = [
            { id: 1, name: 'Alice', age: 30 },
            { id: 2, name: 'Bob', age: 25 },
            { id: 3, name: 'Charlie', age: 35 }
          ];
          
        const myStr = 'Rama';

        cy.task('table', data)
        cy.task('log', myStr)
    })
})

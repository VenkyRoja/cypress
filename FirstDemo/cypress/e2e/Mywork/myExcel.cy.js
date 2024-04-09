


describe('Reading from and Writing to Excel file ', () => {
    it('01 should read from an Excel file', () => {
        cy.task('ReadExcel',{file: 'MyWork/sheet.xlsx', sheetname: 'Sheet1'}).then((rows) => {
        
            cy.task('log', 'rows = ' + rows.length)
            cy.writeFile('MyWork/sheet.json', {rows})
        })
    })

    it.only('02 should write to Excel file', () => {

        var data = [{
            firstName: 'John',
            lastName: 'Doe'
           }, {
            firstName: 'Smith',
            lastName: 'Peters'
           }, {
            firstName: 'Alice',
            lastName: 'Lee'
           }, {
            firstName: 'King',
            lastName: 'Spidey'
           }];
           
           var str = cy.task('WriteExcel', {jsonData: data, sheetname: 'Responses',  filepath: 'MyWork/sampleData.xlsx'})
            
    })

})
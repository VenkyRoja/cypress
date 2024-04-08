


describe('Writing to Excel file ', () => {
    it('should write to Excel file', () => {
        cy.task('ReadExcel',{file: 'MyWork/sheet.xlsx', sheetname: 'Sheet1'}).then((rows) => {
        
            cy.task('log', 'rows = ' + rows.length)
            cy.writeFile('MyWork/sheet.json', {rows})
        })
    })
})
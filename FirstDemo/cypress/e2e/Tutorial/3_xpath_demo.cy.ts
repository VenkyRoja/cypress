/*
Install cypress-xpath before applying this program.
Use below command to install cypress-xpath.
npm install -D cypress-xpath
*/

require('cypress-xpath')
describe('Cypress XPath demo', () => {
   
    it('should verify xpath capabilities',  () => {
        cy.visit('https://www.letskodeit.com/courses')
        

        cy.xpath('//input[@id="search"]').type('Test')
        cy.xpath('//div[@id="course-list"]').xpath('./div').should('have.length', 6)

    })
})

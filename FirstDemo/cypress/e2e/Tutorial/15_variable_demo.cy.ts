let getText;
describe("find text of an element in cypress ", () => {

    it("Find Text - using variable ", () => {
        cy.visit("https://www.linkedin.com/")
        cy.get('[data-test-id="hero__headline"]').then(($value) => {
            getText = $value.text()
        })
    })


    it("Print Value - Uisng Variables ", function () {
        cy.log("Print Value - Using Variables ====== ", getText)
    })




})
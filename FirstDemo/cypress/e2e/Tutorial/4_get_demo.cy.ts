describe('Get Method and CSS Examples', () => {
   
    it('should learn get() method and CSS examples',  () => {
        cy.visit('https://courses.letskodeit.com/practice')

        //findElement and findElements
        //Tag Name
        cy.get('button')

        //Id  # 
        cy.get('#name')
    
        //Class Name . dot
        cy.get('.inputs')

        //Attribute value
        cy.get("[placeholder='Enter your name']")

        //Attribute value
        cy.get("[class='inputs displayed-class']")

        //Tag Name and Attribute value
        cy.get("input[id='name']")


        //Tag Name and Attribute value
        cy.get("input[id='name']:visible")

        //Tag Name and Multiple Attribute values
        cy.get("input[id='name'][placeholder='Enter your name']")        

    })

})
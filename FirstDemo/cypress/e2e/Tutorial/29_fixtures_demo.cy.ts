describe('Fixtures Demo', () => {

    let golbalData;

    before('Before Hook', () => {
        cy.fixture("example").then((data) => {
            golbalData = data 
        })
    })
    
    it('should understand how to use fixtures for reading data', () => {
      cy.visit("https://www.letskodeit.com/login");
      cy.get('#email').type(golbalData.testid1.username);
      cy.get('#login-password').type(golbalData.testid1.password);
    })
})

/*
Create a file, call it example.json, create the file in fixtures folder 
---------------
{
  "testid1": {
    "username": "Test Username",
    "password": "Test Password"
  },

  "testid2": {
    "course_name": "Cypress"
  }
}
--------------

*/
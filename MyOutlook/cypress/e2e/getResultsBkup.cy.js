
describe('Reading outlook mails', () =>  {
/*
    beforeEach(function () {
        cy.fixture('MyCredentials').then(function (c) {
          this.c = c
        }) //fixture 1 ends
    }) //beforeEach ends

    //-----------1--------------------
    it('Show JSON array ', function () {
        cy.ShowDataArray()
    }) //it 1 ends 
*/
    //-----------2--------------------
    it('Reading Excel to JSON array ', function () {
        cy.ReadmyExcel()
    }) //it 2 ends 
    
    //-------------3--------------------
    it('Get results ', function () {
        cy.GetResults()
    }) //it 3 ends
    
}) //describe ends
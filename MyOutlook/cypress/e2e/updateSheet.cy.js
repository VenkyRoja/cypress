describe('Update the sheet', () =>  {

    beforeEach(function () {
        cy.fixture('MyCredentials').then(function (c) {
          this.c = c
        }) //fixture 1 ends
    }) //beforeEach ends  

    //-----------1--------------------
    it('Reading results Excel', function () {
        cy.updateSheet()
    }) //it 1 ends 


    //-------------2--------------------
    it.skip('Show the Data Array  ', function () {
        cy.ShowDataArray()
    }) //it 2 ends

}) //describe ends

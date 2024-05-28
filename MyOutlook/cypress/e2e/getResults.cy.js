describe('Get Results', () =>  {

    beforeEach(function () {
        cy.fixture('MyCredentials').then(function (c) {
          this.c = c
        }) //fixture 1 ends
    }) //beforeEach ends  

    //-----------1--------------------
    it('Reading Excel', function () {
        cy.GetResults() 
    }) //it 1 ends 

    //-------------2--------------------
    it('Save Resultt Array to Excel and copy to my folder ', function () {
        cy.SaveResultArray()
        cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script2 ).then((result) => {            
            cy.task('log',  result.stdout)
        }) //exec statement ends
    }) //it 2 ends

    //-------------2--------------------
    it('Show the Result Array  ', function () {
        cy.ShowResultArray()
    }) //it 2 ends

}) //describe ends

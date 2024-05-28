


describe('Reading outlook mails', () =>  {

    beforeEach(function () {
        cy.fixture('MyCredentials').then(function (c) {
          this.c = c
        }) //fixture 1 ends
    }) //beforeEach ends

    //-----------1--------------------
    it('Reading Outlook ', function () {
        cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script1 ).then((result) => {            
            const lines = result.stdout.split('\n')
            //cy.ShowLines(lines)
            cy.StoreBaseData(lines)
        }) //exec statement ends
        cy.task('log',  'Mails are read and data is stored as JSON array.')
    }) //it 1 ends   
    
    //-------------2--------------------
    it('Save Data Array to Excel and copy to my folder ', function () {
        cy.SaveDataArray()
        cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script2 ).then((result) => {            
            cy.task('log',  result.stdout)
        }) //exec statement ends
    }) //it 2 ends


    //-------------3--------------------
    it('Show Data Array again ', function () {
        cy.ShowDataArray()
    }) //it 3 ends
    //---------------------------------

}) //describe ends



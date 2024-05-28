
var myvar = ''

describe('testing 123', () =>  {

    //-----------1--------------------
    it('my test tc ', function () {
        
        var url = 'https://urldefense.com/v3/__https://teamcity.infinitycis.com/viewLog.html?buildId=114157&buildTypeId=CisV5_RunV5uiAutomation5164salesScenarios__;!!HzYX23eHnp2Wbe4!UeJXsVvDCqYkTZ4RwOsFLGBkXQdtRpUlrqGEKXRFMmupx4fFV7p_C9ASCwHiMACGcX80z8IFnFca-DFTQKAbUGrw9zTmawhwenEwWdWsGny6fw$ '
        //GetResultsV5Mail(url)
        //cy.task('log', "The value is | " + myvar + " |") 
       cy.visit('/')

    }) // it1 ends

    //-------------2--------------------
    it('Show Variable ', function () {
        //cy.task('log', "The value is | " + myvar + " |")
            
    }) //it2 ends
})


//=============================================
function test(url) {
 
    cy.task('log', "test function starts")

    cy.fixture('MyCredentials').then(function (c) {
        this.c = c
        cy.task('log', "hello 0")

        cy.visit(url)
        cy.task('log', "hello 1")
       
    }) // fixture ends


    cy.task('log', "test function ends")

} //test ends


//------------------------- 2--------------------------------------
function GetResultsV5Mail(url) {
 
    cy.task('log', "GetResultsV5Mail starts")

    cy.fixture('MyCredentials').then(function (c) {
        this.c = c
        cy.task('log', "===>|" + url + "|<===" )
       
        cy.visit(url)
           
        cy.task('log', "hello 1")
        
        cy.get('body').then(($body) => {
            cy.task('log', "hello 2")
           if ($body.find(this.c.tHeader).length) {

                cy.get(this.c.tHeader)
                .should('be.visible')
                .and('contain', this.c.tLoginText)

                cy.task('log', "~~~~~~~~~~~~ This team city login page ") 
                cy.get(this.c.tUN).type(this.c.tUser)
                cy.get(this.c.tPW).type(this.c.tPwd)
                cy.get(this.c.tLogin).click() 
            
            } 
        }) // get body ends
            //else {

                cy.task('log', "~~~~~~~~~~~~ NOT team city login page ")  
                cy.get(this.c.tBuildPageHeader).invoke('text').then((text) => {
                    cy.task('log', `Page header: ${text}`)
                    myvar = text
                }) 
                
            //}
        
        

    }) // fixture ends


    cy.task('log', "GetResultsV5Mail ends")

} //GetResultsV5Mail ends
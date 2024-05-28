

//------Excel Variables--------
var xlReportName = "MyReport.xlsx"
var shName = "Summary"
var startRow = 3
var startCol = "B"
var xlFolder = 'C:/Users/vp101121/harriscomputer/R & D Archive - QA Team/Products/QA Automation'

//--------------------------
const Excel = require('exceljs')

describe('my test 2', () =>  {

    beforeEach(function () {
        cy.fixture('MyCredentials').then(function (c) {
          this.c = c
        }) //fixture 1 ends
    }) //beforeEach ends

    //-----------1--------------------
    it('Reading Excel', function () {
        var fileName = xlFolder + "/" + xlReportName
        cy.readFile(fileName, 'binary').then((excelData) => {      
            var wb = new Excel.Workbook()
            return wb.xlsx.load(excelData).then((wb) => {
                var ws = wb.getWorksheet(shName)
                var endRow = ws.rowCount
                var myurl = ws.getCell('I7').toString().trim()

                V5Mail(myurl) 

               


                cy.task('log', "end Row =  " + endRow)
            }) //xlsx load ends
        }) //readfile ends
    }) //it 1 ends 

}) //describe ends


//------------------------- 2--------------------------------------
function V5Mail(myurl) {
    cy.task('log', "V5Mail starts")
    cy.fixture('MyCredentials').then(function (c) {
        this.c = c
        cy.visit(myurl)
        cy.get('body').then(($body) => {
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

        cy.task('log', "~~~~~~~~~~~~ NOT team city login page ")  
        cy.get(this.c.tBuildPageHeader).invoke('text').then((text) => {
            cy.task('log', `Page header: ${text}`)
        }) 
    }) // fixture ends
    cy.task('log', "V5Mail ends")

} //V5Mail ends
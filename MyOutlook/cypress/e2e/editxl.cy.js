

//------Excel Variables--------
var xlReportName = "old.xlsx"
var xlNewReportName = "new.xlsx"
var shName = "Performance JMeter"
var startRow = 3
var startCol = "B"
var xlFolder = 'C:/Users/vp101121/harriscomputer/R & D Archive - QA Team/Products/QA Automation'

//--------------------------
const Excel = require('exceljs')
var FileSaver = require('file-saver')

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
                var myval = ws.getCell('C38').toString().trim()

                ws.getCell('C' + (endRow+1)).value = "Ha Ha Ha Ha Ha Ha Ha Ha Ha"

                cy.task('log', "myval =  " + myval)

                ws.insertRow(1, [3, 'Sam', new Date()]);

                cy.task('log', "end Row =  " + endRow)

                var newfileName = xlFolder + "/" + xlNewReportName

                wb.xlsx.writeBuffer().then((buffer) => 
                    FileSaver.saveAs(new Blob([buffer]), xlNewReportName))

            }) //xlsx load ends
        }) //readfile ends
    }) //it 1 ends 

}) //describe ends


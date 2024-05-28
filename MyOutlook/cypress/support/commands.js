// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//--------------------------------------Venky's code starts ------------------------------------
var DataArray = []
var jsonObject = []
var ResultArray = []
var AssignmentArray = []


//------Excel Variables--------
var xlReportName = "MyReport.xlsx"
var shName = "Summary"
var startRow = 3
var startCol = "B"
var xlFolder = 'C:/Users/vp101121/harriscomputer/R & D Archive - QA Team/Products/QA Automation'


//-----Other Variables----------
var downloadLoc = 'C:\\Tutorials\\MyCypress\\MyOutlook\\cypress\\downloads'
var downloadFilename  = 'index.html'
var downloadFilename2  = 'ExtentReport.html'
var jsonFile = "statistics.json"

var CISV5UITests = 'CIS V5 UI Regression Tests'
var CISRESTTests = 'CIS REST Regression Tests'
var CISV4UITests = 'CIS V4 UI Regression Tests'
var CISPerfTests = 'CIS Performance Tests'

var CIS4ReportsFolder = `"C:/Users/vp101121/harriscomputer/R & D Archive - QA Team/Products/QA Automation/CIS V4/Test Reports"`

var xlMainReportName = "Executions Summary 2024.xlsx"
var shPerf = "Performance JMeter"
var shRest = "REST"
var shV5 = "V5 UI"
var shV4 = "V4 UI"
var shAsg = "Assignments"


//---------------------------

const Excel = require('exceljs');
var FileSaver = require('file-saver')
const fs = require('fs');
import 'cypress-wait-until'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})
//-----------------------------------------------------------------

//---------Command Functions-----------------------
//------------------------- 1--------------------------------------
Cypress.Commands.add('StoreBaseData', (lines) => {

  let j = 0
  for (let k = 0; k < lines.length; k++) {

      let str = lines[k]

      if (lines[k] === 'THE BEGIN') {

          var p1 
          var p2
          var p3
          var p4
          var p5
          var p6
          var p7

          var emailSubject
          var testType
          var testNotes
          var cisVersion
          var tcBuild
          var url0Desc
          var url0
          var url1Desc
          var url1

          var emailsubjectLine = lines[k+1]
          var testtypeLine = lines[k+2]
          var testnotesLine = lines[k+3]
          var CISversionLine = lines[k+4]
          var teamcitybuildLine = lines[k+5]
          var url0Line = lines[k+6]
          var url1Line = lines[k+7]

          p1 = emailsubjectLine.split('||')
          emailSubject = p1[1].trim()

          p2 = testtypeLine.split('||')
          testType = p2[1].trim()

          p3 = testnotesLine.split('||')
          testNotes = p3[1].trim()

          p4 = CISversionLine.split('||')
          cisVersion = p4[1].trim()

          p5 = teamcitybuildLine.split('||')
          tcBuild = p5[1].trim()

          p6 = url0Line.split('||')
          url0Desc = p6[1].trim()
          url0 = p6[2].trim()

          if (url1Line !== 'THE END') {
            p7 = url1Line.split('||')
            url1Desc = p7[1].trim()
            url1 = p7[2].trim()
          } else {
            url1Desc = ''
            url1 = ''
          }

          DataArray.push({
              "Email Subject": emailSubject,
              "Test type": testType,
              "Test notes": testNotes,
              "CIS Version": cisVersion,
              "TeamCity Build": tcBuild,
              "URL0 Reference": url0Desc,
              "URL0": url0,
              "URL1 Reference": url1Desc,
              "URL1": url1
          })
      
          j++
          continue
      } //if ends
  } //for loop of lines ends
}) //StoreBaseData ends


//------------------------- 2--------------------------------------
Cypress.Commands.add('SaveDataArray', () => {
  SaveDataArraytoExcel()
})

//------------------------- 3--------------------------------------
Cypress.Commands.add('SaveResultArray', () => {
  SaveResultArraytoExcel()
})

//------------------------- 4--------------------------------------
Cypress.Commands.add('ShowDataArray', () => {
  cy.task('log', DataArray)
})

//------------------------- 5--------------------------------------
Cypress.Commands.add('ShowResultArray', () => {
  cy.task('log', ResultArray)
})

//------------------------- 6--------------------------------------
Cypress.Commands.add('ReadmyExcel', () => {
  ReadExceltoJSONArray()
})

//------------------------- 7--------------------------------------
Cypress.Commands.add('GetResults', () => {

  cy.fixture('MyCredentials').then(function (c) {
    this.c = c
    var ws
    var wb
    var fileName = xlFolder + "/" + xlReportName
    
    //cy.task('log', "file name =  " + fileName) 
    cy.readFile(fileName, 'binary').then((excelData) => {      
        wb = new Excel.Workbook()
        return wb.xlsx.load(excelData).then((wb) => {
          var myurl
          ws = wb.getWorksheet(shName)
          var endRow = ws.rowCount
          //cy.task('log', "end Row =  " + endRow)

          for (let i=startRow+1; i <= endRow; i++) {
            var testType = ws.getCell('D' + i).toString().trim()

            jsonObject = {
              "SN": ws.getCell('B' + i).toString().trim(),
              "Email Subject": ws.getCell('C' + i).toString().trim(),
              "Test type": ws.getCell('D' + i).toString().trim(),
              "Test notes": ws.getCell('E' + i).toString().trim(),
              "CIS Version": ws.getCell('F' + i).toString().trim(),
              "TeamCity Build": ws.getCell('G' + i).toString().trim(),
              "URL0 Reference": ws.getCell('H' + i).toString().trim(),
              "URL0": ws.getCell('I' + i).toString().trim(),
              "URL1 Reference": ws.getCell('J' + i).toString().trim(),
              "URL1": ws.getCell('K' + i).toString().trim()
            }

            cy.task('log', "---------------------------( " + (i-startRow) + " ) testType =  " + testType + "---------------- Row# = " + i + '-------------------------')
            if (testType === CISV5UITests) {
              GetResultsV5Mail(jsonObject, i)
            } else if (testType === CISRESTTests) {
              GetResultsRESTMail(jsonObject, i)
            }  else if (testType === CISV4UITests) {
              GetResultsV4Mail(jsonObject, i)
            } else if (testType === CISPerfTests) {
              GetResultsJMeterMail(jsonObject, i)
            } 
            
          } // end for loop

      }) //xlsx load ends

  }) //readfile ends

 }) // fixture ends

}) // GetResults function ends

//------------------------- 8--------------------------------------
Cypress.Commands.add('ShowLines', (lines, lineFlag = true) => {
  for (let i=0; i < lines.length; i++) {
    if (lineFlag) {
      cy.task('log', "Line " + (i+1) + " : " + lines[i])
    } else {
      cy.task('log', lines[i])
    }
  }
}) // ShowLines function ends


//------------------------- 9--------------------------------------
Cypress.Commands.add('CopyMyReportxlsx', () => {
  cy.fixture('MyCredentials').then(function (c) {
    this.c = c
    cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script2 ).then((result) => {            
      cy.task('log',  result.stdout)
    }) //exec statement ends
  }) //fixture ends
}) // CopyMyReportxlsx function ends

//------------------------- 10--------------------------------------
Cypress.Commands.add('TCLogin', () => {
  cy.fixture('MyCredentials').then(function (c) {
    this.c = c

    cy.get(this.c.tUN).type(this.c.tUser)
    cy.get(this.c.tPW).type(this.c.tPwd)
    cy.get(this.c.tLogin).click() 

  }) //fixture ends
}) // CopyMyReportxlsx function ends

//------------------------- 11--------------------------------------
Cypress.Commands.add('updateSheet', () => {

  ReadAndUpdateExcel()

}) // updateSheet function ends 

//------------------------- 12--------------------------------------
Cypress.Commands.add('ReadAssignmentSheet', (wb, shName, startRow) => {
  ReadSheettoAssgnmentArray(wb, shName, startRow) 
})

//---------Normal Functions-----------------------

//------------------------- 1--------------------------------------
function SaveDataArraytoExcel(item) {

  try {
        
    let keys = []
    let values = []
    let arr = []
    var tloc = startCol + startRow

    let i = 0
    DataArray.forEach(item => {
      keys = Object.keys(item);
      values = Object.values(item);
      
      arr[i] = [];
      for (let k=1; k <= values.length; k++) {
        arr[i][0] = i+1
        arr[i][k] = values[k-1]
      } 
      i++
    }); // DataArray loop ends
  
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(shName, {views: [{showGridLines: false}]});

    ws.addTable({
      name: 'Table',
      ref: tloc,
      headerRow: true,
      totalsRow: false,
      style: {
        theme: 'TableStyleMedium9',
        showRowStripes: true,
      },

      columns: [
        {name: 'SN', filterButton: false},
        {name: keys[0], filterButton: false},
        {name: keys[1], filterButton: false},
        {name: keys[2], filterButton: false},
        {name: keys[3], filterButton: false},
        {name: keys[4], filterButton: false},
        {name: keys[5], filterButton: false},
        {name: keys[6], filterButton: false},
        {name: keys[7], filterButton: false},
        {name: keys[8], filterButton: false},
      ],
      
      rows: arr
    }); // ws add table ends

    ws.getColumn(1).width = 3 //1 = column A 

    ws.getColumn(2).width = 5 //2 = column B = # column
    ws.getColumn(2).alignment = { vertical: 'top', horizontal: 'center' };     

    ws.getColumn(3).width = 35 //3 = column C
    ws.getColumn(3).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };   
    
    ws.getColumn(4).width = 25 //4 = column D
    ws.getColumn(4).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  
   
    ws.getColumn(5).width = 25 //5 = column E
    ws.getColumn(5).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  
   
    ws.getColumn(6).width = 18 //6 = column F
    ws.getColumn(6).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(7).width = 15 //7 = column G
    ws.getColumn(7).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 

    ws.getColumn(8).width = 20 //8 = column H
    ws.getColumn(8).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 
    ws.getColumn(8).numFmt = '@' //Number foramat as text

    ws.getColumn(9).width = 87 //9 = column I
    ws.getColumn(9).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(10).width = 20 //10 = column J
    ws.getColumn(10).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 
    ws.getColumn(10).numFmt = '@' //Number foramat as text

    ws.getColumn(11).width = 87 //11 = column K
    ws.getColumn(11).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };


    //-----Save the workbook--------------

    wb.xlsx.writeBuffer().then((buffer) => 
      FileSaver.saveAs(new Blob([buffer]), xlReportName))
  
    cy.task('log', xlReportName + " is created successfully at cypress/downloads folder")
    
  } catch(e) {
    
    cy.task('log', "Excel report is NOT created! " + e)

  } //try catch ends


} //SaveDataArraytoExcel ends



//------------------------- 2--------------------------------------
function ReadExceltoJSONArray() {
  try {
    var fileName = xlFolder + "/" + xlReportName

    cy.readFile(fileName, 'binary').then((excelData) => {      
      var wb = new Excel.Workbook()
      
      return wb.xlsx.load(excelData).then((wb) => {
        var ws = wb.getWorksheet(shName)
       
        var header = []
        var rows = []
        var endRow = ws.rowCount

        ws.getRow(startRow).eachCell((cell) => {
          header.push(cell.value);
        })

        //cy.task('log', 'Header :\n'  + JSON.stringify(header))

        for (let i = startRow+1; i <= endRow; i++) {
          var r = {}

          ws.getRow(i).eachCell((cell, colNumber) => {
            r[header[colNumber-2]] = cell.value;
          })
          rows.push(r)
        }

        //cy.task('log', 'Rows :\n'  + JSON.stringify(rows));

        DataArray = rows
    
    }) //xlsx load ends
     
  }) // readfile ends
    
 } catch(e) {
    
    cy.task('log', "Excel report is NOT read! " + e)

 } //try catch ends

} //ReadExceltoJSONArray ends


//------------------------- 3--------------------------------------
function GetResultsJMeterMail(data, rowNumber) {

  var res = ""
  var pass = ""
  var fail = ""
  var oth = ""
  var dt  = ""

  cy.fixture('MyCredentials').then(function (c) {
    this.c = c   

    var myurl = data["URL0"]
    
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit(myurl, {failOnStatusCode: false})
      
    cy.get('body').then(($body) => {
        if ($body.find(this.c.tHeader).length) {

            cy.get(this.c.tHeader)
            .should('be.visible')
            .and('contain', this.c.tLoginText)

            cy.get(this.c.tUN).type(this.c.tUser)
            cy.get(this.c.tPW).type(this.c.tPwd)
            cy.get(this.c.tLogin).click()  
              
          } 
      }) // get body ends
      
      cy.wait(1000)
      cy.get(this.c.tBuildPageHeader).invoke('text').then((text) => {
        
        cy.wait(1000)
        var str = text.split('at')
        cy.get('span').contains(this.c.ArtifactsText).click()
        
        cy.get(this.c.zipId).invoke('text').then((fileName) => {
  
          cy.get(this.c.zipId).click()

          cy.get(this.c.ReportLink).click()
          cy.wait(1000)

          cy.get(this.c.statFileLink).click()

          //---------
          var filePath = downloadLoc + "\\" + jsonFile
          cy.readFile(filePath).then((jsonData) => {
            
            //cy.task('log', jsonData)

            var samples 
            var kocount 
            var resptime99pct 
            var tput
            var NWReceived
            var NWSent
            var res 

            samples = jsonData.Total.sampleCount
            kocount = jsonData.Total.errorCount
            resptime99pct = jsonData.Total.pct3ResTime
            tput = jsonData.Total.throughput
            NWReceived = jsonData.Total.receivedKBytesPerSec
            NWSent = jsonData.Total.sentKBytesPerSec
            res = 'Success'

            //cy.task('log', `The file name is: ${fileName}`)
            //cy.task('log', `The date is: ${str[1]}`)
            //cy.task('log', `Samples#: ${samples}`)
            //cy.task('log', `KO#: ${kocount}`)
            //cy.task('log', `Respons Time 99 pct ms: ${resptime99pct}`)
            //cy.task('log', `Throghput tps: ${tput}`)
            //cy.task('log', `Received kBps: ${NWReceived}`)
            //cy.task('log', `Sent kBps: ${NWSent}`)

            ResultArray.push({
              "SN": data["SN"],
              "Email Subject": data["Email Subject"],
              "Test type": data["Test type"],
              "Test notes": data["Test notes"],
              "CIS Version": data["CIS Version"],
              "TeamCity Build": data["TeamCity Build"],
              "URL0 Reference": data["URL0 Reference"],
              "URL0": data["URL0"],
              "URL1 Reference": data["URL1 Reference"],
              "URL1": data["URL1"],
              "Result": res,
              "Total": ' ',
              "Pass": ' ',
              "Fail": ' ',
              "Oth": ' ',
              "samples": samples,
              "kocount": kocount,
              "resptime99pct": resptime99pct,
              "tput": tput,
              "NWReceived": NWReceived,
              "NWSent": NWSent, 
              "Test Run Date": str[1].trim()
            })
            cy.task('log', "work done")

            //-----------------create folder and extract zip file starts--------------

            var myStr = 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script7 + ' -runDate "' + str[1].trim() + '" -zipFilePath "' + downloadLoc + '/' + fileName + '"'           
            //cy.task('log', myStr)
            cy.exec( myStr).then((result) => {            
              var lines =  result.stdout.split('\n')
              cy.ShowLines(lines, false)
            })
           //-----------------create folder and extract zip file ends------------------
           
          }) // readFile ends

          //-----------
  
  
        }) // zip Id ends

      }) // invoke header text ends

  }) // fixture ends
    
} //GetResultsJMeterMail ends
    

//------------------------- 4--------------------------------------
function GetResultsV5Mail(data, rowNumber) {

  var res = ""
  var pass = ""
  var fail = ""
  var oth = ""
  var dt  = ""

  cy.fixture('MyCredentials').then(function (c) {
      this.c = c    
      
      var myurl = data["URL1"]
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit(myurl, {failOnStatusCode: false})
      
      cy.get('body').then(($body) => {
         if ($body.find(this.c.tHeader).length) {

              cy.get(this.c.tHeader)
              .should('be.visible')
              .and('contain', this.c.tLoginText)

              //cy.task('log', "~~~ This is team city login page ~~~~~ ") 

              cy.get(this.c.tUN).type(this.c.tUser)
              cy.get(this.c.tPW).type(this.c.tPwd)
              cy.get(this.c.tLogin).click()  
              
          } 
      }) // get body ends
          
      //cy.task('log', "~~~ This is NOT team city login page ~~~~~ ") 
      cy.wait(1000)
      cy.waitUntil(() => {
        //showDIR(downloadLoc)
        return checkIndexFileExists
      }, { timeout: 60000, interval: 1000 })

      //showDIR(downloadLoc)
      
      //-----------------web scrap starts--------------
      cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script4 + ' -filePath ' + downloadLoc + ' -fileName ' + downloadFilename).then((result) => {            
        var lines =  result.stdout.split('\n')
        //cy.ShowLines(lines, true)

        if (lines.length === 12) {
          res = lines[lines.length-1]
          dt = lines[lines.length-2]
          oth = Number(lines[lines.length-4])
          fail = Number(lines[lines.length-6])
          pass = Number(lines[lines.length-8])

        }

        //cy.task('log', 'result = ' + res)
        //cy.task('log', 'Pass = ' + pass)
        //cy.task('log', 'Fail = ' + fail)
        //cy.task('log', 'Other = ' + oth)
        //cy.task('log', 'Execution date = ' + dt)

        ResultArray.push({
          "SN": data["SN"],
          "Email Subject": data["Email Subject"],
          "Test type": data["Test type"],
          "Test notes": data["Test notes"],
          "CIS Version": data["CIS Version"],
          "TeamCity Build": data["TeamCity Build"],
          "URL0 Reference": data["URL0 Reference"],
          "URL0": data["URL0"],
          "URL1 Reference": data["URL1 Reference"],
          "URL1": data["URL1"],
          "Result": res,
          "Total": (pass+fail+oth),
          "Pass": pass,
          "Fail": fail,
          "Oth": oth,
          "samples": ' ',
          "kocount": ' ',
          "resptime99pct": ' ',
          "tput": ' ',
          "NWReceived": ' ',
          "NWSent": ' ',
          "Test Run Date": dt
      })

      cy.task('log', "work done")
      })
      //-----------------web scrap ends--------------

  }) // fixture ends

} //GetResultsV5Mail ends

//------------------------- 5--------------------------------------
function GetResultsV4Mail(data, rowNumber) {

  cy.fixture('MyCredentials').then(function (c) {
      this.c = c    

      var res = ""
      var pass = ""
      var fail = ""
      var oth = ""
      var dt  = ""
      var total = ""
      
      var myurl = data["URL1"]
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit(myurl, {failOnStatusCode: false})

      cy.get('body').then(($body) => {
        if ($body.find(this.c.tHeader).length) {

             cy.get(this.c.tHeader)
             .should('be.visible')
             .and('contain', this.c.tLoginText)

             //cy.task('log', "~~~ This is team city login page ~~~~~ ") 

             cy.get(this.c.tUN).type(this.c.tUser)
             cy.get(this.c.tPW).type(this.c.tPwd)
             cy.get(this.c.tLogin).click()  
             
         } 
     }) // get body ends

     //cy.task('log', "~~~ This is NOT team city login page ~~~~~ ") 

     cy.waitUntil(() => {
       //showDIR(downloadLoc)
       return checkIndexFileExists
     }, { timeout: 60000, interval: 1000 })
     
     //showDIR(downloadLoc)

     //-----------------Reading V4 XL file starts--------------
     try {
        var v4xlReportName = data["URL1 Reference"]
        var V4fileName = downloadLoc + "\\" + v4xlReportName
        
        //cy.task('log', 'v4 file = ' + V4fileName)
        cy.readFile(V4fileName, 'binary').then((excelData) => {      
          var wb = new Excel.Workbook()
        
          return wb.xlsx.load(excelData).then((wb) => {
            var ws = wb.getWorksheet("Sheet1")

            //cy.task('log', "row count = " + ws.rowCount)
         
            total = getSum(ws,'B')
            pass = getSum(ws,'C')
            fail = total - pass
            res = 'Success'
            oth = 0

            //cy.task('log', 'result = ' + res)
            //cy.task('log', 'Pass = ' + pass)
            //cy.task('log', 'Fail = ' + fail)
            //cy.task('log', 'Other = ' + oth)
            //cy.task('log', 'Execution date = ' + dt)
            //cy.task('log', 'Total = ' + total)
            cy.task('log', "part 1 of work done")

        }) //xlsx load ends
       
      }) // readfile ends

      
     } catch(e) {
        res = 'Error'
        cy.task('log', "V4 Excel report is NOT read! " + e)
  
     } //try catch ends

     //-----------------Reading V4 XL file ends-----------------   
     
    var myurl0 = data["URL0"]
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit(myurl0, {failOnStatusCode: false})

    cy.get('body').then(($body) => {
      if ($body.find(this.c.tHeader).length) {

           cy.get(this.c.tHeader)
           .should('be.visible')
           .and('contain', this.c.tLoginText)

           //cy.task('log', "~~~ This is team city login page ~~~~~ ") 

           cy.get(this.c.tUN).type(this.c.tUser)
           cy.get(this.c.tPW).type(this.c.tPwd)
           cy.get(this.c.tLogin).click()  
           
       } 
    
      }) // get body ends

      //cy.task('log', "~~~ This is NOT team city login page ~~~~~ ") 
      //cy.get('.BuildPageHeader__title--q8').click()
      cy.wait(1000)
      cy.get(this.c.tBuildPageHeader).invoke('text').then((text) => {
        //cy.task('log', `Page header: ${text}`)
        cy.wait(1000)
        var str = text.split('at')

        //cy.task('log', `Date: ${str[1]}`)

        ResultArray.push({
          "SN": data["SN"],
          "Email Subject": data["Email Subject"],
          "Test type": data["Test type"],
          "Test notes": data["Test notes"],
          "CIS Version": data["CIS Version"],
          "TeamCity Build": data["TeamCity Build"],
          "URL0 Reference": data["URL0 Reference"],
          "URL0": data["URL0"],
          "URL1 Reference": data["URL1 Reference"],
          "URL1": data["URL1"],
          "Result": res,
          "Total": total,
          "Pass": pass,
          "Fail": fail,
          "Oth": oth,
          "samples": ' ',
          "kocount": ' ',
          "resptime99pct": ' ',
          "tput": ' ',
          "NWReceived": ' ',
          "NWSent": ' ',
          "Test Run Date": str[1].trim()
      })

        //cy.task('log', ResultArray)
      cy.task('log', "part 2 of work done")

      }) // invoke text ends

      //--------------------getting test run date ends--------------------------

      cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script5 + ' -baseFolder ' + CIS4ReportsFolder, {failOnNonZeroExit: false}).then((result) => {            
        var lines =  result.stdout.split('\n')
        //cy.task('log',lines)
        var Line0 = lines[0].replace(/\r/g, '')
        var Line1 = lines[1].replace(/\r/g, '')
        //cy.task('log',Line1)
        
        if (Line1 === 'Error') {
          cy.task('log',Line0)

        } else {

          cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script6 + ' -SrcFile ' + data["URL1 Reference"], {failOnNonZeroExit: false}).then((result) => {                          
              //cy.task('log',result)
              var lines =  result.stdout.split('\n')
              cy.task('log',lines[3])
          })

          //var srcPath  = downloadLoc + "\\" + data["URL1 Reference"]
          //var destPath = Line1  //+ "/" + data["URL1 Reference"]


        }
        
      })  
     

      //--------------------creating folder ends--------------------------------
  
    }) // fixture ends

    //cy.task('log', ResultArray)
} //GetResultsV4Mail ends

//------------------------- 6-------------------------------------
function getSum(sheet, colStr) {
  var mySum = 0
  var endRow = sheet.rowCount
  var startRow = 1
  
  for (let i=startRow+1; i <= endRow; i++) {
    mySum += sheet.getCell(colStr+i).value
  }

  return mySum
}

//------------------------- 6--------------------------------------
function GetResultsRESTMail(data, rowNumber) {

  var res = ""
  var pass = ""
  var fail = ""
  var oth = ""
  var dt  = ""

  cy.fixture('MyCredentials').then(function (c) {
      this.c = c    
      
      var myurl = data["URL0"]
      cy.clearCookies()
      cy.clearLocalStorage()
      cy.visit(myurl, {failOnStatusCode: false})
      
      cy.get('body').then(($body) => {
         if ($body.find(this.c.tHeader).length) {

              cy.get(this.c.tHeader)
              .should('be.visible')
              .and('contain', this.c.tLoginText)

              //cy.task('log', "~~~ This is team city login page ~~~~~ ") 

              cy.get(this.c.tUN).type(this.c.tUser)
              cy.get(this.c.tPW).type(this.c.tPwd)
              cy.get(this.c.tLogin).click()  
              
          } 
      }) // get body ends
          
      //cy.task('log', "~~~ This is NOT team city login page ~~~~~ ") 
      cy.wait(1000)
      cy.waitUntil(() => {
        //showDIR(downloadLoc)
        return checkIndexFileExists
      }, { timeout: 60000, interval: 1000 })

      //showDIR(downloadLoc)
      
      //-----------------web scrap starts--------------
      cy.exec( 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script4 + ' -filePath ' + downloadLoc + ' -fileName ' + downloadFilename2).then((result) => {            
        var lines =  result.stdout.split('\n')
        //cy.ShowLines(lines, true)

        if (lines.length === 12) {
          res = lines[lines.length-1]
          dt = lines[lines.length-2].replace(/\r/g, '')
          oth = Number(lines[lines.length-4].replace(/\r/g, ''))
          fail = Number(lines[lines.length-6].replace(/\r/g, ''))
          pass = Number(lines[lines.length-8].replace(/\r/g, ''))

        }

        //cy.task('log', 'result = ' + res)
        //cy.task('log', 'Pass = ' + pass)
        //cy.task('log', 'Fail = ' + fail)
        //cy.task('log', 'Other = ' + oth)
        //cy.task('log', 'Execution date = ' + dt)

        ResultArray.push({
          "SN": data["SN"],
          "Email Subject": data["Email Subject"],
          "Test type": data["Test type"],
          "Test notes": data["Test notes"],
          "CIS Version": data["CIS Version"],
          "TeamCity Build": data["TeamCity Build"],
          "URL0 Reference": data["URL0 Reference"],
          "URL0": data["URL0"],
          "URL1 Reference": data["URL1 Reference"],
          "URL1": data["URL1"],
          "Result": res,
          "Total": (pass+fail+oth),
          "Pass": pass,
          "Fail": fail,
          "Oth": oth,
          "samples": ' ',
          "kocount": ' ',
          "resptime99pct": ' ',
          "tput": ' ',
          "NWReceived": ' ',
          "NWSent": ' ', 
          "Test Run Date": dt
        })

        cy.task('log', "work done")
      })
      //-----------------web scrap ends--------------

  }) // fixture ends

} //GetResultsRESTMail ends

//------------------------- 7--------------------------------------
function convertNumberToLetters(num) {
  let letters = "";
  num++;
  while (num > 0) {
      let mod = (num - 1) % 26;
      letters = String.fromCharCode(65 + mod) + letters;
      num = Math.floor((num - mod) / 26);
  }
  return letters;
}

//------------------------- 8--------------------------------------
function checkIndexFileExists() {
    cy.exec(`powershell -Command Test-Path  ${downloadLoc}\\${downloadFilename}`, {failOnNonZeroExit: false}).then((result) => {

        if (result.stdout.trim() === 'True') {
          return true
        } else {
          return false
        }
    })
  }

//------------------------- 9--------------------------------------
function showDIR(loc) {
  cy.exec(`powershell -Command dir  ${loc}`, {failOnNonZeroExit: false}).then((result) => {
    var lines =  result.stdout.split('\n')
    cy.ShowLines(lines, false)
  })
}




//------------------------- 10--------------------------------------
function SaveResultArraytoExcel() {
  try {
        
    let keys = []
    let values = []
    let arr = []
    var tloc = startCol + startRow

    let i = 0
    ResultArray.forEach(item => {
      keys = Object.keys(item);
      values = Object.values(item);
      
      arr[i] = [];
      for (let k=0; k < values.length; k++) {
        //arr[i][0] = i+1
        arr[i][k] = values[k]
      } 
      i++
    }); // ResultArray loop ends

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(shName, {views: [{showGridLines: false}]});

    ws.addTable({
      name: 'Table2',
      ref: tloc,
      headerRow: true,
      totalsRow: false,
      style: {
        theme: 'TableStyleMedium9',
        showRowStripes: true,
      },

      columns: [
        {name: keys[0], filterButton: false},
        {name: keys[1], filterButton: false},
        {name: keys[2], filterButton: false},
        {name: keys[3], filterButton: false},
        {name: keys[4], filterButton: false},
        {name: keys[5], filterButton: false},
        {name: keys[6], filterButton: false},
        {name: keys[7], filterButton: false},
        {name: keys[8], filterButton: false},
        {name: keys[9], filterButton: false},
        {name: keys[10], filterButton: false},
        {name: keys[11], filterButton: false},
        {name: keys[12], filterButton: false},
        {name: keys[13], filterButton: false},
        {name: keys[14], filterButton: false},
        {name: keys[15], filterButton: false},
        {name: keys[16], filterButton: false},
        {name: keys[17], filterButton: false},
        {name: keys[18], filterButton: false},
        {name: keys[19], filterButton: false},
        {name: keys[20], filterButton: false},
        {name: keys[21], filterButton: false},
      ],
      
      rows: arr
    }); // ws add table ends


    ws.getColumn(1).width = 3 //1 = column A 

    ws.getColumn(2).width = 5 //2 = column B = # column
    ws.getColumn(2).alignment = { vertical: 'top', horizontal: 'center' };     

    ws.getColumn(3).width = 35 //3 = column C
    ws.getColumn(3).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };   
    
    ws.getColumn(4).width = 25 //4 = column D
    ws.getColumn(4).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  
   
    ws.getColumn(5).width = 25 //5 = column E
    ws.getColumn(5).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  
   
    ws.getColumn(6).width = 18 //6 = column F
    ws.getColumn(6).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(7).width = 15 //7 = column G
    ws.getColumn(7).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 

    ws.getColumn(8).width = 20 //8 = column H
    ws.getColumn(8).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 
    ws.getColumn(8).numFmt = '@' //Number foramat as text

    ws.getColumn(9).width = 30 //9 = column I
    ws.getColumn(9).alignment = { vertical: 'top', horizontal: 'left', wrapText: false };  

    ws.getColumn(10).width = 20 //10 = column J
    ws.getColumn(10).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 
    ws.getColumn(10).numFmt = '@' //Number foramat as text

    ws.getColumn(11).width = 30 //11 = column K
    ws.getColumn(11).alignment = { vertical: 'top', horizontal: 'left', wrapText: false };

    ws.getColumn(12).width = 18 //12 = column L
    ws.getColumn(12).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(13).width = 18 //13 = column M
    ws.getColumn(13).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(14).width = 18 //14 = column N
    ws.getColumn(14).alignment = { vertical: 'top', horizontal: 'left', wrapText: true }; 

    ws.getColumn(15).width = 18 //15 = column O
    ws.getColumn(15).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(16).width = 25 //16 = column P
    ws.getColumn(16).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  

    ws.getColumn(16).width = 25 //16 = column P
    ws.getColumn(16).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(17).width = 25 //17 = column Q
    ws.getColumn(17).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(18).width = 25 //18 = column R
    ws.getColumn(18).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(19).width = 25 //19 = column S
    ws.getColumn(19).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(20).width = 25 //20 = column T
    ws.getColumn(20).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(21).width = 25 //21 = column U
    ws.getColumn(21).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(22).width = 25 //22 = column V
    ws.getColumn(22).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };

    ws.getColumn(23).width = 35 //23 = column W
    ws.getColumn(23).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };  
    ws.getColumn(23).numFmt = 'dddd, mmmm d, yyyy  h:mm AM/PM' //Number foramat as date


    //-----Save the workbook--------------

    wb.xlsx.writeBuffer().then((buffer) => 
      FileSaver.saveAs(new Blob([buffer]), xlReportName))
  
    cy.task('log', xlReportName + " is re-created successfully at cypress/downloads folder")
    
  } catch(e) {
    
    cy.task('log', "Excel result file is NOT created! " + e)

  } //try catch ends


} //SaveDataArraytoExcel ends

//------------------------- 11--------------------------------------
function ReadAndUpdateExcel() {

  cy.fixture('MyCredentials').then(function (c) {
    this.c = c
    cy.ReadmyExcel().then(() => {
      //cy.task('log', DataArray)

      var fileName = xlFolder + "/" + xlMainReportName

      var myStr = 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script8 + ' -SourceFilePath  "' + xlFolder + '" -SourceFileName "' + xlMainReportName + '"'           
      //cy.task('log', myStr)
      
      cy.exec( myStr).then((result) => {            
        var lines =  result.stdout.split('\n')
        //cy.ShowLines(lines, false)

        if (lines[0].trim() === 'Success') {
          //cy.task('log', "Proces next step ...")

          //--------Read excel-------------------
          cy.readFile(fileName, 'binary').then((excelData) => {
            var wb = new Excel.Workbook()
            return wb.xlsx.load(excelData).then((wb) => {
              //---------
              cy.ReadAssignmentSheet(wb, shAsg, startRow).then(() => {
                //cy.task('log', AssignmentArray)
                //cy.task('log', DataArray)

                DataArray.forEach(item => {
                  
                  var testType = item["Test type"]
                  
                  if (testType === CISPerfTests) { updateMySheet(wb, shPerf, true, item) }
                  else if (testType === CISRESTTests) { updateMySheet(wb, shRest, false, item) }
                  else if (testType === CISV4UITests) { updateMySheet(wb, shV4, false, item) }
                  else if (testType === CISV5UITests) { updateMySheet(wb, shV5, false, item) }

                }) //DataArray iteration ends

                wb.xlsx.writeBuffer().then((buffer) => 
                  FileSaver.saveAs(new Blob([buffer]), xlMainReportName))

             }) //readassignments ends

              //---------
            }) //xlsx load ends
          }) //readfile ends  
          //-------------------------------------

        } // if copy success ends


      }) //rptCp.ps1 ends
    }) // ReadmyExcel ends

    //-------Copy the final sheet ---------------
    var myStr1 = 'powershell.exe -File ' + this.c.PSFolder + '/' + this.c.Script9 + ' -SrcFile  "' + xlMainReportName + '"'           
    //cy.task('log', myStr1)

    cy.exec( myStr1).then((result) => {            
      var lines =  result.stdout.split('\n')
      cy.ShowLines(lines, false)
    })
    //------------------------------------

  }) // fixture ends
} //ReadAndUpdateExcel ends 


//------------------------- 12--------------------------------------
function updateMySheet(wb, shName, colFlag, item) {

  var ws = wb.getWorksheet(shName)
  var endRow = ws.rowCount

  var trDate = item["Test Run Date"]
  var tcBuild = item["TeamCity Build"]
  var cisVersion = item["CIS Version"]

  var pass = item.Pass
  var fail = item.Fail
  var oth = item.Oth
  var total = item.Total
  
  var samples = item.samples
  var kocount = item.kocount
  var resptime99pct = item.resptime99pct
  var tput = item.tput
  var NWReceived = item.NWReceived
  var NWSent = item.NWSent

  var testType = item["Test type"]
  var testNotes = item["Test notes"]

  var devName = getName( testType, cisVersion)
  
  var versionCol = "F"
  var testNotesCol = "Q"

  var n 
  var i

  if (testType === CISPerfTests) {
    n = findSuitableRow(ws, versionCol, cisVersion, testNotesCol, testNotes) 
  } else {
    n = findSuitableRow(ws, versionCol, cisVersion, '', '') 
  }

  if (n === -1) {
    i = endRow + 3
  } else {
    i = n
  }

  var dataRow = []
    
  if (!colFlag) {
    dataRow[2]  = ' '                                    //B
    dataRow[3]  = convertTo12HourFormat(trDate).trim()   //C
    dataRow[4]  = tcBuild                                //D
    dataRow[5]  = devName                                //E
    dataRow[6]  = cisVersion                             //F
    dataRow[7]  = pass                                   //G
    dataRow[8]  = fail                                   //H
    dataRow[9]  = oth                                    //I
    dataRow[10] = total                                  //J
    dataRow[11] = (pass/total)                           //K
    dataRow[12] = ' '                                    //L
    dataRow[13] = testType                               //M
    dataRow[14] = testNotes                              //N
    
    if (testType === CISRESTTests) {
      dataRow[15] = (fail + oth)                         //O
    }

    cy.task('log', "The sheet '" + shName + "' is updated : Row# " + i)


  } else {
    dataRow[2]  = ' '                                    //B
    dataRow[3]  = convertTo12HourFormat(trDate).trim()   //C
    dataRow[4]  = tcBuild                                //D
    dataRow[5]  = devName                                //E
    dataRow[6]  = cisVersion                             //F
    dataRow[7]  = samples                                //G
    dataRow[8]  = kocount                                //H
    dataRow[9]  = (kocount/samples)                      //I
    dataRow[10] = ((samples - kocount)/samples)          //J
    dataRow[11] = resptime99pct                          //K
    dataRow[12] = tput                                   //L
    dataRow[13] = NWReceived                             //M
    dataRow[14] = NWSent                                 //N
    dataRow[15] = ' '                                    //O
    dataRow[16] = testType                               //P
    dataRow[17] = testNotes                              //Q

    cy.task('log', "The sheet '" + shName + "' is updated : Row# " + i)
  }

  ws.insertRow(i, dataRow)
  copyRowFormat(ws,4,i)
}


//------------------------- 13--------------------------------------
function ReadSheettoAssgnmentArray(wb, shName, startRow) {
  try {
    var ws = wb.getWorksheet(shName)
    var endRow = ws.rowCount

    for (let i = startRow; i <= endRow; i++) {

      var testType = ws.getCell('B' + i).value 
      var cisVersion = ws.getCell('C' + i).value 
      var devName = ws.getCell('D' + i).value 

      var key = `${testType}.${cisVersion}`;
      var value = devName

      AssignmentArray.push({ [key]: value })
    } // for ends
          
     
 } catch(e) {
    
    cy.task('log', "Excel assignment sheet is NOT read! " + e)

 } //try catch ends

} //ReadSheettoAssgnmentArray ends

//------------------------- 14--------------------------------------
function getName( testType, cisVersion) {
  const key = `${testType}.${cisVersion}`;
  const found = AssignmentArray.find(obj => obj.hasOwnProperty(key));
  return found ? found[key] : null;
}

//------------------------- 15--------------------------------------
function convertTo12HourFormat(dateTime) {
  
  const regex = /^\d{2} \w{3} \d{2}:\d{2}$/
  
  if (!regex.test(dateTime)) {
    return dateTime
  }

  let [day, month, time] = dateTime.split(' ')
  let [hours, minutes] = time.split(':')
  hours = parseInt(hours);
  let period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12
  let newTime = `${hours}:${minutes} ${period}`;
  
  return `${day} ${month} ${newTime}`;
}


//------------------------- 16--------------------------------------
function copyRowFormat(ws, sourceRowNumber, targetRowNumber) {
    const sourceRow = ws.getRow(sourceRowNumber);
    const targetRow = ws.getRow(targetRowNumber)

    targetRow.eachCell((cell, colNumber) => {
      const sourceCell = sourceRow.getCell(colNumber)
      cell.style = { ...sourceCell.style };
      cell.numFmt = sourceCell.numFmt;
    })

    targetRow.commit();
    cy.task('log', "The row# '" + targetRowNumber + "' is formatted. ")

}  


//------------------------- 17--------------------------------------
function findSuitableRow(ws, versionCol, cisVersion, testNotesCol, testNotes) {
 
    const rows = [];

    ws.eachRow((row, rowNumber) => {

      if (testNotes.trim() === '') {
        if (row.getCell(versionCol).value === cisVersion) {
          rows.push(rowNumber)
        }
      } else {
        if ((row.getCell(versionCol).value === cisVersion) && ((row.getCell(testNotesCol).value === testNotes))) {
          rows.push(rowNumber)
        }
      }
    })

    if (rows.length === 0) {
      return -1
    }

    return Math.min(...rows);
}



//------------------------------------------------------------------------------------------------


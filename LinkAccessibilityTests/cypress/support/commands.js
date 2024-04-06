//const { fs } = require('fs')

import * as fs from 'fs';
import mustache from 'mustache';
import { prepareReportData } from '../util/prepareReportData';
import { prepareAxeRules } from '../util/prepareAxeRules';

var fName = "genericName"
var sLog = false
var sReport = false
var myPage
var myApp
var baseLocation
var txtLocation
var htmlLocation
var sfName  

//------------------------- 1--------------------------------------
function printAccessibilityViolations(violations) {

    var vio = violations.map(({id, impact, description, help, helpUrl, nodes}) =>({

        IssueType: `${id}`,
        Impact: `${impact}`,
        Description: `${description} (${id})`,
        Count: nodes.length,
        Help: help,
        HelpUrl: helpUrl,

        Nodes: nodes.map(({impact, html, failureSummary, target}) =>({
            Impact: `${impact}`,
            Html: `${html.replace(/\s{2,}/g, "").replace(/></g,">\n<")}`,
            FailureSummary: `${failureSummary}`,
            Targets: target
        })),

    }))

    var summaryFile = baseLocation + "/" + txtLocation + "/" + sfName
    var logFile = baseLocation + "/" + txtLocation + "/" + fName + ".txt"

    cy.task('table', vio).then(val => {
        if(!sLog) 
         cy.writeFile(logFile,  myApp + "\n" + myPage + " Page\n" + val)
    })
    
    var n = 0
    var hStr = " | App Version | Page | # | Axe Rule Id | Impact | Count | Description | Help | HelpURL \n" 
    var bStr = ""
    var lStr = ""
    for (let key of Array.from(vio.keys())) {
        var str = " | " + myApp +
                  " | " + myPage + " Page " +
                  " | " + (parseInt(key, 10)+1) + 
                  " | " + vio[key].IssueType + 
                  " | " + vio[key].Impact + 
                  " | " + vio[key].Count + 
                  " | " + vio[key].Description +
                  " | " + vio[key].Help +
                  " | " + vio[key].HelpUrl +
                  "\n"
        bStr += str
        n += (parseInt(vio[key].Count, 10)) 
    }
    lStr = myPage + " Page has " + n + " violations"

    var myStr = hStr + bStr + lStr + "\n\n"

    //cy.task('log', myStr)
  
    cy.task('checkFileExists', summaryFile).then((exists) => {
        if (exists) {
            cy.writeFile( summaryFile, myStr, {flag:'a+'} )  
            //cy.task('log', "File exists")
        } else {
            cy.writeFile( summaryFile, myStr )
            //cy.task('log', "File does NOT exist")  
        }
    })


    if(!sReport)
        createHtmlReport({results:{violations:violations}})
}

//------------------------- 2--------------------------------------
Cypress.Commands.add('checkAccessbility', 
{
    prevSubject: 'optional'
},
(subject, bLocation, hLocation, tLocation, theApp, page, summaryFileName, skipLog = false, skipReport = false, {skipFailures = false} = {}) =>{

        myApp = theApp
        myPage = page 
        fName = page
        sReport = skipReport
        sLog = skipLog
        baseLocation = bLocation
        htmlLocation = hLocation
        txtLocation = tLocation
        sfName = summaryFileName
  
        cy.injectAxe() 
        cy.checkA11y(subject, {
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
            }
        }, printAccessibilityViolations, skipFailures);
        
    }
)

//------------------------- 3--------------------------------------
function createHtmlReport({ results }) {
    if (!results.violations) {
        throw new Error(
            "'violations' is required for HTML accessibility report. Example: createHtmlReport({ results : { violations: Result[] } })"
        );
    }
    try {
        var template = ""
        var htmlContent = ""
        cy.readFile("./template/pageTemplate.html").then((str) =>{
            template = str
            var preparedReportData = prepareReportData({
                violations: results.violations,
                passes: results.passes,
                incomplete: results.incomplete,
                inapplicable: results.inapplicable,
            });
            htmlContent = mustache.render(template, {
                theApp:myApp,
                page:myPage,
                url: results.url,
                violationsSummary: preparedReportData.violationsSummary, 
                violations: preparedReportData.violationsSummaryTable,
                violationDetails: preparedReportData.violationsDetails,
                checksPassed: preparedReportData.checksPassed,
                checksIncomplete: preparedReportData.checksIncomplete,
                checksInapplicable: preparedReportData.checksInapplicable,
                hasPassed: Boolean(results.passes),
                hasIncomplete: Boolean(results.incomplete),
                hasInapplicable: Boolean(results.inapplicable),
                incompleteTotal: preparedReportData.checksIncomplete
                    ? preparedReportData.checksIncomplete.length
                    : 0,
                hasAxeRawResults: Boolean(results?.timestamp),
                rules: prepareAxeRules(results?.toolOptions?.rules || {}),
            });
            cy.writeFile(baseLocation + "/" + htmlLocation + "/" + fName + ".html", htmlContent)
        })

        return htmlContent;
    } catch (e) {
        console.warn(`HTML report was not created due to the error ${e.message}`);

        return `Failed to create HTML report due to an error ${e.message}`;
    }
}

//------------------------- 4--------------------------------------
Cypress.Commands.add('Link_login', () => {

    cy.fixture('MyLinkCredentials').then(function (c) {
        this.c = c
        cy.visit(this.c.URL)
        cy.get(`[id=${this.repo.LandingPage.NameInput}]`).type(this.c.UserName)
        cy.get(`[id=${this.repo.LandingPage.PwdInput}]`).type(this.c.PassCode)
        cy.get("button").contains(this.repo.LandingPage.LoginButton).click()
    })
    
})

 

const { fs } = require('fs')
import mustache from 'mustache';
import { prepareReportData } from '../util/prepareReportData';
import { prepareAxeRules } from '../util/prepareAxeRules';

var cheatName = "genericName"
var sLog = true
var sReport = false
//const { createHtmlReport } = require('axe-html-reporter');

//------------------------1------------------------------------------------
/*
function printAccessibilityViolations(violations: any[]) { 
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description: `${description}`,     //description: `${description} (${id})`,
      count: nodes.length,               //nodes: nodes,
    })),
  );

  createHtmlReport({results:{violations:violations}})
  
}
*/

function printAccessibilityViolations(violations) {
  cy.task('log', "In printAccessibilityViolations ")
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
  
  //cy.task('table', vio).then(myval => {if(!sLog) cy.writeFile( cheatName + ".txt", myval)})

  cy.task('table', vio).then((myval: any) => {
    if (!sLog) cy.writeFile(`${cheatName}.txt`, myval);
  });

  if(!sReport)
      createHtmlReport({results:{violations:violations}})
}

//------------------------2------------------------------------------------

Cypress.Commands.add('checkAccessibility', 
{ 
  prevSubject: false //'optional'
}, 
//(subject:any, name, { skipFailures = false } = {}) => {
(subject, cheatName:string = "abc", skipLog:boolean = false, skipReport:boolean = false, { skipFailures = false } = {}) => {

  cy.task('log', "In checkAccessibility ")
  //cheatName = name
  //sReport = skipReport
  //sLog = skipLog

  cy.task('log', "cheatname = " + cheatName + " skipReport =  " + skipReport + " skipLog = " + skipLog)

  //cy.injectAxe()
  
  cy.checkA11y(subject, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']              //values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
    }
  }, printAccessibilityViolations, skipFailures);                                                   //}, printAccessibilityViolations, true);   

});


//---------------AXe HTML-----------------------------------
function createHtmlReport({ results }) {
  cy.task('log', "In createHtmlReport ")
  if (!results.violations) {
      throw new Error(
          "'violations' is required for HTML accessibility report. Example: createHtmlReport({ results : { violations: Result[] } })"
      );
  }
  try {
      var template = ""
      var htmlContent = ""
      //cy.readFile("./template/pageTemplate.html").then((str) =>{
      cy.readFile("cypress/util/template/pageTemplate.html").then((str) =>{
          template = str
          var preparedReportData = prepareReportData({
              violations: results.violations,
              passes: results.passes,
              incomplete: results.incomplete,
              inapplicable: results.inapplicable,
          });
          htmlContent = mustache.render(template, {
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
          cy.writeFile("cypress/results/accessibilityReport.html", htmlContent)
      })

      return htmlContent;
  } catch (e) {
      console.warn(`HTML report was not created due to the error ${e.message}`);

      return `Failed to create HTML report due to an error ${e.message}`;
  }

}
//--------------------------------------------------------






//--- This for tutorial examples--------------------start-------------
Cypress.Commands.add('getText', {prevSubject: 'element'}, ($element) => {
  cy.wrap($element).scrollIntoView()
  return cy.wrap($element).invoke('text')
})

Cypress.Commands.add('login', (email, password) => {
  cy.get('#email').type(email)
  cy.get('#login-password').type(password)
  cy.get('#login').click()
  cy.get('#dropdownMenu1').should('exist')
})

Cypress.Commands.add('searchCourse', (category, courseString) => {
  cy.get('select[name="categories"]').select(category)
  cy.get('input[placeholder="Search Course"]').type(courseString)
  cy.get('button[class="find-course search-course"]').click()
})
//--- This for tutorial examples--------------------end-------------

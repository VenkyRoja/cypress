const { fs } = require('fs')
import mustache from 'mustache';
import { prepareReportData } from '../util/prepareReportData';
import { prepareAxeRules } from '../util/prepareAxeRules';
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
var cheatName = "genericName"
var sLog = false
var sReport = false
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
    cy.task('table', vio).then(val => {if(!sLog) cy.writeFile( cheatName + ".txt", val)})
    if(!sReport)
        createHtmlReport({results:{violations:violations}})
}

Cypress.Commands.add('checkAccessbility', 
{
    prevSubject: 'optional'
},
(subject, name, skipLog = false, skipReport = false, {skipFailures = false} = {}) =>{
        cheatName = name
        sReport = skipReport
        sLog = skipLog
        cy.checkA11y(subject, {
            runOnly: {
                type: 'tag',
                values:['wcag2a','wcag2aa','wcag21a','wcag21aa']
            }
        }, printAccessibilityViolations, skipFailures);
        
    }
)

//Matthew Cheating
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
            cy.writeFile(cheatName + ".html", htmlContent)
        })

        return htmlContent;
    } catch (e) {
        console.warn(`HTML report was not created due to the error ${e.message}`);

        return `Failed to create HTML report due to an error ${e.message}`;
    }
}
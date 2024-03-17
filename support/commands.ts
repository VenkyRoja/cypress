
//import { writeFileSync, readFileSync } from 'fs';
//import { createHtmlReport } from 'axe-html-reporter';

declare namespace Cypress {
  interface Chainable<Subject> {
    checkAccessibility(options?: { skipFailures?: boolean },): Chainable<Subject>;
  }
}



//------------------------1------------------------------------------------
function printAccessibilityViolations(violations: any[]) { 
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      //description: `${description} (${id})`,
      description: `${description}`,
      count: nodes.length,
      //nodes: nodes,
    })),
  );
  
  //---------
  const fileName = 'cypress/results/cypress-a11y-report.json';
  cy.writeFile(fileName, JSON.stringify(violations));

  //const rawAxeResults = JSON.parse(readFileSync(fileName, 'utf8')) 
  const rawAxeResults = JSON.parse(JSON.stringify(violations)) 

  /*
  createHtmlReport({
    results: rawAxeResults,
    options: {
        projectKey: 'DEQUE',
        customSummary: 'aaa',
        outputDir: 'cypress/results',
        reportFileName: 'index.html',
    },
  });
  */
  //cy.task('generateAxeReport', { fileName }).then(() => {
  //  cy.readFile('a11yReport.html').then((html) => {
  //    cy.task('log', html);
  //  });
  //});
  //-----------
}


//------------------------2------------------------------------------------
Cypress.Commands.add('checkAccessibility', { 
  prevSubject: 'optional',
}, (subject: any, { skipFailures = false } = {}) => {

  cy.injectAxe()

  cy.checkA11y(subject, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']
      //values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
    }
  //}, printAccessibilityViolations, true);
  }, printAccessibilityViolations, skipFailures);

//----------z

//----------z

});






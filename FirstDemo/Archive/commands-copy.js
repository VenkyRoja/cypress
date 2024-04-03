
///=========================================================================
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }



/*
declare namespace Cypress {
  
    interface Chainable {
      //getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
      //getByID(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
      //getButton(): Chainable<JQuery<HTMLElement>>
      //getH1(): Chainable<JQuery<HTMLElement>>
      //getSpan(): Chainable<JQuery<HTMLElement>>
      checkAccessibility()
    }
  }
  
  Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-test=${selector}]`)
  })

  Cypress.Commands.add("getByID", (selector) => {
    return cy.get(`[id=${selector}]`)
  })

  Cypress.Commands.add("getButton", () => {
    return cy.get("button")
  })

  Cypress.Commands.add("getH1", () => {
    return cy.get("h1")
  })

  Cypress.Commands.add("getSpan", () => {
    return cy.get("span")
  })
  */

//---------------- Print cypress-axe violations to the terminal------------
// Print cypress-axe violations to the terminal
function printAccessibilityViolations(violations) {
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description: `${description} (${id})`,
      count: nodes.length,
      nodes: nodes,
    })),
  );
}
 
Cypress.Commands.add('checkAccessibility',
  {
    prevSubject: 'optional',
  },
  (subject, { skipFailures = false } = {}) => {
    cy.checkA11y(subject,  {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
      }
  }, printAccessibilityViolations, skipFailures);
}
 
);

  

/* 
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
  //createHtmlReport({ results: { violations: 'Result[]' } });
}
*/

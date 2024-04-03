declare namespace Cypress {

 
    interface Chainable {
        //checkAccessibility(subject?: any, options?: { skipFailures?: boolean }): Chainable<void>
        checkAccessibility(subject?:any, 
                           name?:string, 
                           skipLog?: boolean, 
                           skipReport?: boolean, 
                           options?: { skipFailures?: boolean }
                           ): Chainable<void>

    }
    
  }


//--- This for tutorial examples--------------------start-------------
declare namespace Cypress {
  interface Chainable<Subject> {
    getText(options?: { elementTex?: string },): Chainable<Subject>;
    login(email: string, password: string): Chainable<Subject>;
    searchCourse(category: string, courseString: string): Chainable<Subject>;
  }
}
//--- This for tutorial examples--------------------end-------------


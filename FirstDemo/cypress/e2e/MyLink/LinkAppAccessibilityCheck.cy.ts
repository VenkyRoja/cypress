
describe('Link Application Accessbility Check', () =>  {

  beforeEach(function () {
    cy.fixture('MyLinkCredentials').then(function (c) {
      this.c = c
    })

    cy.fixture('MyLinkRepo').then(function (repo) {
      this.repo = repo
    })

  })

  //cy.get('#g-recaptcha-container > [style="width: 304px; height: 78px;"] > div > iframe')

 //-------------------Tests section------------------------------------------
  it('00 Application information ', function () {
    cy.task('log', "Application under test = " + this.c.MyApp)
  })
   
  it('01 Visit Account Overview Page: Test accessbility ', function () {

    cy.visit(this.c.URL)
    cy.get(`[id=${this.repo.LandingPage.NameInput}]`).type(this.c.UserName)
    cy.get(`[id=${this.repo.LandingPage.PwdInput}]`).type(this.c.PassCode)
    cy.get("button").contains(this.repo.LandingPage.LoginButton).click()

    //cy.wait(10000)

    cy.injectAxe() 
    cy.checkAccessibility("myReport")
                
  })
  
  it("02 Visit Billing Page: Test accessbility ", function()  {

    cy.visit(this.c.URL)
    cy.get(`[id=${this.repo.LandingPage.NameInput}]`).type(this.c.UserName)
    cy.get(`[id=${this.repo.LandingPage.PwdInput}]`).type(this.c.PassCode)
    cy.get("button").contains(this.repo.LandingPage.LoginButton).click()
   
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemBilling).click()
   
    //cy.wait(10000)

    cy.injectAxe() 

    cy.checkAccessibility("myReport")

  })
})

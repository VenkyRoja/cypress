
describe('Link Application Accessbility Check', () =>  {

  beforeEach(function () {
    cy.fixture('MyLinkCredentials').then(function (c) {
      this.c = c
    })

    cy.fixture('MyLinkRepo').then(function (repo) {
      this.repo = repo
    })

  })

  
  //-------------------Tests section------------------------------------------ 
  //-------------------Account View Page--------------------------------------- 
  it('01 Visit Account Overview Page: Test accessbility ', function () {

    cy.visit(this.c.URL)
    cy.get(`[id=${this.repo.LandingPage.NameInput}]`).type(this.c.UserName)
    cy.get(`[id=${this.repo.LandingPage.PwdInput}]`).type(this.c.PassCode)
    cy.get("button").contains(this.repo.LandingPage.LoginButton).click()

    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P1)
                
  })
  
  //------------------Billing Page---------------------------------------
  it("02 Visit Billing Page: Test accessbility ", function()  {

    cy.visit(this.c.URL)
    cy.get(`[id=${this.repo.LandingPage.NameInput}]`).type(this.c.UserName)
    cy.get(`[id=${this.repo.LandingPage.PwdInput}]`).type(this.c.PassCode)
    cy.get("button").contains(this.repo.LandingPage.LoginButton).click()
   
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemBilling).click()
   
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P2)


  })
})

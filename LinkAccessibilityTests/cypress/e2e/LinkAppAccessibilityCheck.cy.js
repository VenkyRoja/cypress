
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
    cy.Link_login()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P1)
  })
  
  //------------------Billing Page---------------------------------------
  it("02 Visit Billing Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemBilling).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P2)
  })

  //------------------Alert Subscription Page---------------------------------------
  it("03 Alert Subscription Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemAlertSub).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P3)
  })

   //------------------Auto Pay Page---------------------------------------
   it("04 Auto Pay Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemAutoPay).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P4)
  }) 

  //---------------------------------------------------------------------
})

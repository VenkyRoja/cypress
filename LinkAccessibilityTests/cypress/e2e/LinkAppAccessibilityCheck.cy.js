
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
  it('01 Account Overview Page: Test accessbility ', function () {
    cy.Link_login()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P1, this.c.Reports.summaryFile)
  })
  
  //------------------Billing Page---------------------------------------
  it("02 Billing Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemBilling).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P2, this.c.Reports.summaryFile)
  })

  //------------------Alert Subscription Page---------------------------------------
  it("03 Alert Subscription Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemAlertSub).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P3, this.c.Reports.summaryFile)
  })

   //------------------Auto Pay Page---------------------------------------
   it("04 Auto Pay Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemAutoPay).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P4, this.c.Reports.summaryFile)
  }) 

  
   //------------------Manage Account Page---------------------------------------
   it("05 Manage Account Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemManageAccount).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P5, this.c.Reports.summaryFile)
  })   

  it.only("06 Start new service Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemSSTS).click()
    cy.get(this.repo.ServicesPage.NewServiceRbuttonID).click()
    cy.get(this.repo.ServicesPage.ContinueButtonID).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P6, this.c.Reports.summaryFile)
  })


  //---------------------------------------------------------------------
})

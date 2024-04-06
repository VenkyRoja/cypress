
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

  it("06 Start new service Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemSSTS).click()
    cy.get(this.repo.ServicesPage.NewServiceRbuttonID).click()
    cy.get(this.repo.ServicesPage.ContinueButtonID).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P6, this.c.Reports.summaryFile)
  })

  it("07 Transfer my service Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemSSTS).click()
    cy.get(this.repo.ServicesPage.TransferServiceRbuttonID).click()
    cy.get(this.repo.ServicesPage.ContinueButtonID).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P7, this.c.Reports.summaryFile)
  })

  it("08 Stop my service Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get("span").contains(this.repo.AccountViewPage.MenuItemSSTS).click()
    cy.get(this.repo.ServicesPage.StopServiceRbuttonID).click()
    cy.get(this.repo.ServicesPage.ContinueButtonID).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P8, this.c.Reports.summaryFile)
  }) 

  it("09 My Profile Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMyProfile).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P9, this.c.Reports.summaryFile)
  }) 

  it("10 My Profile - Billing Address Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMyProfile).click()
    cy.get(this.repo.MyProfilePage.BillingAddressID).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P10, this.c.Reports.summaryFile)
  }) 

  it("11 New User Registration Page: Test accessbility ", function()  {
    cy.visit(this.c.URL)
    cy.get(this.repo.LandingPage.RegisterNowButton).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P11, this.c.Reports.summaryFile)
  }) 

  it("12 Pay Bills Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMyPayBills).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P12, this.c.Reports.summaryFile)
  })   


  it("13 Payment Arrangements Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMyPaymentArrangements).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P13, this.c.Reports.summaryFile)
  })  

  it("14 Request Service Appointment Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMyReqServiceAppt).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P14, this.c.Reports.summaryFile)
  }) 

  it("15 Service Orders Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMySO).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P15, this.c.Reports.summaryFile)
  })


  it("16 Submit Meter Reading Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemMyMeterReading).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P16, this.c.Reports.summaryFile)
  })

  it("17 Transactions Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemTransactions).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P17, this.c.Reports.summaryFile)
  })


  it("18 Usage Page: Test accessbility ", function()  {
    cy.Link_login()
    cy.get(this.repo.AccountViewPage.MenuItemUsage).click()
    cy.checkAccessbility(this.c.Reports.myBase, this.c.Reports.myHTML, this.c.Reports.myTXT, this.c.MyApp, this.c.Pages.P18, this.c.Reports.summaryFile)
  })
  //---------------------------------------------------------------------
})

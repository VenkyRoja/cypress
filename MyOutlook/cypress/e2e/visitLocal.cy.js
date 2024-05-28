
var passStr = ''
var failStr = ''
var dateStr = ''

var pass
var fail
var othr
var dt

var fileLoc = 'C:\\Tutorials\\MyCypress\\MyOutlook\\cypress\\downloads'
var fileLoc1 = 'C:\\Tutorials\\MyCypress\\MyOutlook'
var fileName = 'index.html'
var myurl = './cypress/downloads/index.html'
var myurl1 = './index.html'

//----------------------------------------------------------------------
describe('open local html file in Cypress', () =>  {
  
  //--------------------- 1--------------------------------
  it('visit local html ', { baseUrl: null}, () => {
    cy.exec(`powershell -Command Test-Path  ${fileLoc}\\${fileName}`, {failOnNonZeroExit: false}).then((result) => {
      cy.task('log',result)
    })

    cy.exec(`powershell -Command Test-Path  ${fileLoc1}\\${fileName}`, {failOnNonZeroExit: false}).then((result) => {
      cy.task('log',result)

      if (result.stdout.trim() === 'True') {
        cy.task('log', 'File exists.')

        cy.visit(myurl1, {failOnStatusCode:false})

        cy.get('#nav-dashboard > .icon-holder > .fa').click()

        cy.get(':nth-child(2) > .card > .card-footer > :nth-child(1) > small').invoke('text').then((text) => {
            passStr = text
        }) 
  
        cy.get(':nth-child(2) > .card > .card-footer > :nth-child(2) > small').invoke('text').then((text) => {
            failStr = text 
        }) 
  
        cy.get(':nth-child(2) > a > .badge').invoke('text').then((text) => {
            dateStr = text
        })
         
      } else {
        cy.task('log', 'File does not exist.')
      }
    })


    
    }) //it 1 ends

 
 
    //--------------------- 2--------------------------------
    it('print the values ', () => {

      cy.task('log', `Value 1: ${passStr}`)  
      cy.task('log', `Value 2: ${failStr}`)  
      cy.task('log', `Value 2: ${dateStr}`) 

      var pArr
      var fArr
      var oArr
      
      if ((passStr.trim() !== '' ) && (failStr.trim() !== '' ) && (dateStr.trim() !== '' )) {
      pArr = passStr.split('scenarios passed')
      pass = pArr[0]

      fArr = failStr.split('scenarios failed')
      fail = fArr[0]

      oArr = failStr.split(' ')
      othr = oArr[oArr.indexOf('others\n\t')-1]

      cy.task('log', `pass = ${pass}`)
      cy.task('log', `fail = ${fail}`)
      cy.task('log', `other = ${othr}`)
      cy.task('log', `date = ${dateStr}`) 

      cy.task('log', oArr)

      cy.task('log', oArr.indexOf('others'))
      cy.task('log', oArr.indexOf('others\n\t'))
      cy.task('log', oArr.indexOf('0'))
      }
    }) //it 2 ends

})    //describe ends
//----------------------------------------------------------------------
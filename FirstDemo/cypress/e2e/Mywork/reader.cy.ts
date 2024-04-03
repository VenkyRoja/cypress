let samples;
let ko;
let pct99;
let txn;
let rcd;
let sent;

let HSamples;
let Hko;
let Hpct99;
let Htxn;
let Hrcd;
let Hsent;

let Head1;
let Head2;
let Head3;
let Head4;

const prefixA = "#statisticsTable > tbody.tablesorter-no-sort > tr > :nth-child("
const suffixA = ")"

const prefixB = ":nth-child(2) > [data-column="
const suffixB = "] > .tablesorter-header-inner"

const prefixC = "[colspan="
const suffixC = "] > .tablesorter-header-inner"

describe('Reading an html file ', () => {
    it('should table entries in an html page', () => {

      cy.visit('Report_1a/index4.html')  // C:\MyCypress\cypress\Mywork\Report_1a
 
      cy.get(prefixC + '"3"' + suffixC).then(($value) => { Head1 = $value.text()}) 
      cy.get(prefixC + '"6"' + suffixC).then(($value) => { Head2 = $value.text()}) 
      cy.get(prefixC + '"1"' + suffixC).then(($value) => { Head3 = $value.text()})
      cy.get(prefixC + '"2"' + suffixC).then(($value) => { Head4 = $value.text()}) 

      cy.get(prefixB + '"1"' + suffixB).then(($value) => { HSamples = $value.text()})
      cy.get(prefixB + '"2"' + suffixB).then(($value) => { Hko = $value.text()})
      cy.get(prefixB + '"9"' + suffixB).then(($value) => { Hpct99 = $value.text()})
      cy.get(prefixB + '"10"' + suffixB).then(($value) => { Htxn = $value.text()})
      cy.get(prefixB + '"11"' + suffixB).then(($value) => { Hrcd = $value.text()})
      cy.get(prefixB + '"12"' + suffixB).then(($value) => { Hsent = $value.text()})

      cy.get(prefixA + "2" + suffixA).then(($value) => { samples = $value.text()})
      cy.get(prefixA + "3" + suffixA).then(($value) => { ko = $value.text()})
      cy.get(prefixA + "10" + suffixA).then(($value) => { pct99 = $value.text()})
      cy.get(prefixA + "11" + suffixA).then(($value) => { txn = $value.text()})
      cy.get(prefixA + "12" + suffixA).then(($value) => { rcd = $value.text()})
      cy.get(prefixA + "13" + suffixA).then(($value) => { sent = $value.text()})
      
    })

    it("print", () =>{
      
      cy.task('log',  Head1 + " : " + HSamples + ' = ' + samples)
      cy.task('log',  Head1 + " : " + Hko + ' = ' + ko)
      cy.task('log',  Head2 + " : " + Hpct99 +' = ' + pct99)
      cy.task('log',  Head3 + " : " + Htxn + ' = ' + txn)
      cy.task('log',  Head4 + " : " + Hrcd + ' = ' + rcd)
      cy.task('log',  Head4 + " : " + Hsent + ' = ' + sent)

      cy.log( Head1 + " : " + HSamples + ' = ' + samples)

    })
  })



describe('parent', () => {
    beforeEach(() => {
      cy.wrap('one').as('a')
    })
  
    context('child', () => {
      beforeEach(() => {
        cy.wrap('two').as('b')
      })
  
      describe('grandchild', () => {
        beforeEach(() => {
          cy.wrap('three').as('c')
        })
  
        it('can access all aliases as properties', function () {
          expect(this.a).to.eq('one') // true
          expect(this.b).to.eq('two') // true
          expect(this.c).to.eq('three') // true
        })
      })
    })
  })
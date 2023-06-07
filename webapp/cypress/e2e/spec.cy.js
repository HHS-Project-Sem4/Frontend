describe('template spec', () => {

  it('visit page', () => {
    cy.visit('http://localhost:3000')
    expect(true).to.equal(true)
  })


})

describe('page visits', () => {

  it('default page verkoop', () => {
    cy.contains('VERKOOP OVERZICHT')
  })

  it('visit page kosten', () => {
    let button = cy.get('button')

    button.contains('KOSTEN').click()

    cy.contains('KOSTEN OVERZICHT')
  })

  it('visit page winst', () => {
    let button = cy.get('button')

    button.contains('WINST').click()

    cy.contains('WINST OVERZICHT')
  })

  it('visit page opslag', () => {
    let button = cy.get('button')

    button.contains('OPSLAG').click()

    cy.contains('OPSLAG OVERZICHT')
  })
  it('visit page klanten', () => {
    let button = cy.get('button')

    button.contains('KLANTEN').click()

    cy.contains('KLANTEN OVERZICHT')
  })

  it('visit page filialen', () => {
    let button = cy.get('button')

    button.contains('FILIALEN').click()

    cy.contains('FILIALEN OVERZICHT')
  })


})

describe('test filter', () => {

  beforeEach(() => {
    cy.wait(500)
    cy.contains('Alle Producten').click()
  })

  it('test shirt filter', () => {
    cy.contains('Shirt').click()
    cy.contains('Shirt')
  })

  it('test sneakers filter', () => {
    cy.contains('Sneakers').click()
    cy.contains('Sneakers')
  })

  it('test sportschoenen filter', () => {
    cy.contains('Sportschoenen').click()
    cy.contains('Sportschoenen')
  })

  it('test wandelschoenen filter', () => {
    cy.contains('Wandelschoenen').click()
    cy.contains('Wandelschoenen')
  })

})
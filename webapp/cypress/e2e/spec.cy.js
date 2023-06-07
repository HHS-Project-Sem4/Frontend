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

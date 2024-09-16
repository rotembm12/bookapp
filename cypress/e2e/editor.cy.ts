describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/editor');
    cy.get('[data-test=editor]').should('exist');
  });
});

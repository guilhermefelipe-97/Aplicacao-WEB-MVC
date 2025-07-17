describe('Cadastro de Diretor', () => {
  it('Deve cadastrar um novo diretor e exibir na listagem', () => {
    cy.visit('http://localhost:3000/directors');
    cy.contains('Cadastrar novo diretor').click();
    cy.url().should('include', '/directors/new');
    cy.get('input[name="name"]').type('Stanley Kubrick');
    cy.get('form').submit();
    cy.url().should('include', '/directors');
    cy.contains('Stanley Kubrick');
  });
}); 
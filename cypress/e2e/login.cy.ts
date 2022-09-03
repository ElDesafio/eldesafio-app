/* eslint-disable sonarjs/no-duplicate-string */
describe('Login Screen', () => {
  before(() => {
    cy.task('db_seed');
  });

  beforeEach(() => {
    cy.visitAndCheck('/');
    // cy.findByRole('heading', { name: /accedé a tu cuenta/i }).should(
    //   'be.visible',
    // );
  });

  it(`should show error if email doesn't exist`, () => {
    cy.findByRole('textbox', { name: /email/i })
      .click()
      .type('whatever@aol.com');

    cy.findByRole('button', { name: /continuar/i }).click();
    cy.findByText('No existe un usuario con ese correo').should('be.visible');
  });
  it('should login/logout admin', () => {
    cy.login({ role: 'admin' });
    // TODO: Fix this double click
    cy.findByRole('button', { name: /Open user menu/i })
      .should('be.visible')
      .focus()
      .click();
    cy.findByRole('button', { name: /Open user menu/i })
      .should('be.visible')
      .focus()
      .click();
    cy.findByText(/Cerrar Sesión/i).click();
  });
});

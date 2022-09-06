describe('Participants', () => {
  before(() => {
    cy.task('db_seed');
  });
  context('New Participant', () => {
    const findName = () => cy.findByRole('textbox', { name: 'Nombre' });
    const findNameError = () => cy.findByText(/nombre no puede estar vacío/i);
    const findLastName = () => cy.findByRole('textbox', { name: 'Apellido' });
    const findLastNameError = () =>
      cy.findByText(/Apellido no puede estar vacío/i);
    const findSex = () =>
      cy.findByRole('combobox', { description: 'Seleccionar sexo' });
    const findSexError = () => cy.findByText(/Sexo no puede estar vacío/i);
    const findBirthday = () => cy.get('input[name=birthday]');
    const findBirthdayError = () =>
      cy.findByText(/Fecha de nacimiento no puede estar vacía/i);
    const findDNI = () => cy.findByRole('textbox', { name: 'DNI' });
    const findDNIError = () => cy.findByText(/DNI no puede estar vacío/i);
    const findMedicalInsurance = () =>
      cy.findByRole('textbox', { name: 'Obra Social' });
    const findAddress = () => cy.findByRole('textbox', { name: 'Dirección' });
    const findCity = () => cy.findByRole('textbox', { name: 'Ciudad' });
    const findNeighborhood = () => cy.get('#neighborhood');
    const findEmail = () =>
      cy.findByRole('textbox', { name: 'Correo Electrónico' });
    const findPhone1 = () => cy.findByRole('textbox', { name: 'Teléfono 1' });
    const findPhone2 = () => cy.findByRole('textbox', { name: 'Teléfono 2' });
    const findPhone2Whatsapp = () =>
      cy
        .findAllByRole('checkbox', { name: /Tiene Whatsapp/i })
        .spread((one, two) => two);
    const findPhone1BelongsTo = () => cy.get('#phone1BelongsTo');
    const findPhone2BelongsTo = () => cy.get('#phone2BelongsTo');
    const findSchool = () => cy.get('#schoolId');
    const findSchoolYear = () => cy.get('#schoolYear');
    const findBiography = () => cy.findByRole('textbox', { name: 'Biografía' });
    const findPresentedHealthCertificate = () =>
      cy.findByRole('checkbox', { name: /apto médico/i });
    const findHealthCertificateDate = () =>
      cy.get('input[name=healthCertificateDate]');

    const findPresentedDNI = () => cy.findByRole('checkbox', { name: /dni/i });
    const findSendButton = () => cy.findByRole('button', { name: /enviar/i });

    beforeEach(() => {
      cy.login({ role: 'admin' });
    });
    it('Error if submiting without required fields', () => {
      cy.visitAndCheck('/');
      cy.findByRole('heading', { name: /participantes/i }).should('be.visible');
      cy.findByRole('button', { name: /nuevo/i }).should('be.visible').click();
      cy.findByRole('heading', { name: /crear participante/i }).should(
        'be.visible',
      );

      cy.findByRole('button', { name: /enviar/i }).click();

      findName().should('have.attr', 'aria-invalid', 'true');
      findNameError().should('be.visible');

      findLastName().should('have.attr', 'aria-invalid', 'true');
      findLastNameError().should('be.visible');

      findSex().should('have.attr', 'aria-invalid', 'true');
      findSexError().should('be.visible');

      findBirthday().should('have.attr', 'aria-invalid', 'true');
      findBirthdayError().should('be.visible');

      findDNI().should('have.attr', 'aria-invalid', 'true');
      findDNIError().should('be.visible');
    });

    it('Errors should dissapear when fields are filled', () => {
      cy.visitAndCheck('/participants/new');
      cy.findByRole('button', { name: /enviar/i }).click();

      findName().should('have.attr', 'aria-invalid', 'true');
      findNameError().should('be.visible');

      findName().type('Kevin');
      findNameError().should('not.exist');

      findLastName().type('Johansen');
      findLastNameError().should('not.exist');

      cy.get('#sex').click();
      cy.findByText('Varón').click();
      findSexError().should('not.exist');

      findBirthday().focus().type('2000-09-09');
      findBirthdayError().should('not.exist');

      findDNI().type('888888888');
      findDNIError().should('not.exist');
    });

    it('Can create new participant', () => {
      cy.visitAndCheck('/participants/new');
      findName().type('Kevin');
      findLastName().type('Johansen');
      cy.get('#sex').click();
      cy.findByText('Varón').click();
      findBirthday().focus().type('2000-09-09');
      findDNI().type('888888888');
      findMedicalInsurance().type('OSDE');
      findAddress().type('Cordoba 1313');
      findCity().type('Rosario');
      findNeighborhood().click();
      cy.findByText('Otro').click();
      findEmail().type('kevin@johansen.example.fake');
      findPhone1().type('111111111');
      findPhone1BelongsTo().click();
      findPhone1BelongsTo().within(() =>
        cy.findByText('Participante').should('exist').click(),
      );
      findPhone2().type('222222222');
      findPhone2Whatsapp().parent().click();
      findPhone2BelongsTo().click();
      findPhone2BelongsTo().within(() =>
        cy.findByText('Madre').should('exist').click(),
      );
      findSchool().type('N');
      cy.findByText('Normal 2').should('be.visible').click();
      findSchoolYear().click();
      cy.findByText('5º grado').click();
      findBiography().type('Kevin nació en Rosario');
      findPresentedHealthCertificate().parent().click();
      findHealthCertificateDate().type('2022-10-10');
      findPresentedDNI().parent().click();
      findSendButton().click();
      cy.findByText('Kevin Johansen').should('exist').click();
      cy.findByRole('heading', { name: 'Datos Personales' }).should('exist');
    });

    it('Should show error when email or DNI is already taken', () => {
      cy.visitAndCheck('/participants/new');
      findName().type('Gabriela');
      findLastName().type('Epumer');
      cy.get('#sex').click();
      cy.findByText('Varón').click();
      findBirthday().focus().type('2000-09-09');
      findDNI().type('58367293');
      findEmail().type('charly@garcia.fake');
      findSendButton().click();
      cy.findByText('Ya existe un participante con este DNI').should(
        'be.visible',
      );
      findDNI().type('5835667000');
      findSendButton().click();
      cy.findByText('Gabriela Epumer').should('exist').click();
      cy.findByRole('heading', { name: 'Datos Personales' }).should('exist');
    });

    it.only('should be possible to add/remove/waitlist participant to program', () => {
      cy.intercept({
        method: 'POST',
        url: '/participants/1/programs**',
      }).as('PostProgram');

      // Add to Program
      cy.visitAndCheck('participants/1/programs');
      cy.findByTestId(/paracaidismo/i).click();
      cy.findByRole('dialog', { name: /agregar a 🪂 paracaidismo/i }).should(
        'be.visible',
      );
      cy.findByRole('button', { name: 'Agregar' }).click();
      cy.wait('@PostProgram');
      cy.visitAndCheck('participants/1/programs');
      cy.findByRole('dialog', { name: /agregar a 🪂 paracaidismo/i }).should(
        'not.exist',
      );
      cy.findByRole('checkbox', { name: /paracaidismo/i, hidden: true }).should(
        'be.checked',
      );

      // Remove from Program
      cy.findByTestId(/paracaidismo/i).click();
      cy.findByRole('dialog', {
        name: /dar de baja de 🪂 paracaidismo/i,
      }).should('be.visible');
      cy.findByRole('button', { name: 'Dar de baja' }).click();
      cy.wait('@PostProgram');
      cy.visitAndCheck('participants/1/programs');
      cy.findByRole('dialog', {
        name: /dar de baja de 🪂 paracaidismo/i,
      }).should('not.exist');
      cy.findByTestId(/paracaidismo/i).within(() => {
        cy.findByText('Baja').should('be.visible');
        cy.findByRole('checkbox', {
          name: /paracaidismo/i,
          hidden: true,
        }).should('not.be.checked');
      });

      // Add to waiting list
      cy.findByTestId(/paracaidismo/i).click();
      cy.findByRole('dialog', { name: /agregar a 🪂 paracaidismo/i }).should(
        'be.visible',
      );
      cy.findByRole('button', { name: 'Agregar en Espera' }).click();
      cy.wait('@PostProgram');
      cy.visitAndCheck('participants/1/programs');
      cy.findByRole('dialog', { name: /agregar a 🪂 paracaidismo/i }).should(
        'not.exist',
      );
      cy.findByTestId(/paracaidismo/i).within(() => {
        cy.findByText('En Espera').should('be.visible');
        cy.findByRole('checkbox', {
          name: /paracaidismo/i,
          hidden: true,
        }).should('not.be.checked');
      });
    });
  });
});

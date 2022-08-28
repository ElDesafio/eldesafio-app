import type { GetMagicLinkArgs } from './get-magic-link';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a role
       *
       * @returns {typeof getMagicLink}
       * @memberof Chainable
       * @example
       *    cy.getMagicLink()
       * @example
       *    cy.getMagicLink({ role: 'admin' })
       */
      getMagicLink: typeof getMagicLink;

      /**
       * Extends the standard visit command to wait for the page to load
       *
       * @returns {typeof visitAndCheck}
       * @memberof Chainable
       * @example
       *    cy.visitAndCheck('/')
       *  @example
       *    cy.visitAndCheck('/', 500)
       */
      visitAndCheck: typeof visitAndCheck;
    }
  }
}

function getMagicLink({ role }: GetMagicLinkArgs) {
  let email: string;

  switch (role) {
    case 'admin':
      email = 'lucas.curti@eldesafio.org';
      break;
    case 'facilitator':
      email = 'not@yet.implemented';
      break;
    case 'volunteer':
      email = 'not@yet.implemented';
      break;
    default:
      throw new Error(`'role' option wasn't provided for getMagicLink()`);
  }

  cy.findByRole('textbox', { name: /email/i }).click().type(email);

  cy.findByRole('button', { name: /continuar/i }).click();

  cy.findByText(/correo enviado! revisa tu casilla/i).should('be.visible');

  cy.exec(
    `npx ts-node --files --require tsconfig-paths/register ./cypress/support/get-magic-link.ts "${role}"`,
  ).then(({ stdout }) => {
    const magicLinkValue = stdout
      .replace(
        /.*<magicLink>(?<magicLinkValue>.*)<\/magicLink>.*/s,
        '$<magicLinkValue>',
      )
      .trim();
    cy.visit(magicLinkValue);
    cy.location('pathname').should('eq', '/participants');
  });
}

// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url: string, waitTime: number = 1000) {
  cy.visit(url);
  cy.location('pathname').should('contain', url).wait(waitTime);
}

Cypress.Commands.add('getMagicLink', getMagicLink);
Cypress.Commands.add('visitAndCheck', visitAndCheck);

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/

import 'dotenv/config';

import { defineConfig } from 'cypress';
import execa from 'execa';

export default defineConfig({
  viewportWidth: 1000,
  viewportHeight: 800,
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      const isDev = config.watchForFileChanges;
      const port = process.env.PORT ?? (isDev ? '3000' : '8811');
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on('task', {
        log(message) {
          console.log(message);

          return null;
        },
        db_seed() {
          try {
            const { stdout } = execa.sync(
              'psql',
              [
                `"${process.env.DATABASE_URL_E2E}"`,
                '<',
                'cypress/support/seed.sql',
              ],
              { shell: true },
            );
            console.log(stdout);

            return true;
          } catch (error) {
            console.log(error);
          }
        },
      });

      return { ...config, ...configOverrides };
    },
  },
});

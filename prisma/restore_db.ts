import 'dotenv/config';

import execa from 'execa';

function restoreDB() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error('Database connection string not provided.');
  }

  try {
    const { stdout } = execa.sync(
      'psql',
      [`"${DATABASE_URL}"`, '<', 'cypress/support/seed.sql'],
      { shell: true },
    );

    console.log(`✅ DB restored created`);
  } catch (error) {
    console.error(`❌ Error restoring DB: ${(error as Error)?.message}`);
  }
}

restoreDB();

import 'dotenv/config';

import execa from 'execa';

function backupDB() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    throw new Error('Database connection string not provided.');
  }
  const { stdout } = execa.sync(
    'pg_dump',
    ['-c', `"${DATABASE_URL}"`, '>', 'cypress/support/seed.sql'],
    { shell: true },
  );

  console.log(`✅ seed created`);
}

backupDB();

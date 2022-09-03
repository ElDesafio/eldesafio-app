import 'dotenv/config';

import execa from 'execa';

function updateSeedSQL() {
  const DATABASE_URL = process.env.DATABASE_URL_CLEAN;
  if (!DATABASE_URL) {
    throw new Error('Database connection string not provided.');
  }
  const { stdout } = execa.sync(
    'pg_dump',
    [
      '--clean',
      '--if-exists',
      '--column-inserts',
      '--attribute-inserts',
      '--exclude-table=_prisma_migrations',
      `"${DATABASE_URL}"`,
      '>',
      'prisma/seed.sql',
    ],
    { shell: true },
  );

  console.log(stdout);

  console.log(`✅ seed created`);
}

updateSeedSQL();

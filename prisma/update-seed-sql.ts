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
      // We are not including --clean nor --if-exists because we are using --data-only and they are not compatible. If you need to seed the entire data structure, uncomment them and remove --data-only. This shouldn't be necessary because the structure is managed by Prisma migrations.
      // '--clean',
      // '--if-exists',
      '--data-only',
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

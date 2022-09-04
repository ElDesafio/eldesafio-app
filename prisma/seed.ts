import fs from 'fs';
import path from 'path';

import { db } from '../app/services/db.server';

async function main() {
  try {
    const rawSql = await fs.promises.readFile(
      path.join(__dirname, './seed.sql'),
      {
        encoding: 'utf-8',
      },
    );
    const sqlReducedToStatements = rawSql
      .split('\n')
      .filter((line) => !line.startsWith('--')) // remove comments-only lines
      .join('\n')
      .replace(/\r\n|\n|\r/g, ' ') // remove newlines
      .replace(/\s+/g, ' '); // excess white space
    const sqlStatements = splitStringByNotQuotedSemicolon(
      sqlReducedToStatements,
    );

    for (const sql of sqlStatements) {
      await db.$executeRawUnsafe(sql);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

function splitStringByNotQuotedSemicolon(input: string): string[] {
  const result = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ';' && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}

void main();

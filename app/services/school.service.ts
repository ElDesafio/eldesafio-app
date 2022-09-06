import { db } from './db.server';

export async function getSchool(id: number) {
  return await db.school.findUnique({
    where: {
      id,
    },
  });
}

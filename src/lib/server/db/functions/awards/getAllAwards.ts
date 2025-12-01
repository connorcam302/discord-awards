import type { drizzle } from 'drizzle-orm/postgres-js';
import { awards } from '../../schema';

export const getAllAwards = async (db: ReturnType<typeof drizzle>) => {
  return await db.select().from(awards);
};

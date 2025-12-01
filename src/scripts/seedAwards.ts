import awardsData from '$lib/data/awards-base.json';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/server/db/schema';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle(client, { schema });

async function seedAwards() {
  try {
    console.log('Starting to seed awards...');

    for (const award of awardsData) {
      const result = await db
        .insert(schema.awards)
        .values({
          name: award.name,
          type: award.type,
          description: award.description
        })
        .returning();

      console.log(`✓ Inserted: ${award.name} (ID: ${result[0].id})`);
    }

    console.log(`\n✅ Successfully seeded ${awardsData.length} awards!`);
  } catch (error) {
    console.error('❌ Error seeding awards:', error);
    throw error;
  } finally {
    process.exit(0);
  }
}

seedAwards();

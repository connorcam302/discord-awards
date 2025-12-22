import finalists from '$lib/data/nominees-base.json';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import * as schema from '$lib/server/db/schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

type NomineeEntityInput = {
	name?: string;
	image?: string;
	url?: string;
	text?: string;
};

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle(client, { schema });

const normaliseNominee = (input: any): NomineeEntityInput => {
	if (typeof input === 'string') {
		return { text: input };
	}

	return {
		name: input.name,
		image: input.image,
		url: input.url
	};
};

const seedNominees = async () => {
	for (const awardData of finalists) {
		console.log(`Seeding award: ${awardData.name}`);

		// 1️⃣ Find award by name
		const award = await db
			.select()
			.from(schema.awards)
			.where(eq(schema.awards.name, awardData.name))
			.then((r) => r[0]);

		if (!award) {
			throw new Error(`Award not found: ${awardData.name}`);
		}

		// 2️⃣ Process nominees
		for (const nominee of awardData.nominees) {
			const awardNomineeId = randomUUID();

			await db.insert(schema.awardNominees).values({
				id: awardNomineeId,
				awardId: award.id
			});

			// Handle single vs double
			const members = Array.isArray(nominee) ? nominee : [nominee];

			for (let i = 0; i < members.length; i++) {
				const normalised = normaliseNominee(members[i]);

				const nomineeEntityId = randomUUID();

				await db.insert(schema.nomineeEntities).values({
					id: nomineeEntityId,
					name: normalised.name ?? null,
					imageUrl: normalised.image ?? null,
					videoUrl: normalised.url ?? null,
					textValue: normalised.text ?? null
				});

				await db.insert(schema.awardNomineeMembers).values({
					awardNomineeId,
					nomineeEntityId
				});
			}
		}
	}

	console.log('✅ Final nominees seeded successfully');
};

seedNominees().catch((err) => {
	console.error(err);
	process.exit(1);
});

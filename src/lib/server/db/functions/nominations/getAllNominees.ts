import type { drizzle } from 'drizzle-orm/postgres-js';
import { awardNomineeMembers, awardNominees, awards, nomineeEntities } from '../../schema';
import { eq } from 'drizzle-orm';

type NomineeEntity = {
	id: string;
	name?: string | null;
	text?: string | null;
	image?: string | null;
	video?: string | null;
};

type AwardNominee = {
	id: string;
	members: NomineeEntity[];
};

type AwardWithNominees = {
	id: string;
	name: string;
	type: string;
	description: string;
	nominees: AwardNominee[];
};

export const getAllNominees = async (db: ReturnType<typeof drizzle>) => {
	const rows = await db
		.select({
			awardId: awards.id,
			awardName: awards.name,
			awardDescription: awards.description,
			awardType: awards.type,
			awardNomineeId: awardNominees.id,
			entityId: nomineeEntities.id,
			entityName: nomineeEntities.name,
			entityText: nomineeEntities.textValue,
			entityImage: nomineeEntities.imageUrl,
			entityVideo: nomineeEntities.videoUrl
		})
		.from(awards)
		.leftJoin(awardNominees, eq(awardNominees.awardId, awards.id))
		.leftJoin(awardNomineeMembers, eq(awardNomineeMembers.awardNomineeId, awardNominees.id))
		.leftJoin(nomineeEntities, eq(nomineeEntities.id, awardNomineeMembers.nomineeEntityId))
		.orderBy(awards.name, awardNominees.id);

	const awardsMap = new Map<string, AwardWithNominees>();

	for (const row of rows) {
		if (!awardsMap.has(row.awardId)) {
			awardsMap.set(row.awardId, {
				id: row.awardId,
				name: row.awardName,
				type: row.awardType,
				description: row.awardDescription,
				nominees: []
			});
		}

		const award = awardsMap.get(row.awardId)!;

		if (!row.awardNomineeId) continue;

		let nominee = award.nominees.find((n) => n.id === row.awardNomineeId);

		if (!nominee) {
			nominee = {
				id: row.awardNomineeId,
				members: []
			};
			award.nominees.push(nominee);
		}

		if (row.entityId) {
			nominee.members.push({
				id: row.entityId,
				name: row.entityName,
				text: row.entityText,
				image: row.entityImage,
				video: row.entityVideo
			});
		}
	}

	const sortOrder = [
		'Game of the Year',
		'Worst Game of the Year',
		'Meta of the Year',
		'Worst Meta of the Year',
		'Labour of love award',
		'Moment of the Year',
		'Clip of the Year',
		'Best argument',
		'Biggest Rivalry',
		'Pookies of the Year',
		'Content Creator of the Year',
		'Content of the Year',
		'Discord Rose Award',
		'The Endurance Award',
		'Most Improved Member',
		'Nightmare Award'
	];

	return Array.from(awardsMap.values())
		.filter((award) => award.nominees.length > 0)
		.sort((a, b) => {
			return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
		});
};

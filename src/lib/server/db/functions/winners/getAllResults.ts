import type { drizzle } from 'drizzle-orm/postgres-js';
import { votes, awardNominees, awardNomineeMembers, nomineeEntities, awards } from '../../schema';
import { eq, count, inArray, sql } from 'drizzle-orm';
import awardsFile from '$lib/data/awards-base.json';

export type AwardResult = {
	awardId: string;
	awardName: string;
	awardType: string;
	awardDescription: string;
	nominees: NomineeResult[];
};

export type NomineeResult = {
	awardNomineeId: string;
	nomineeName: string | null;
	voteCount: number;
	members: {
		awardNomineeId: string;
		name: string | null;
		textValue: string | null;
		videoUrl: string | null;
		imageUrl: string | null;
	}[];
};

export const getAllResults = async (db: ReturnType<typeof drizzle>) => {
	const allAwards = await db.select().from(awards).orderBy(awards.name);

	const allAwardIds = allAwards.map((a) => a.id);

	const allAwardNominees = await db
		.select()
		.from(awardNominees)
		.where(inArray(awardNominees.awardId, allAwardIds));

	const awardNomineeIds = allAwardNominees.map((an) => an.id);

	const voteCounts = await db
		.select({
			awardNomineeId: votes.awardNomineeId,
			voteCount: count(votes.id)
		})
		.from(votes)
		.where(inArray(votes.awardNomineeId, awardNomineeIds))
		.groupBy(votes.awardNomineeId);

	const voteCountMap = new Map(voteCounts.map((v) => [v.awardNomineeId, Number(v.voteCount)]));

	const nomineeMembers = await db
		.select({
			awardNomineeId: awardNomineeMembers.awardNomineeId,
			name: nomineeEntities.name,
			textValue: nomineeEntities.textValue,
			videoUrl: nomineeEntities.videoUrl,
			imageUrl: nomineeEntities.imageUrl
		})
		.from(awardNomineeMembers)
		.innerJoin(nomineeEntities, eq(awardNomineeMembers.nomineeEntityId, nomineeEntities.id))
		.where(inArray(awardNomineeMembers.awardNomineeId, awardNomineeIds));

	const results: AwardResult[] = allAwards.map((award) => {
		const awardNomineesForAward = allAwardNominees.filter((an) => an.awardId === award.id);
		const nominees = awardNomineesForAward
			.map((awardNominee) => {
				const members = nomineeMembers.filter((m) => m.awardNomineeId === awardNominee.id);
				let nomineeName: string | null = null;

				if (members.length === 1) {
					const member = members[0];
					if (member.videoUrl) {
						nomineeName = member.videoUrl;
					} else if (member.textValue) {
						nomineeName = member.textValue;
					} else if (member.name) {
						nomineeName = member.name;
					} else if (member.imageUrl) {
						nomineeName = member.imageUrl;
					}
				} else {
					const names = members
						.map((m) => {
							if (m.name) return m.name;
							if (m.videoUrl) return m.videoUrl;
							if (m.textValue) return m.textValue;
							if (m.imageUrl) return m.imageUrl;
							return null;
						})
						.filter((n): n is string => n !== null);
					nomineeName = names.length > 0 ? names.join(' & ') : null;
				}

				return {
					awardNomineeId: awardNominee.id,
					nomineeName,
					voteCount: voteCountMap.get(awardNominee.id) ?? 0,
					members
				};
			})
			.sort((a, b) => b.voteCount - a.voteCount);

		const description =
			awardsFile.find((awardObj) => award.name === awardObj.name)?.description ?? '';

		return {
			awardId: award.id,
			awardDescription: description,
			awardName: award.name,
			awardType: award.type,
			nominees
		};
	});

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

	return results;
};

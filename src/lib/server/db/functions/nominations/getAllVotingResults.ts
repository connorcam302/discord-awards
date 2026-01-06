import type { drizzle } from 'drizzle-orm/postgres-js';
import { votes, awardNominees, awardNomineeMembers, nomineeEntities, awards } from '../../schema';
import { eq, count, inArray } from 'drizzle-orm';

export type VotingResult = {
	awardName: string;
	nomineeName: string | null;
	voteCount: number;
	awardNomineeId: string;
};

export const getAllVotingResults = async (db: ReturnType<typeof drizzle>) => {
	const voteCounts = await db
		.select({
			awardNomineeId: votes.awardNomineeId,
			awardId: awardNominees.awardId,
			awardName: awards.name,
			voteCount: count(votes.id)
		})
		.from(votes)
		.innerJoin(awardNominees, eq(votes.awardNomineeId, awardNominees.id))
		.innerJoin(awards, eq(awardNominees.awardId, awards.id))
		.groupBy(votes.awardNomineeId, awardNominees.awardId, awards.name);

	const awardNomineeIds = voteCounts.map((v) => v.awardNomineeId);

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

	const results: VotingResult[] = voteCounts.map((voteCount) => {
		const members = nomineeMembers.filter((m) => m.awardNomineeId === voteCount.awardNomineeId);
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
			awardName: voteCount.awardName,
			nomineeName,
			voteCount: Number(voteCount.voteCount),
			awardNomineeId: voteCount.awardNomineeId
		};
	});

	return results.sort((a, b) => {
		if (a.awardName !== b.awardName) {
			return a.awardName.localeCompare(b.awardName);
		}
		return b.voteCount - a.voteCount;
	});
};

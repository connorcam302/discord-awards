import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import {
	getAllNominations,
	getAllVotingResults,
	getVotersForNominee
} from '$lib/server/db/functions';
import type { VotingResultWithVoters } from './voting-columns';

export const load: PageServerLoad = async () => {
	const allNominations = await getAllNominations(db);
	const votingResults = await getAllVotingResults(db);

	const votingResultsWithVoters: VotingResultWithVoters[] = await Promise.all(
		votingResults.map(async (result) => {
			const voters = await getVotersForNominee(db, result.awardNomineeId);
			return {
				...result,
				voters
			};
		})
	);

	return { allNominations, votingResults: votingResultsWithVoters };
};

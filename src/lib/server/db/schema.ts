import { pgTable, text, uuid, timestamp, uniqueIndex, integer } from 'drizzle-orm/pg-core';

// --- USERS (if using email auth) ---
export const users = pgTable('users', {
	id: uuid('id').primaryKey(),
	name: text('name')
});

// --- AWARDS ---
export const awards = pgTable('awards', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	description: text('description'),
	type: text('type').notNull()
});

// --- NOMINATIONS ---
export const nominations = pgTable('nominations', {
	id: uuid('id').primaryKey().defaultRandom(),
	awardId: uuid('award_id')
		.references(() => awards.id)
		.notNull(),
	nominee: text('nominee').notNull(), // or nomineeUserId if voting for friends
	submittedBy: uuid('submitted_by')
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

// --- FINAL NOMINEES (locked after nomination phase) ---
export const finalNominees = pgTable('final_nominees', {
	id: uuid('id').primaryKey().defaultRandom(),
	awardId: uuid('award_id')
		.references(() => awards.id)
		.notNull(),
	name: text('name').notNull()
});

// --- VOTES ---
export const votes = pgTable(
	'votes',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		awardId: uuid('award_id')
			.references(() => awards.id)
			.notNull(),
		nominee: text('nominee').notNull(),
		submittedBy: uuid('submitted_by')
			.references(() => users.id)
			.notNull(),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => ({
		uniqueVote: uniqueIndex('unique_vote').on(table.submittedBy, table.awardId)
	})
);

// --- SETTINGS (app state) ---
export const settings = pgTable('settings', {
	id: integer('id').primaryKey(), // always 1
	phase: text('phase').notNull() // 'nominations' | 'voting' | 'results'
});

// types/database.ts

export type UserRole = 'player' | 'coach' | 'admin';
// export type CompetitionType = 'Bezirksliga' | 'Rheinlandpokal' | 'Kreisfreundschaftsspiele';

// ✅ users table
export interface User {
	id: string; // UUID
	full_name: string;
	role: UserRole;
	club_id: string | null;
	is_validated: boolean;
}

// ✅ clubs table
export interface Club {
	id: string; // UUID
	name: string;
	is_validated: boolean;
	competitions: string[]; // Array of competition IDs
}

export interface Competition {
	id: string;
	name: string;
	created_at: string;
	created_by: string;
}

// ✅ matches table
export interface Match {
	id: string;
	competition_id: string;
	home_team: string;
	away_team: string;
	home_score: number;
	away_score: number;
	date: string;
	created_at: string;
	created_by: string;
	club_id: string;
}

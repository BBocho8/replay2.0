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
}

// ✅ matches table
export interface Match {
	id: string; // UUID
	home_team: string;
	away_team: string;
	home_score: number;
	away_score: number;
	date: string; // ISO datetime string
	competition: string;
	video_url: string; // full game URL (or we can extend to parts if needed)
}

export interface Match {
	id: string;
	home_team: string;
	away_team: string;
	home_score: number;
	away_score: number;
	date: string;
	competition: string;
	full_game_url: string | null;
	first_half1_url?: string | null;
	first_half2_url?: string | null;
	first_half3_url?: string | null;
	second_half1_url?: string | null;
	second_half2_url?: string | null;
	second_half3_url?: string | null;
}

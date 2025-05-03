// types/database.ts

export type UserRole = 'player' | 'coach' | 'admin' | 'super_admin';
// export type CompetitionType = 'Bezirksliga' | 'Rheinlandpokal' | 'Kreisfreundschaftsspiele';

// ✅ users table
export interface User {
	id: string; // UUID
	full_name: string;
	role: UserRole;
	created_at: string;
	email: string;
	club_id: string | null;
	is_validated: boolean;
}

// ✅ clubs table
export interface Club {
	id: string;
	name: string;
	is_validated: boolean;
	competitions: string[];
	players: string[];
	admins: string[];
	coaches: string[];
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

export interface Video {
	id: string;
	match_id: string;
	created_at: string;
	created_by: string;
	url: string;
	label?: string;
	club_id: string;
}

export interface Event {
	id: string;
	club_id: string;
	title: string;
	description?: string;
	start_time: string; // ISO string
	end_time: string; // ISO string
	type: 'game' | 'training' | 'meeting' | 'other';
	created_by: string;
	created_at: string;
}

export interface EventWithParticipants extends Event {
	invited_user_ids?: string[];
}

export interface EventParticipant {
	id: string; // UUID
	event_id: string;
	user_id: string;
	status: 'invited' | 'accepted' | 'declined';
	created_at: string;
}

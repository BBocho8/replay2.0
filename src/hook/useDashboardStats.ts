'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import useSWR from 'swr';

const supabase = createClient();

type ClubStats = {
	match_count: number;
	competition_count: number;
	player_count: number;
	coach_count: number;
	admin_count: number;
};

async function fetchDashboardStats() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('User not logged in');

	const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).maybeSingle();
	if (!profile?.club_id) throw new Error('Club not assigned');

	const { data: stats, error } = await supabase.from('club_stats_view').select('*').eq('id', profile.club_id).single();

	if (error || !stats) throw new Error('Failed to fetch club stats');

	return {
		matches: stats.match_count || 0,
		competitions: stats.competition_count || 0,
		players: stats.player_count || 0,
		coaches: stats.coach_count || 0,
		admins: stats.admin_count || 0,
	};
}

export function useDashboardStats() {
	const { data, error, isLoading } = useSWR('dashboard-stats', fetchDashboardStats);

	return {
		stats: data,
		error,
		isLoading,
	};
}

'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import useSWR from 'swr';

const supabase = createClient();

async function fetchDashboardStats() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('User not logged in');

	const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).maybeSingle();
	if (!profile || !profile.club_id) throw new Error('Club not assigned');

	const [matchesRes, usersRes, playersRes, coachesRes] = await Promise.all([
		supabase.from('matches').select('id', { count: 'exact', head: true }).eq('club_id', profile.club_id),
		supabase.from('users').select('id', { count: 'exact', head: true }).eq('club_id', profile.club_id),
		supabase
			.from('users')
			.select('id', { count: 'exact', head: true })
			.eq('club_id', profile.club_id)
			.eq('role', 'player'),
		supabase
			.from('users')
			.select('id', { count: 'exact', head: true })
			.eq('club_id', profile.club_id)
			.eq('role', 'coach'),
	]);

	const { data: club } = await supabase.from('clubs').select('competitions').eq('id', profile.club_id).maybeSingle();
	if (!club || !club.competitions) throw new Error('Club not found');

	return {
		matches: matchesRes.count || 0,
		competitions: club.competitions.length || 0,
		users: usersRes.count || 0,
		players: playersRes.count || 0,
		coaches: coachesRes.count || 0,
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

'use server';

import { createAdminClient } from '@/utils/supabase/adminClient';

export async function fetchClubUsersFromServer() {
	const supabase = createAdminClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();
	if (userError || !user) throw new Error('User not authenticated');

	const { data: profile } = await supabase.from('users').select('club_id, role').eq('id', user.id).maybeSingle();

	if (!profile || !profile.club_id || !['admin', 'coach', 'super_admin'].includes(profile.role)) {
		throw new Error('Unauthorized');
	}

	const { data, error } = await supabase
		.from('users')
		.select('id, full_name, email, role, created_at, club_id, is_validated')
		.eq('club_id', profile.club_id);

	if (error) throw error;
	return data;
}

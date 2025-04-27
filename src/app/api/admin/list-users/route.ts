import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function GET() {
	const supabase = createAdminClient(); // ✅

	const { data: users, error } = await supabase.from('users').select('id, full_name, role, club_id, is_validated');

	if (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}

	return NextResponse.json(users ?? []);
}

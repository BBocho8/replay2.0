// app/api/admin/list-users/route.ts

import { createAdminClient } from '@/utils/supabase/adminClient';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const supabase = createAdminClient();

	const { searchParams } = req.nextUrl;
	const role = searchParams.get('role'); // e.g., 'player' or 'coach'
	const clubId = searchParams.get('club_id'); // current user's club

	let query = supabase.from('users').select('id, full_name, email, role, club_id, is_validated');

	if (clubId) {
		query = query.eq('club_id', clubId);
	}
	if (role) {
		const roles = role.split(',').map(r => r.trim());
		query = query.in('role', roles);
	}

	const { data, error } = await query;

	if (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}

	return NextResponse.json(data ?? []);
}

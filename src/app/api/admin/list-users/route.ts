// import { createAdminClient } from '@/utils/supabase/adminClient';
// import { NextResponse } from 'next/server';

// export async function GET() {
// 	const supabase = createAdminClient();

// 	// 1. Fetch current user
// 	const {
// 		data: { user },
// 	} = await supabase.auth.getUser();
// 	if (!user) {
// 		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// 	}

// 	// 2. Fetch user profile
// 	const { data: profile, error: profileError } = await supabase
// 		.from('users')
// 		.select('role')
// 		.eq('id', user.id)
// 		.maybeSingle();

// 	if (profileError) {
// 		console.error('Error fetching profile', profileError);
// 		return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
// 	}

// 	if (!profile) {
// 		return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
// 	}

// 	// 3. Check admin
// 	if (profile.role !== 'admin') {
// 		return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
// 	}

// 	// 4. Fetch all users
// 	const { data: users, error: usersError } = await supabase
// 		.from('users')
// 		.select('id, full_name, role, club_id, is_validated');

// 	if (usersError) {
// 		console.error('Error fetching users', usersError);
// 		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
// 	}

// 	return NextResponse.json(users ?? []);
// }

import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function GET() {
	const supabase = createAdminClient(); // ✅

	console.log('Supabase client key:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20));

	const { data: users, error } = await supabase.from('users').select('id, full_name, role, club_id, is_validated');

	if (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}

	return NextResponse.json(users ?? []);
}

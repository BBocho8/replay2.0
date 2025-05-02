import { createServerClient } from '@supabase/ssr';
// /app/api/admin/invite-user/route.ts
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: () => {}, // no need to persist any cookies
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const body = await req.json();
	const { name, email, role } = body;

	const { data: profile } = await supabase.from('users').select('club_id, role').eq('id', user.id).maybeSingle();
	if (!profile?.club_id || !['admin', 'coach', 'super_admin'].includes(profile.role)) {
		return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
	}

	// Switch to service role
	const service = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.SUPABASE_SERVICE_ROLE_KEY as string,
		{
			cookies: {
				getAll: () => [],
				setAll: () => {},
			},
		},
	);

	const { data: invited, error: inviteError } = await service.auth.admin.inviteUserByEmail(email);
	if (inviteError || !invited?.user) {
		return NextResponse.json({ error: inviteError?.message || 'Failed to invite' }, { status: 500 });
	}

	const { error: insertError } = await service.from('users').insert({
		id: invited.user.id,
		email,
		full_name: name,
		role,
		club_id: profile.club_id,
		is_validated: false,
	});
	if (insertError) {
		return NextResponse.json({ error: insertError.message }, { status: 500 });
	}

	return NextResponse.json({ success: true });
}

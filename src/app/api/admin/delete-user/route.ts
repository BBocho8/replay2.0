import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { userId } = await req.json();

	if (!userId) {
		return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
	}

	// Step 1: Authenticated requestor (to verify role)
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: () => {},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).maybeSingle();

	if (!profile || !['admin', 'coach', 'super_admin'].includes(profile.role)) {
		return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
	}

	// Step 2: Use service role to delete from auth and db
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

	// Delete from auth.users
	const { error: authError } = await service.auth.admin.deleteUser(userId, false);

	if (authError) {
		return NextResponse.json({ error: `Failed to delete auth user: ${authError.message}` }, { status: 500 });
	}

	// Delete from public.users
	const { error: dbError } = await service.from('users').delete().eq('id', userId);
	if (dbError) {
		return NextResponse.json(
			{ error: `Auth deleted, but failed to remove from users table: ${dbError.message}` },
			{ status: 500 },
		);
	}

	return NextResponse.json({ success: true });
}

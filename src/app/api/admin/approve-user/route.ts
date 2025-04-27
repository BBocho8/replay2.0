import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	const { id } = await req.json();

	if (!id) {
		return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
	}

	const supabase = createAdminClient();
	const { error } = await supabase.from('users').update({ is_validated: true }).eq('id', id);

	if (error) {
		console.error('Error approving user:', error);
		return NextResponse.json({ error: 'Failed to approve user' }, { status: 500 });
	}

	return NextResponse.json({ message: 'User approved' });
}

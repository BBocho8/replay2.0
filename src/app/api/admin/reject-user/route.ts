import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
	const { id } = await req.json();

	if (!id) {
		return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
	}

	const supabase = createAdminClient();

	// 1. Delete profile
	const { error: profileError } = await supabase.from('users').delete().eq('id', id);
	if (profileError) {
		console.error('Error deleting profile:', profileError);
		return NextResponse.json({ error: 'Failed to delete user profile' }, { status: 500 });
	}

	// 2. Delete from auth.users
	const { error: authError } = await supabase.auth.admin.deleteUser(id);
	if (authError) {
		console.error('Error deleting auth user:', authError);
		return NextResponse.json({ error: 'Failed to delete auth user' }, { status: 500 });
	}

	return NextResponse.json({ message: 'User fully rejected and removed' });
}

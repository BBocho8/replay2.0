import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	const { id, is_validated } = await req.json();

	if (!id || typeof is_validated !== 'boolean') {
		return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
	}

	const supabase = createAdminClient();
	const { error } = await supabase.from('users').update({ is_validated }).eq('id', id);

	if (error) {
		console.error('Error updating validation status:', error);
		return NextResponse.json({ error: 'Failed to update validation status' }, { status: 500 });
	}

	return NextResponse.json({ message: 'Validation status updated' });
}

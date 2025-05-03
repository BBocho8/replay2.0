import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	try {
		const body = await req.json();
		const { id, title, description, date, type } = body;

		if (!id) {
			return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
		}

		const supabase = createAdminClient();

		const { error } = await supabase.from('events').update({ title, description, date, type }).eq('id', id);

		if (error) {
			console.error('Error updating event:', error.message);
			return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
		}

		return NextResponse.json({ message: 'Event updated successfully' });
	} catch (error) {
		console.error('Unexpected error:', error);
		return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
	}
}

// File: /app/api/events/create/route.ts

import { createAdminClient } from '@/utils/supabase/adminClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const body = await req.json();
	const supabase = createAdminClient();

	const { title, description, date, type, club_id, created_by, participant_ids = [] } = body;

	// Insert the event
	const { data: event, error } = await supabase
		.from('events')
		.insert({ title, description, date, type, club_id, created_by })
		.select('id')
		.single();

	if (error || !event) {
		console.error('Error creating event:', error);
		return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
	}

	// Insert participants if any
	if (participant_ids.length > 0) {
		const participants = participant_ids.map((user_id: string) => ({ event_id: event.id, user_id }));
		const { error: participantsError } = await supabase.from('event_participants').insert(participants);

		if (participantsError) {
			console.error('Error adding participants:', participantsError);
			return NextResponse.json({ error: 'Event created but failed to add participants' }, { status: 500 });
		}
	}

	return NextResponse.json({ message: 'Event created successfully', eventId: event.id });
}

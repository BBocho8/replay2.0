'use client';

import CreateEventDialog from '@/components/admin/calendar/CreateEventDialog';
import EditEventDialog from '@/components/admin/calendar/EditEventDialog';
import type { Event as EventType, User } from '@/types/supabase/database';
import { createClient } from '@/utils/supabase/supabaseClient';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Paper, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const supabase = createClient();

export default function ManageCalendarPage() {
	const theme = useTheme();
	const [events, setEvents] = useState<any[]>([]);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [clubUsers, setClubUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				if (!user) throw new Error('User not logged in');

				const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).single();
				if (!profile?.club_id) throw new Error('Club not assigned');

				const res = await fetch(`/api/admin/list-users?role=player,coach&club_id=${profile.club_id}`);
				const users = await res.json();
				setClubUsers(users);
			} catch (err) {
				console.error(err);
				toast.error('Failed to load club users');
			}
		};

		fetchUsers();
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error('User not logged in');

			const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).single();
			if (!profile?.club_id) throw new Error('Club not assigned');

			const { data, error } = await supabase
				.from('events')
				.select('id, title, start_time, end_time, description, type, created_by, club_id, created_at')
				.eq('club_id', profile.club_id);

			if (error) throw error;

			const formatted = data.map((e: any) => ({
				id: e.id,
				title: e.title,
				start: e.start_time,
				end: e.end_time,
				backgroundColor:
					e.type === 'training'
						? theme.palette.primary.main
						: e.type === 'match'
							? theme.palette.error.main
							: theme.palette.success.main,
				borderColor: 'transparent',
				textColor: '#fff',
				...e,
			}));
			setEvents(formatted);
		} catch (err) {
			console.error(err);
			toast.error('Failed to load calendar events');
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchEvents();
	}, []);

	return (
		<Box p={6}>
			<Typography color='text.primary' variant='h4' fontWeight='bold' mb={4}>
				Manage Calendar
			</Typography>

			<Paper
				elevation={3}
				sx={{
					p: 2,
					borderRadius: 3,
					backgroundColor: theme.palette.background.paper,
					boxShadow: theme.shadows[4],
				}}
			>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
					initialView='dayGridMonth'
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
					}}
					height='auto'
					events={events}
					nowIndicator
					eventClick={info => {
						const clicked = events.find(e => e.id === info.event.id);
						if (clicked) {
							setSelectedEvent(clicked);
							setEditDialogOpen(true);
						}
					}}
				/>
			</Paper>

			<Fab
				color='primary'
				sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}
				onClick={() => setOpenCreateDialog(true)}
			>
				<AddIcon />
			</Fab>

			<CreateEventDialog
				open={openCreateDialog}
				onClose={() => setOpenCreateDialog(false)}
				onCreated={fetchEvents}
				members={clubUsers}
			/>

			{selectedEvent && (
				<EditEventDialog
					event={selectedEvent}
					open={editDialogOpen}
					onClose={() => setEditDialogOpen(false)}
					onUpdated={fetchEvents}
					members={clubUsers}
				/>
			)}
		</Box>
	);
}

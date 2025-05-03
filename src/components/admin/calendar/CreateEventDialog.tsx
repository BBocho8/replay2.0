'use client';

import type { User } from '@/types/supabase/database';
import { createClient } from '@/utils/supabase/supabaseClient';
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CreateEventDialogProps {
	open: boolean;
	members: User[];

	onClose: () => void;
	onCreated: () => void;
}

export default function CreateEventDialog({ open, onClose, onCreated, members }: CreateEventDialogProps) {
	const supabase = createClient();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
	const [endTime, setEndTime] = useState<Dayjs | null>(dayjs().add(1, 'hour'));
	const [eventType, setEventType] = useState<'training' | 'game' | 'meeting' | 'other'>('training');
	const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const handleTogglePlayer = (playerId: string) => {
		setSelectedPlayers(prev => (prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]));
	};

	const handleSubmit = async () => {
		if (!title || !startTime || !endTime) {
			toast.error('Title and time are required');
			return;
		}

		if (startTime && endTime && endTime.isBefore(startTime)) {
			toast.error('End time must be after start time');
			return;
		}

		setLoading(true);
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error('User not logged in');

			const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).single();
			if (!profile?.club_id) throw new Error('Club ID not found');

			const { data: createdEvent, error: eventError } = await supabase
				.from('events')
				.insert({
					title,
					description,
					start_time: startTime.toISOString(),
					end_time: endTime.toISOString(),
					type: eventType,
					created_by: user.id,
					club_id: profile.club_id,
				})
				.select()
				.single();

			if (eventError || !createdEvent) throw eventError;

			if (selectedPlayers.length > 0) {
				const participantRows = selectedPlayers.map(playerId => ({
					event_id: createdEvent.id,
					user_id: playerId,
					status: 'invited',
				}));

				const { error: participantError } = await supabase.from('event_participants').insert(participantRows);

				if (participantError) throw participantError;
			}

			toast.success('Event created successfully!');
			onCreated();
			onClose();

			// reset
			setTitle('');
			setDescription('');
			setStartTime(dayjs());
			setEndTime(dayjs().add(1, 'hour'));
			setEventType('training');
			setSelectedPlayers([]);
		} catch (error) {
			console.error(error);
			toast.error('Failed to create event');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Create New Event</DialogTitle>
			<DialogContent>
				<Box mt={2} display='flex' flexDirection='column' gap={2}>
					<TextField label='Event Title' value={title} onChange={e => setTitle(e.target.value)} fullWidth required />

					<TextField
						label='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						multiline
						rows={3}
						fullWidth
					/>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							label='Start Time'
							value={startTime}
							onChange={setStartTime}
							ampm={false}
							format='YYYY-MM-DD HH:mm'
						/>
						<DateTimePicker
							label='End Time'
							value={endTime}
							onChange={setEndTime}
							ampm={false}
							format='YYYY-MM-DD HH:mm'
						/>
					</LocalizationProvider>

					<TextField
						select
						label='Event Type'
						value={eventType}
						onChange={e => setEventType(e.target.value as 'training' | 'game' | 'meeting' | 'other')}
						fullWidth
					>
						<MenuItem value='training'>Training</MenuItem>
						<MenuItem value='game'>Game</MenuItem>
						<MenuItem value='meeting'>Meeting</MenuItem>
						<MenuItem value='other'>Other</MenuItem>
					</TextField>

					<Typography fontWeight='medium'>Invite Players</Typography>
					<Box
						display='flex'
						flexDirection='column'
						maxHeight='200px'
						overflow='auto'
						borderRadius={1}
						border='1px solid #ccc'
						p={1}
					>
						{members.map((user: any) => (
							<FormControlLabel
								key={user.id}
								control={
									<Checkbox checked={selectedPlayers.includes(user.id)} onChange={() => handleTogglePlayer(user.id)} />
								}
								label={user.full_name}
							/>
						))}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button variant='contained' onClick={handleSubmit} disabled={loading}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}

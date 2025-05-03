'use client';

import type { EventWithParticipants, User } from '@/types/supabase/database';
import { createClient } from '@/utils/supabase/supabaseClient';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface EditEventDialogProps {
	event: EventWithParticipants;
	onClose: () => void;
	onUpdated: () => void;
	members: User[];
	open: boolean;
}

export default function EditEventDialog({ event, onClose, onUpdated, members, open }: EditEventDialogProps) {
	const supabase = createClient();

	const [title, setTitle] = useState(event.title);
	const [description, setDescription] = useState(event.description ?? '');
	const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(event.start_time));
	const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(event.end_time));
	const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>(event.invited_user_ids ?? []);
	const [loading, setLoading] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function fetchParticipants() {
			const { data, error } = await supabase.from('event_participants').select('user_id').eq('event_id', event.id);

			if (error) {
				console.error('Failed to fetch participants:', error);
				toast.error('Error loading participants');
				return;
			}

			const invitedIds = data.map(p => p.user_id);
			setSelectedPlayerIds(invitedIds);
		}

		if (open && event?.id) {
			fetchParticipants();
			setTitle(event.title);
			setDescription(event.description ?? '');
			setStartTime(dayjs(event.start_time));
			setEndTime(dayjs(event.end_time));
		}
	}, [event, open]);

	useEffect(() => {
		setTitle(event.title);
		setDescription(event.description ?? '');
		setStartTime(dayjs(event.start_time));
		setEndTime(dayjs(event.end_time));
		setSelectedPlayerIds(event.invited_user_ids ?? []);
	}, [event]);

	const handleToggleUser = (id: string) => {
		setSelectedPlayerIds(prev => (prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]));
	};

	const handleUpdate = async () => {
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
			const { error: updateError } = await supabase
				.from('events')
				.update({
					title,
					description,
					start_time: startTime.toISOString(),
					end_time: endTime.toISOString(),
				})
				.eq('id', event.id);

			if (updateError) throw updateError;

			const { error: deleteError } = await supabase.from('event_participants').delete().eq('event_id', event.id);
			if (deleteError) throw deleteError;

			if (selectedPlayerIds.length > 0) {
				const participantRows = selectedPlayerIds.map(id => ({
					event_id: event.id,
					user_id: id,
					status: 'invited',
				}));

				const { error: insertError } = await supabase.from('event_participants').insert(participantRows);
				if (insertError) throw insertError;
			}

			toast.success('Event updated successfully');
			onUpdated();
			onClose();
		} catch (error) {
			console.error(error);
			toast.error('Failed to update event');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Edit Event</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
				<TextField label='Title' value={title} onChange={e => setTitle(e.target.value)} fullWidth required />
				<TextField
					label='Description'
					value={description}
					onChange={e => setDescription(e.target.value)}
					fullWidth
					multiline
					minRows={2}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label='Start Time'
						value={startTime}
						onChange={val => setStartTime(val)}
						ampm={false}
						format='YYYY-MM-DD HH:mm'
					/>
					<DateTimePicker
						label='End Time'
						value={endTime}
						onChange={val => setEndTime(val)}
						ampm={false}
						format='YYYY-MM-DD HH:mm'
					/>
				</LocalizationProvider>
				<Typography fontWeight='medium'>Participants</Typography>
				<FormControl component='fieldset'>
					<FormGroup>
						{members.map((player: User) => (
							<FormControlLabel
								key={player.id}
								control={
									<Checkbox
										checked={selectedPlayerIds.includes(player.id)}
										onChange={() => handleToggleUser(player.id)}
									/>
								}
								label={player.full_name}
							/>
						))}
					</FormGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button onClick={handleUpdate} variant='contained' disabled={loading}>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
}

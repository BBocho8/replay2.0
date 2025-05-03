'use client';

import type { User } from '@/types/supabase/database';
import { Box, Chip, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Participant {
	user: User;
	status: 'invited' | 'accepted' | 'declined';
}

interface EventDetailsModalProps {
	open: boolean;
	onClose: () => void;
	event: {
		title: string;
		description?: string;
		start_time: string;
		end_time: string;
		participants: Participant[];
	};
}

export default function EventDetailsModal({ open, onClose, event }: EventDetailsModalProps) {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>{event.title}</DialogTitle>
			<DialogContent>
				<Typography variant='subtitle2' color='text.secondary'>
					{dayjs(event.start_time).format('YYYY-MM-DD HH:mm')} → {dayjs(event.end_time).format('HH:mm')}
				</Typography>

				{event?.description && (
					<Box mt={2}>
						<Typography variant='body1'>{event.description}</Typography>
					</Box>
				)}

				<Box mt={4}>
					<Typography variant='subtitle1' fontWeight='bold'>
						Participants
					</Typography>
					<List dense>
						{event.participants.length === 0 ? (
							<Typography mt={1} color='text.secondary'>
								No participants yet.
							</Typography>
						) : (
							event.participants.map(p => (
								<ListItem key={p.user.id} disablePadding>
									<ListItemText primary={p.user.full_name} />
									<Chip
										label={p.status.charAt(0).toUpperCase() + p.status.slice(1)}
										color={p.status === 'accepted' ? 'success' : p.status === 'declined' ? 'error' : 'default'}
										size='small'
									/>
								</ListItem>
							))
						)}
					</List>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

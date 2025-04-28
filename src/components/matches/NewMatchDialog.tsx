'use client';

import type dayjs from '@/utils/dayjs';
import { hasTheGameBeenPlayed } from '@/utils/matches/has-game-been-played';
import { createClient } from '@/utils/supabase/supabaseClient';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/de';
import { useState } from 'react';
import { toast } from 'react-toastify';

const supabase = createClient();

interface NewMatchDialogProps {
	open: boolean;
	onClose: () => void;
	onCreated: () => void;
}

export default function NewMatchDialog({ open, onClose, onCreated }: NewMatchDialogProps) {
	const [homeTeam, setHomeTeam] = useState('');
	const [awayTeam, setAwayTeam] = useState('');
	const [date, setDate] = useState<dayjs.Dayjs | null>(null);
	const [homeScore, setHomeScore] = useState<number | ''>('');
	const [awayScore, setAwayScore] = useState<number | ''>('');
	const [loading, setLoading] = useState(false);

	const handleCreate = async () => {
		if (!homeTeam || !awayTeam || !date) {
			toast.error('Please fill in all fields');
			return;
		}

		setLoading(true);

		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error('User not logged in');

			const { data: profile, error: profileError } = await supabase
				.from('users')
				.select('club_id')
				.eq('id', user.id)
				.single();

			if (profileError || !profile?.club_id) {
				throw new Error('Club not found for user');
			}

			const { error } = await supabase.from('matches').insert({
				home_team: homeTeam,
				away_team: awayTeam,
				date: date ? date.utc().format() : null,
				club_id: profile.club_id,
				home_score: homeScore === '' ? null : homeScore,
				away_score: awayScore === '' ? null : awayScore,
			});

			if (error) {
				throw error;
			}

			toast.success('Match created!');
			onCreated();
			onClose();
			setHomeTeam('');
			setAwayTeam('');
			setDate(null);
			setHomeScore('');
			setAwayScore('');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create match');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
			<DialogTitle>Create New Match</DialogTitle>
			<DialogContent>
				<Box mt={2}>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12 }}>
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
								<DateTimePicker
									label='Date'
									value={date}
									onChange={newValue => setDate(newValue)}
									sx={{ width: '100%' }}
								/>
							</LocalizationProvider>
						</Grid>

						<Grid
							size={{
								xs: 12,
								md: 6,
							}}
						>
							<TextField label='Home Team' value={homeTeam} onChange={e => setHomeTeam(e.target.value)} fullWidth />
						</Grid>
						{hasTheGameBeenPlayed(date) && (
							<Grid
								size={{
									xs: 12,
									md: 6,
								}}
							>
								<TextField
									label='Home Score'
									type='number'
									slotProps={{
										htmlInput: {
											min: '0',
											step: '1',
										},
									}}
									aria-valuemin={0}
									value={homeScore}
									onChange={e => setHomeScore(e.target.value === '' ? '' : Number(e.target.value))}
									fullWidth
								/>
							</Grid>
						)}
						<Grid
							size={{
								xs: 12,
								md: 6,
							}}
						>
							<TextField label='Away Team' value={awayTeam} onChange={e => setAwayTeam(e.target.value)} fullWidth />
						</Grid>
						{hasTheGameBeenPlayed(date) && (
							<Grid
								size={{
									xs: 12,
									md: 6,
								}}
							>
								<TextField
									label='Away Score'
									type='number'
									slotProps={{
										htmlInput: {
											min: '0',
											step: '1',
										},
									}}
									value={awayScore}
									onChange={e => setAwayScore(e.target.value === '' ? '' : Number(e.target.value))}
									fullWidth
								/>
							</Grid>
						)}
					</Grid>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button onClick={handleCreate} variant='contained' disabled={loading}>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
}

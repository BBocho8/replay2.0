'use client';

import dayjs from '@/utils/dayjs';
import { hasTheGameBeenPlayed } from '@/utils/matches/has-game-been-played';
import { createClient } from '@/utils/supabase/supabaseClient';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
	TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/de';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const supabase = createClient();

interface EditMatchDialogProps {
	open: boolean;
	onClose: () => void;
	onUpdated: () => void;
	match: {
		id: string;
		home_team: string;
		away_team: string;
		date: string;
		home_score: number | null;
		away_score: number | null;
		competition_id: string | null;
	};
}

export default function EditMatchDialog({ open, onClose, onUpdated, match }: EditMatchDialogProps) {
	const [homeTeam, setHomeTeam] = useState(match.home_team);
	const [awayTeam, setAwayTeam] = useState(match.away_team);
	const [homeScore, setHomeScore] = useState<number | ''>(match.home_score ?? '');
	const [awayScore, setAwayScore] = useState<number | ''>(match.away_score ?? '');
	const [date, setDate] = useState<dayjs.Dayjs | null>(null);
	const [competitionId, setCompetitionId] = useState<string>(match.competition_id ?? '');
	const [competitions, setCompetitions] = useState<{ id: string; name: string }[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (match.date) {
			setDate(dayjs(match.date));
		} else {
			setDate(null);
		}
	}, [match.date]);

	useEffect(() => {
		const fetchCompetitions = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;

			const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).single();

			if (!profile?.club_id) return;

			const { data: club } = await supabase.from('clubs').select('competitions').eq('id', profile.club_id).single();

			if (!club?.competitions?.length) return;

			const { data: competitionList } = await supabase
				.from('competitions')
				.select('id, name')
				.in('id', club.competitions);

			if (competitionList) setCompetitions(competitionList);
		};

		if (open) fetchCompetitions();
	}, [open]);

	const handleUpdate = async () => {
		if (!homeTeam || !awayTeam || !date || !competitionId) {
			toast.error('Please fill in all fields');
			return;
		}

		setLoading(true);

		const { error } = await supabase
			.from('matches')
			.update({
				home_team: homeTeam,
				away_team: awayTeam,
				date: date ? date.format() : null,
				competition_id: competitionId,
				home_score: homeScore === '' ? null : homeScore,
				away_score: awayScore === '' ? null : awayScore,
			})
			.eq('id', match.id);

		setLoading(false);

		if (error) {
			console.error(error);
			toast.error('Failed to update match');
		} else {
			toast.success('Match updated!');
			onUpdated();
			onClose();
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Edit Match</DialogTitle>
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

						<Grid size={{ xs: 12 }}>
							<TextField
								select
								label='Competition'
								value={competitionId}
								onChange={e => setCompetitionId(e.target.value)}
								fullWidth
							>
								{competitions.map(c => (
									<MenuItem key={c.id} value={c.id}>
										{c.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid size={{ xs: 12, md: 6 }}>
							<TextField label='Home Team' value={homeTeam} onChange={e => setHomeTeam(e.target.value)} fullWidth />
						</Grid>

						{hasTheGameBeenPlayed(date) && (
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									label='Home Score'
									type='number'
									value={homeScore}
									onChange={e => setHomeScore(e.target.value === '' ? '' : Number(e.target.value))}
									fullWidth
								/>
							</Grid>
						)}

						<Grid size={{ xs: 12, md: 6 }}>
							<TextField label='Away Team' value={awayTeam} onChange={e => setAwayTeam(e.target.value)} fullWidth />
						</Grid>

						{hasTheGameBeenPlayed(date) && (
							<Grid size={{ xs: 12, md: 6 }}>
								<TextField
									label='Away Score'
									type='number'
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
				<Button onClick={handleUpdate} variant='contained' disabled={loading}>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
}

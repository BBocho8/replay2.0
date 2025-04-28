'use client';

import DeleteMatchDialog from '@/components/matches/DeleteMatchDialog';
import EditMatchDialog from '@/components/matches/EditMatchDialog';
import NewMatchDialog from '@/components/matches/NewMatchDialog';
import { createClient } from '@/utils/supabase/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

const supabase = createClient();

async function fetchMatches() {
	const { data, error } = await supabase
		.from('matches')
		.select('id, home_team, away_team, home_score, away_score, date')
		.order('date', { ascending: true });

	if (error) {
		throw error;
	}

	return data;
}

export default function ManageMatchesPage() {
	const [openNewMatch, setOpenNewMatch] = useState(false);
	const { data: matches, error, isLoading } = useSWR('matches', fetchMatches);
	const [selectedMatch, setSelectedMatch] = useState<any>(null);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
	const { mutate } = useSWRConfig();

	if (isLoading) {
		return (
			<Box p={6} display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		toast.error('Error loading matches');
		return (
			<Box p={6}>
				<Typography color='error'>Error loading matches</Typography>
			</Box>
		);
	}

	return (
		<Box
			p={6}
			sx={{
				minHeight: '100vh',
			}}
		>
			<Typography variant='h4' fontWeight='bold' mb={4}>
				Manage Matches
			</Typography>

			<Button variant='contained' onClick={() => setOpenNewMatch(true)} sx={{ mb: 4 }}>
				Create New Match
			</Button>

			{matches && matches.length > 0 ? (
				<List>
					{matches?.map((match: any) => (
						<ListItem
							key={match.id}
							divider
							secondaryAction={
								<Box sx={{ display: 'flex', gap: 1 }}>
									<IconButton
										edge='end'
										aria-label='edit'
										onClick={() => {
											setSelectedMatch(match);
											setOpenEditDialog(true);
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										edge='end'
										aria-label='delete'
										onClick={() => {
											setSelectedMatchId(match.id);
											setOpenDeleteDialog(true);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							}
						>
							<ListItemText
								primary={`${match.home_team} vs ${match.away_team}`}
								secondary={dayjs(match.date).format('MMM D, YYYY')}
							/>
						</ListItem>
					))}
				</List>
			) : (
				<Typography>No matches found.</Typography>
			)}

			<NewMatchDialog open={openNewMatch} onClose={() => setOpenNewMatch(false)} onCreated={() => mutate('matches')} />

			{selectedMatch && (
				<EditMatchDialog
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					onUpdated={() => {
						mutate('matches');
						setOpenEditDialog(false);
					}}
					match={selectedMatch}
				/>
			)}

			{selectedMatchId && (
				<DeleteMatchDialog
					open={openDeleteDialog}
					onClose={() => setOpenDeleteDialog(false)}
					onDeleted={() => {
						mutate('matches');
						setOpenDeleteDialog(false);
					}}
					matchId={selectedMatchId}
				/>
			)}
		</Box>
	);
}

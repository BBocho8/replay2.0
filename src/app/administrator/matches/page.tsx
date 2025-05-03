'use client';

import AddVideoDialog from '@/components/matches/AddVideoDialog';
import DeleteMatchDialog from '@/components/matches/DeleteMatchDialog';
import EditMatchDialog from '@/components/matches/EditMatchDialog';
import MatchVideoList from '@/components/matches/MatchVideoList';
import NewMatchDialog from '@/components/matches/NewMatchDialog';
import { usePagination } from '@/utils/mui/use-pagination';
import { createClient } from '@/utils/supabase/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

const supabase = createClient();

async function fetchMatches() {
	const { data, error } = await supabase
		.from('matches')
		.select('id, home_team, away_team, home_score, away_score, date, competition_id, competitions(name), club_id')
		.order('date', { ascending: false });

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
	const [openVideoDialog, setOpenVideoDialog] = useState(false);
	const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
	const { mutate } = useSWRConfig();
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

	const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

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

	const filteredMatches =
		matches && matches.length > 0
			? matches
					.filter((match: any) => {
						const query = searchQuery.toLowerCase();
						return match.home_team.toLowerCase().includes(query) || match.away_team.toLowerCase().includes(query);
					})
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			: [];

	return (
		<Box p={6} sx={{ minHeight: '100vh' }}>
			<Typography variant='h4' fontWeight='bold' mb={4}>
				Manage Matches
			</Typography>

			<Button variant='contained' onClick={() => setOpenNewMatch(true)} sx={{ mb: 4 }}>
				Create New Match
			</Button>
			<Box mb={4}>
				<TextField
					label='Search matches'
					variant='outlined'
					fullWidth
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Search by team name...'
				/>
			</Box>

			<Paper>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Home Team</TableCell>
								<TableCell>Away Team</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Score</TableCell>
								<TableCell>Competition</TableCell>
								<TableCell align='right'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredMatches.length > 0 ? (
								filteredMatches.map((match: any) => {
									const isExpanded = expandedMatchId === match.id;

									return (
										<>
											<TableRow key={`${match.id} - Match Row`} hover>
												<TableCell>{match.home_team}</TableCell>
												<TableCell>{match.away_team}</TableCell>
												<TableCell>{dayjs(match?.date).format('MMM D, YYYY HH:mm')}</TableCell>
												<TableCell>
													{match.home_score != null && match.away_score != null
														? `${match.home_score} - ${match.away_score}`
														: 'Not played yet'}
												</TableCell>
												<TableCell>{match?.competitions?.name}</TableCell>
												<TableCell align='right'>
													<Box display='flex' justifyContent='flex-end' gap={1}>
														<IconButton
															onClick={() => setExpandedMatchId(prev => (prev === match.id ? null : match.id))}
														>
															{isExpanded ? <VideoLibraryIcon /> : <VideoLibraryIcon color='action' />}
														</IconButton>
														<IconButton
															onClick={() => {
																setSelectedMatch(match);
																setOpenEditDialog(true);
															}}
														>
															<EditIcon />
														</IconButton>
														<IconButton
															onClick={() => {
																setSelectedMatchId(match.id);
																setOpenDeleteDialog(true);
															}}
														>
															<DeleteIcon />
														</IconButton>
													</Box>
												</TableCell>
											</TableRow>

											{isExpanded && (
												<TableRow>
													<TableCell colSpan={6}>
														<Box p={2}>
															<Typography variant='subtitle1' fontWeight='bold' gutterBottom>
																Videos for {match.home_team} vs {match.away_team}
															</Typography>

															<MatchVideoList matchId={match.id} />

															<Box mt={2} display='flex' justifyContent='end'>
																<AddVideoDialog
																	open={openVideoDialog && selectedMatch?.id === match.id}
																	onClose={() => setOpenVideoDialog(false)}
																	onCreated={() => mutate(`videos-${match.id}`)}
																	matchId={match.id}
																	matchLabel={`${match.home_team} vs ${match.away_team}`}
																/>

																<Button
																	variant='outlined'
																	size='small'
																	onClick={() => {
																		setSelectedMatch(match);
																		setOpenVideoDialog(true);
																	}}
																	sx={{ mt: 1 }}
																>
																	Add Video
																</Button>
															</Box>
														</Box>
													</TableCell>
												</TableRow>
											)}
										</>
									);
								})
							) : (
								<TableRow>
									<TableCell colSpan={6} align='center'>
										<Typography>No matches found.</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component='div'
					count={filteredMatches.length}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					rowsPerPageOptions={[5, 10, 20]}
				/>
			</Paper>

			{/* Dialogs */}
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

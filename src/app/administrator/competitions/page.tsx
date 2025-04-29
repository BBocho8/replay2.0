'use client';

import DeleteCompetitionDialog from '@/components/competitions/DeleteCompetitionDialog';
import EditCompetitionDialog from '@/components/competitions/EditCompetitionDialog';
import NewCompetitionDialog from '@/components/competitions/NewCompetitionDialog';
import { usePagination } from '@/utils/mui/use-pagination';
import { createClient } from '@/utils/supabase/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const supabase = createClient();

async function fetchCompetitions() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('User not logged in');

	const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).maybeSingle();

	if (!profile?.club_id) throw new Error('User has no club assigned');

	const { data: club } = await supabase.from('clubs').select('competitions').eq('id', profile.club_id).maybeSingle();

	if (!club?.competitions || club.competitions.length === 0) return [];

	const { data: competitions } = await supabase.from('competitions').select('id, name').in('id', club.competitions);

	return competitions || [];
}

export default function ManageCompetitionsPage() {
	const [openNewDialog, setOpenNewDialog] = useState(false);
	const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);

	const [searchQuery, setSearchQuery] = useState('');

	const { data: competitions, error, isLoading } = useSWR('competitions', fetchCompetitions);
	const { mutate } = useSWRConfig();

	const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();

	const filtered = competitions?.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];

	return (
		<Box p={6}>
			<Typography variant='h4' fontWeight='bold' mb={4}>
				Manage Competitions
			</Typography>

			<Box mb={4} display='flex' justifyContent='space-between' flexWrap='wrap' gap={2}>
				<TextField
					label='Search competitions'
					variant='outlined'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					sx={{ minWidth: 250 }}
				/>
				<Button variant='contained' onClick={() => setOpenNewDialog(true)}>
					Create New Competition
				</Button>
			</Box>

			{isLoading ? (
				<Box display='flex' justifyContent='center' alignItems='center' minHeight='40vh'>
					<CircularProgress />
				</Box>
			) : error ? (
				<Typography color='error'>Error loading competitions</Typography>
			) : (
				<Paper>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='right'>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filtered.length > 0 ? (
									filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(competition => (
										<TableRow key={competition.id} hover>
											<TableCell>{competition.name}</TableCell>
											<TableCell align='right'>
												<Box display='flex' justifyContent='flex-end' gap={1}>
													<IconButton
														onClick={() => {
															setSelectedCompetition(competition);
															setOpenEditDialog(true);
														}}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														onClick={() => {
															setSelectedCompetitionId(competition.id);
															setOpenDeleteDialog(true);
														}}
													>
														<DeleteIcon />
													</IconButton>
												</Box>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={2} align='center'>
											<Typography>No competitions found</Typography>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						component='div'
						count={filtered.length}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						rowsPerPageOptions={[5, 10, 20]}
					/>
				</Paper>
			)}

			<NewCompetitionDialog
				open={openNewDialog}
				onClose={() => setOpenNewDialog(false)}
				onCreated={() => mutate('competitions')}
			/>

			{selectedCompetition && (
				<EditCompetitionDialog
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					onUpdated={() => {
						mutate('competitions');
						setOpenEditDialog(false);
					}}
					competition={selectedCompetition}
				/>
			)}

			{selectedCompetitionId && (
				<DeleteCompetitionDialog
					open={openDeleteDialog}
					onClose={() => setOpenDeleteDialog(false)}
					onDeleted={() => {
						mutate('competitions');
						setOpenDeleteDialog(false);
					}}
					competitionId={selectedCompetitionId}
				/>
			)}
		</Box>
	);
}

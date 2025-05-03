'use client';

import type { User } from '@/types/supabase/database';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const fetchClubUsers = async () => {
	const res = await fetch('/api/admin/list-users');
	if (!res.ok) throw new Error('Failed to fetch users');
	return res.json();
};

export default function ManagePeoplePage() {
	const { data: users, isLoading, error, mutate } = useSWR<User[]>('club-users', fetchClubUsers);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openInvite, setOpenInvite] = useState(false);
	const [inviteEmail, setInviteEmail] = useState('');
	const [inviteName, setInviteName] = useState('');
	const [inviteRole, setInviteRole] = useState<'player' | 'coach'>('player');

	const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this user?')) return;
		const res = await fetch('/api/admin/delete-user', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userId: id }),
		});
		const data = await res.json();
		if (!res.ok) {
			toast.error(data.error || 'Failed to delete user');
		} else {
			toast.success('User deleted');
			mutate();
		}
	};

	const handleInvite = async () => {
		try {
			const res = await fetch('/api/admin/invite-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: inviteName, email: inviteEmail, role: inviteRole }),
			});
			const data = await res.json();

			if (!res.ok) throw new Error(data.error || 'Failed to invite user');

			toast.success('Invitation sent');
			setOpenInvite(false);
			setInviteEmail('');
			setInviteName('');
			mutate();
		} catch (e: any) {
			toast.error(e.message || 'Failed to invite user');
		}
	};

	const handleToggleValidation = async (user: User) => {
		try {
			const res = await fetch('/api/admin/toggle-user-validation', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: user.id, is_validated: !user.is_validated }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || 'Failed to update validation');
			}

			toast.success('Validation status updated');
			mutate();
		} catch (error: any) {
			console.error('Validation error:', error);
			toast.error(error.message || 'Failed to update validation status');
		}
	};

	const filtered =
		users?.filter(
			u =>
				u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				u.email.toLowerCase().includes(searchQuery.toLowerCase()),
		) || [];

	return (
		<Box p={6}>
			<Typography color='text.primary' variant='h4' fontWeight='bold' mb={4}>
				Manage Players & Coaches
			</Typography>

			<Box mb={4} display='flex' justifyContent='space-between' flexWrap='wrap' gap={2}>
				<TextField
					label='Search users'
					variant='outlined'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					sx={{ minWidth: 250 }}
				/>
				<Button variant='contained' startIcon={<PersonAddIcon />} onClick={() => setOpenInvite(true)}>
					Invite User
				</Button>
			</Box>

			<Dialog open={openInvite} onClose={() => setOpenInvite(false)}>
				<DialogTitle>Invite New User</DialogTitle>
				<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
					<TextField label='Full Name' value={inviteName} onChange={e => setInviteName(e.target.value)} />
					<TextField label='Email' value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
					<FormControl>
						<InputLabel>Role</InputLabel>
						<Select value={inviteRole} onChange={e => setInviteRole(e.target.value as 'player' | 'coach')} label='Role'>
							<MenuItem value='player'>Player</MenuItem>
							<MenuItem value='coach'>Coach</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenInvite(false)}>Cancel</Button>
					<Button onClick={handleInvite} variant='contained'>
						Send Invite
					</Button>
				</DialogActions>
			</Dialog>

			{isLoading ? (
				<Box display='flex' justifyContent='center' alignItems='center' minHeight='40vh'>
					<CircularProgress />
				</Box>
			) : error ? (
				<Typography color='error'>Error loading users</Typography>
			) : (
				<Paper>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Role</TableCell>
									<TableCell>Approved</TableCell>
									<TableCell align='right'>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
									<TableRow key={user.id} hover>
										<TableCell>{user.full_name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.role}</TableCell>
										<TableCell>{user.is_validated ? '✅' : '❌'}</TableCell>
										<TableCell align='right'>
											<Tooltip title={user.is_validated ? 'Revoke' : 'Approve'}>
												<IconButton onClick={() => handleToggleValidation(user)}>
													{user.is_validated ? <CloseIcon /> : <CheckIcon />}
												</IconButton>
											</Tooltip>
											<Tooltip title='Delete user'>
												<IconButton onClick={() => handleDelete(user.id)}>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								))}
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
		</Box>
	);
}

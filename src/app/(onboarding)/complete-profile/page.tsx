'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { Box, Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export default function CompleteProfilePage() {
	const supabase = createClient();
	const router = useRouter();
	const [fullName, setFullName] = useState('');
	const [role, setRole] = useState<'player' | 'coach' | 'admin'>('player');
	const [clubId, setClubId] = useState('');
	const [newClubName, setNewClubName] = useState('');

	const {
		data: clubs,
		error,
		isLoading,
	} = useSWR('clubs', async () => {
		const { data, error } = await supabase.from('clubs').select('id, name').eq('is_validated', true);
		if (error) throw error;
		return data;
	});

	const handleSubmit = async () => {
		try {
			if (!fullName.trim()) {
				toast.error('Full Name is required.');
				return;
			}

			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				toast.error('Failed to fetch user.');
				return;
			}

			let finalClubId = clubId;

			if (role === 'admin') {
				if (!newClubName.trim()) {
					toast.error('Club Name is required for Admin.');
					return;
				}

				const { data: createdClub, error: clubError } = await supabase
					.from('clubs')
					.insert({ name: newClubName, is_validated: true })
					.select('id')
					.single();

				if (clubError || !createdClub) {
					console.error(clubError);
					toast.error('Failed to create club.');
					return;
				}

				finalClubId = createdClub.id;
			}

			await supabase.from('users').insert({
				id: user.id,
				full_name: fullName,
				role,
				email: user.email,
				club_id: finalClubId || null,
				is_validated: role === 'admin',
			});

			toast.success('Profile completed successfully!');
			router.push(`${role === 'admin' ? '/administrator' : '/pending-approval'}`);
		} catch (error) {
			console.error(error);
			toast.error('Failed to complete profile.');
		}
	};

	if (isLoading) return <Typography>Loading...</Typography>;
	if (error) return <Typography color='error'>Failed to load clubs.</Typography>;

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}
		>
			<Container maxWidth='sm'>
				<Box
					sx={{
						p: 4,
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: 3,
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
					}}
				>
					<Typography variant='h5' fontWeight='bold' align='center'>
						Complete Your Profile
					</Typography>

					<TextField label='Full Name' fullWidth value={fullName} onChange={e => setFullName(e.target.value)} />

					<Select
						value={role}
						onChange={e => {
							setRole(e.target.value as 'player' | 'coach' | 'admin');
							setClubId('');
							setNewClubName('');
						}}
						fullWidth
					>
						<MenuItem value='player'>Player</MenuItem>
						<MenuItem value='coach'>Coach</MenuItem>
						<MenuItem value='admin'>Admin</MenuItem>
					</Select>

					{role === 'admin' ? (
						<TextField
							label='New Club Name'
							fullWidth
							value={newClubName}
							onChange={e => setNewClubName(e.target.value)}
						/>
					) : (
						<Select value={clubId} onChange={e => setClubId(e.target.value)} fullWidth displayEmpty>
							<MenuItem value=''>Select Your Club</MenuItem>
							{clubs?.map(club => (
								<MenuItem key={club.id} value={club.id}>
									{club.name}
								</MenuItem>
							))}
						</Select>
					)}

					<Button variant='contained' onClick={handleSubmit} fullWidth>
						Complete Profile
					</Button>
				</Box>
			</Container>
		</Box>
	);
}

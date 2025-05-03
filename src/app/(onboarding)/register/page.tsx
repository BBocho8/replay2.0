'use client';

import type { Club } from '@/types/supabase/database';
import { register } from '@/utils/supabase/auth';
import { fetcher } from '@/utils/supabase/fetcher';
import { Box, Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<'player' | 'coach' | 'admin'>('player');
	const [clubId, setClubId] = useState('');
	const [newClubName, setNewClubName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: clubs, error, isLoading } = useSWR('clubs', fetcher);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			await register(email, password);
			toast.success('Registration successful! Please check your email for confirmation.');
			router.push('/confirm-email');
		} catch (error) {
			console.error(error);
			toast.error('Registration failed. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<Box minHeight='100vh' display='flex' justifyContent='center' alignItems='center' bgcolor='background.default'>
				<Typography variant='h6'>Loading clubs...</Typography>
			</Box>
		);
	}

	if (error) {
		return (
			<Box minHeight='100vh' display='flex' justifyContent='center' alignItems='center' bgcolor='background.default'>
				<Typography variant='h6' color='error'>
					Failed to load clubs. Try refreshing.
				</Typography>
			</Box>
		);
	}

	return (
		<Box minHeight='100vh' display='flex' justifyContent='center' alignItems='center' bgcolor='background.default'>
			<Container maxWidth='sm'>
				<Box bgcolor='background.paper' p={4} borderRadius={2} boxShadow={3}>
					<Typography variant='h5' fontWeight='bold' textAlign='center' mb={4}>
						Create an Account
					</Typography>

					<Select
						fullWidth
						value={role}
						onChange={e => setRole(e.target.value as 'player' | 'coach' | 'admin')}
						sx={{ mb: 3 }}
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
							sx={{ mb: 3 }}
						/>
					) : (
						<Select fullWidth value={clubId} onChange={e => setClubId(e.target.value)} displayEmpty sx={{ mb: 3 }}>
							<MenuItem value=''>Select your Club</MenuItem>
							{clubs
								?.filter((club: Club) => club.is_validated)
								.map((club: Club) => (
									<MenuItem key={club.id} value={club.id}>
										{club.name}
									</MenuItem>
								))}
						</Select>
					)}

					<TextField label='Email' fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 3 }} />
					<TextField
						label='Password'
						type='password'
						fullWidth
						value={password}
						onChange={e => setPassword(e.target.value)}
						onKeyUp={e => e.key === 'Enter' && handleSubmit()}
						sx={{ mb: 3 }}
					/>

					<Button
						variant='contained'
						color='success'
						fullWidth
						onClick={handleSubmit}
						disabled={isSubmitting}
						sx={{ mb: 2 }}
					>
						{isSubmitting ? 'Registering...' : 'Register'}
					</Button>

					<Typography variant='body2' textAlign='center'>
						Already have an account?{' '}
						<Button
							variant='text'
							size='small'
							onClick={() => router.push('/login')}
							sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}
						>
							Login
						</Button>
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}

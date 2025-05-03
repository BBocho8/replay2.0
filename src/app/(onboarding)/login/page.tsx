'use client';

import { signIn } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/supabaseClient';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const supabase = createClient();

	const handleSubmit = async () => {
		try {
			await signIn(email, password);
			toast.success('Login successful!');

			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				window.location.href = '/administrator/dashboard';
			} else {
				toast.error('Session not established, please try again.');
			}
		} catch (error) {
			console.error(error);
			toast.error('Login failed. Please check your credentials.');
		}
	};

	return (
		<Box
			minHeight='100vh'
			display='flex'
			alignItems='center'
			justifyContent='center'
			sx={{ bgcolor: 'background.default', color: 'text.primary' }}
		>
			<Container maxWidth='sm'>
				<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
					<Typography variant='h4' fontWeight='bold' align='center' gutterBottom>
						Login
					</Typography>

					<Box component='form' onSubmit={e => e.preventDefault()}>
						<TextField
							fullWidth
							label='Email'
							type='email'
							variant='outlined'
							margin='normal'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>

						<TextField
							fullWidth
							label='Password'
							type='password'
							variant='outlined'
							margin='normal'
							value={password}
							onChange={e => setPassword(e.target.value)}
							onKeyUp={e => e.key === 'Enter' && handleSubmit()}
						/>

						<Button fullWidth variant='contained' sx={{ mt: 2 }} onClick={handleSubmit}>
							Login
						</Button>

						<Typography variant='body2' align='center' sx={{ mt: 3 }}>
							Don&apos;t have an account?{' '}
							<Button
								variant='text'
								size='small'
								onClick={() => router.push('/register')}
								sx={{ textTransform: 'none', color: 'primary.main' }}
							>
								Create one
							</Button>
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}

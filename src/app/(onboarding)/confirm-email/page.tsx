'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function ConfirmEmailPage() {
	return (
		<Box
			minHeight='100vh'
			display='flex'
			alignItems='center'
			justifyContent='center'
			sx={{ bgcolor: 'background.default', color: 'text.primary' }}
		>
			<Container maxWidth='sm' sx={{ textAlign: 'center', p: 4 }}>
				<Typography variant='h4' fontWeight='bold' color='primary' gutterBottom>
					Confirm Your Email
				</Typography>

				<Typography variant='body1' sx={{ mb: 4 }}>
					We&apos;ve sent you a confirmation link. Please check your email inbox and confirm your email address to
					continue.
				</Typography>

				<Button variant='contained' component={Link} href='/login'>
					Back to Login
				</Button>
			</Container>
		</Box>
	);
}

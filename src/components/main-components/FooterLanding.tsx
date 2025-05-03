'use client';

import { Box, Container, Typography } from '@mui/material';

export default function FooterLanding() {
	return (
		<Box component='footer' sx={{ py: 4, textAlign: 'center', bgcolor: 'background.paper' }}>
			<Container maxWidth='md'>
				<Typography variant='body2' color='text.secondary'>
					&copy; {new Date().getFullYear()} Match Replay. All rights reserved.
				</Typography>
			</Container>
		</Box>
	);
}

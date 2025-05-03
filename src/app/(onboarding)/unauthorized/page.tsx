'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function UnauthorizedPage() {
	return (
		<Box
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			sx={{ bgcolor: 'background.default', px: 2 }}
		>
			<Typography variant='h3' color='error.main' gutterBottom>
				Unauthorized Access
			</Typography>
			<Typography variant='body1' color='text.secondary' textAlign='center' mb={4}>
				You do not have permission to view this page.
			</Typography>
			<Button component={Link} href='/' variant='contained' color='primary'>
				Go back Home
			</Button>
		</Box>
	);
}

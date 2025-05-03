'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function PendingApprovalPage() {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				px: 2,
			}}
		>
			<Container maxWidth='sm'>
				<Box
					sx={{
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: 3,
						p: 4,
						textAlign: 'center',
					}}
				>
					<Typography variant='h4' fontWeight='bold' gutterBottom color='warning.main'>
						Waiting for Approval
					</Typography>

					<Typography variant='body1' mb={4} color='text.secondary'>
						Your account has been created successfully. An administrator will review and validate your account soon.
					</Typography>

					<Button component={Link} href='/' variant='contained' color='success'>
						Return Home
					</Button>
				</Box>
			</Container>
		</Box>
	);
}

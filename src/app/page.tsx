'use client';

import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';

export default function LandingPage() {
	return (
		<>
			<Box
				sx={{
					minHeight: '90vh',
					bgcolor: 'background.default',
					display: 'flex',
					alignItems: 'center',
					py: 10,
				}}
			>
				<Container>
					<Grid container spacing={4} alignItems='center'>
						<Grid
							size={{
								xs: 12,
								md: 6,
							}}
						>
							<Typography variant='h2' component='h1' gutterBottom>
								Replay Every Match. Connect Every Player.
							</Typography>
							<Typography variant='body1' color='text.secondary' paragraph>
								A powerful platform for football clubs to manage match videos, fines, calendar events, and more. Empower
								your team, save time, and keep everything in one place.
							</Typography>
							<Button component={Link} href='/register' variant='contained' color='primary' size='large'>
								Get Started
							</Button>
						</Grid>
						<Grid
							size={{
								xs: 12,
								md: 6,
							}}
						>
							{/* You can place an image or illustration here */}
							<Box
								sx={{
									width: '100%',
									height: 300,
									bgcolor: 'grey.300',
									borderRadius: 2,
								}}
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Box sx={{ py: 10, bgcolor: 'background.paper' }}>
				<Container>
					<Typography variant='h4' textAlign='center' gutterBottom>
						Key Features
					</Typography>
					<Grid container spacing={4} mt={4}>
						<Grid
							size={{
								xs: 12,
								md: 4,
							}}
						>
							<Typography variant='h6'>Video Management</Typography>
							<Typography variant='body2' color='text.secondary'>
								Upload and organize match footage for full games, halves, and highlights. Review, relive, and improve.
							</Typography>
						</Grid>
						<Grid
							size={{
								xs: 12,
								md: 4,
							}}
						>
							<Typography variant='h6'>Fines System</Typography>
							<Typography variant='body2' color='text.secondary'>
								Set fine templates, assign fines to players, and even enable payment via Stripe integration.
							</Typography>
						</Grid>
						<Grid
							size={{
								xs: 12,
								md: 4,
							}}
						>
							<Typography variant='h6'>Club Calendar</Typography>
							<Typography variant='body2' color='text.secondary'>
								Keep track of matches, trainings, and club events with an intuitive shared calendar.
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

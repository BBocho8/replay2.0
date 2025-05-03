'use client';

import { Analytics, CalendarMonth, Groups, Payment, Security, VideoLibrary } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function LandingPage() {
	return (
		<>
			{/* Hero Section */}
			<Box
				sx={{
					minHeight: '90vh',
					bgcolor: 'background.default',
					display: 'flex',
					alignItems: 'center',
					py: 10,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Container>
					<Grid container spacing={4} alignItems='center'>
						<Grid size={{ xs: 12, md: 6 }}>
							<Typography variant='h2' component='h1' gutterBottom sx={{ fontWeight: 700 }}>
								Replay Every Match. Connect Every Player.
							</Typography>
							<Typography variant='h5' color='text.secondary' paragraph>
								The all-in-one platform for modern football clubs. Streamline operations, enhance team performance, and
								build a stronger community.
							</Typography>
							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
								<Button component={Link} href='/register' variant='contained' color='primary' size='large'>
									Get Started Free
								</Button>
								<Button component={Link} href='/about' variant='outlined' color='primary' size='large'>
									Learn More
								</Button>
							</Stack>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box
								sx={{
									width: '100%',
									height: 400,
									bgcolor: 'grey.300',
									borderRadius: 2,
									position: 'relative',
									overflow: 'hidden',
									'&::before': {
										content: '""',
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
									},
								}}
							/>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Features Section */}
			<Box sx={{ py: 10, bgcolor: 'background.paper' }}>
				<Container>
					<Typography variant='h3' textAlign='center' gutterBottom sx={{ fontWeight: 700 }}>
						Everything Your Club Needs
					</Typography>
					<Typography variant='h6' color='text.secondary' textAlign='center' maxWidth='md' mx='auto' mb={6}>
						From match analysis to team management, we've got you covered with powerful tools designed for modern
						football clubs.
					</Typography>
					<Grid container spacing={4}>
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
								<CardContent>
									<Stack direction='row' alignItems='center' spacing={2} mb={2}>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<VideoLibrary />
										</Avatar>
										<Typography variant='h5'>Video Management</Typography>
									</Stack>
									<Typography variant='body1' color='text.secondary'>
										Upload and organize match footage for full games, halves, and highlights. Review, relive, and
										improve your team's performance with advanced analysis tools.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
								<CardContent>
									<Stack direction='row' alignItems='center' spacing={2} mb={2}>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<Payment />
										</Avatar>
										<Typography variant='h5'>Smart Fines System</Typography>
									</Stack>
									<Typography variant='body1' color='text.secondary'>
										Set customizable fine templates, assign them in seconds, and collect payments via Stripe.
										Transparency and accountability built in.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
								<CardContent>
									<Stack direction='row' alignItems='center' spacing={2} mb={2}>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<CalendarMonth />
										</Avatar>
										<Typography variant='h5'>Club Calendar</Typography>
									</Stack>
									<Typography variant='body1' color='text.secondary'>
										Stay organized with a shared calendar. Plan matches, trainings, and events with real-time
										participation tracking and automated reminders.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
								<CardContent>
									<Stack direction='row' alignItems='center' spacing={2} mb={2}>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<Analytics />
										</Avatar>
										<Typography variant='h5'>Performance Analytics</Typography>
									</Stack>
									<Typography variant='body1' color='text.secondary'>
										Track player and team performance with detailed statistics and insights. Make data-driven decisions
										to improve your team's results.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
								<CardContent>
									<Stack direction='row' alignItems='center' spacing={2} mb={2}>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<Groups />
										</Avatar>
										<Typography variant='h5'>Team Management</Typography>
									</Stack>
									<Typography variant='body1' color='text.secondary'>
										Manage player rosters, track attendance, and handle team communications all in one place. Keep
										everyone informed and engaged.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
								<CardContent>
									<Stack direction='row' alignItems='center' spacing={2} mb={2}>
										<Avatar sx={{ bgcolor: 'primary.main' }}>
											<Security />
										</Avatar>
										<Typography variant='h5'>Secure Platform</Typography>
									</Stack>
									<Typography variant='body1' color='text.secondary'>
										Enterprise-grade security to protect your team's data. Regular backups and privacy compliance ensure
										your information is always safe.
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Testimonials Section */}
			<Box sx={{ py: 10, bgcolor: 'background.default' }}>
				<Container>
					<Typography variant='h3' textAlign='center' gutterBottom sx={{ fontWeight: 700 }}>
						Trusted by Football Clubs
					</Typography>
					<Typography variant='h6' color='text.secondary' textAlign='center' maxWidth='md' mx='auto' mb={6}>
						Join hundreds of clubs who have transformed their operations with Match Replay
					</Typography>
					<Grid container spacing={4}>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant='body1' color='text.secondary' paragraph>
										"Match Replay has revolutionized how we manage our club. The video analysis tools have helped us
										improve our game significantly."
									</Typography>
									<Stack direction='row' spacing={2} alignItems='center'>
										<Avatar />
										<Box>
											<Typography variant='subtitle1'>John Smith</Typography>
											<Typography variant='body2' color='text.secondary'>
												Manager, FC United
											</Typography>
										</Box>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant='body1' color='text.secondary' paragraph>
										"The fines system has made our lives so much easier. No more chasing payments or keeping track of
										spreadsheets."
									</Typography>
									<Stack direction='row' spacing={2} alignItems='center'>
										<Avatar />
										<Box>
											<Typography variant='subtitle1'>Sarah Johnson</Typography>
											<Typography variant='body2' color='text.secondary'>
												Treasurer, City FC
											</Typography>
										</Box>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Card sx={{ height: '100%' }}>
								<CardContent>
									<Typography variant='body1' color='text.secondary' paragraph>
										"Finally, a platform that understands what grassroots football clubs need. The calendar feature
										alone has saved us countless hours."
									</Typography>
									<Stack direction='row' spacing={2} alignItems='center'>
										<Avatar />
										<Box>
											<Typography variant='subtitle1'>Mike Brown</Typography>
											<Typography variant='body2' color='text.secondary'>
												Coach, Athletic FC
											</Typography>
										</Box>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* CTA Section */}
			<Box sx={{ py: 10, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
				<Container>
					<Grid container spacing={4} alignItems='center'>
						<Grid size={{ xs: 12, md: 8 }}>
							<Typography variant='h3' gutterBottom sx={{ fontWeight: 700 }}>
								Ready to Transform Your Club?
							</Typography>
							<Typography variant='h6' paragraph>
								Join the growing community of football clubs using Match Replay to streamline their operations and
								enhance team performance.
							</Typography>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Stack direction='column' spacing={2}>
								<Button component={Link} href='/register' variant='contained' color='secondary' size='large' fullWidth>
									Start Free Trial
								</Button>
								<Button component={Link} href='/about' variant='outlined' color='inherit' size='large' fullWidth>
									Learn More
								</Button>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

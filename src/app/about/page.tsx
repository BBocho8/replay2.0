'use client';

import { Analytics, Groups, Security, SportsSoccer } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material';

export default function AboutPage() {
	return (
		<Box sx={{ py: 10 }}>
			<Container>
				<Typography variant='h3' gutterBottom>
					About Match Replay
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					Match Replay is a modern platform designed to help football clubs streamline team operations. Built by a team
					of footballers and developers, it bridges the gap between sport and technology — giving local clubs powerful
					tools usually reserved for professionals.
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					From organizing match footage to managing player fines, scheduling training, and keeping the team informed,
					Match Replay does it all in one unified system.
				</Typography>

				<Divider sx={{ my: 6 }} />

				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<Typography variant='h5' gutterBottom>
							Why We Built It
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							After years of playing in amateur and semi-pro leagues, we noticed how disorganized clubs could be —
							WhatsApp groups, random spreadsheets, and missing footage were the norm. We built Match Replay to bring
							order and professionalism to grassroots football.
						</Typography>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<Typography variant='h5' gutterBottom>
							Our Mission
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							We want to empower every football club — regardless of size or budget — with the tools they need to
							operate efficiently, stay organized, and focus on what matters most: playing great football.
						</Typography>
					</Grid>
				</Grid>

				<Divider sx={{ my: 6 }} />

				<Typography variant='h4' gutterBottom>
					Key Features
				</Typography>
				<Grid container spacing={4} sx={{ mt: 2 }}>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Card sx={{ height: '100%' }}>
							<CardContent>
								<Stack direction='row' alignItems='center' spacing={2} mb={2}>
									<Avatar sx={{ bgcolor: 'primary.main' }}>
										<SportsSoccer />
									</Avatar>
									<Typography variant='h6'>Match Analysis</Typography>
								</Stack>
								<Typography variant='body2' color='text.secondary'>
									Advanced video analysis tools to break down matches, track player performance, and identify areas for
									improvement.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Card sx={{ height: '100%' }}>
							<CardContent>
								<Stack direction='row' alignItems='center' spacing={2} mb={2}>
									<Avatar sx={{ bgcolor: 'primary.main' }}>
										<Groups />
									</Avatar>
									<Typography variant='h6'>Team Management</Typography>
								</Stack>
								<Typography variant='body2' color='text.secondary'>
									Comprehensive tools for managing player rosters, training schedules, and team communications.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Card sx={{ height: '100%' }}>
							<CardContent>
								<Stack direction='row' alignItems='center' spacing={2} mb={2}>
									<Avatar sx={{ bgcolor: 'primary.main' }}>
										<Analytics />
									</Avatar>
									<Typography variant='h6'>Performance Analytics</Typography>
								</Stack>
								<Typography variant='body2' color='text.secondary'>
									Data-driven insights to track team progress, player development, and tactical effectiveness.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={{ xs: 12, sm: 6, md: 3 }}>
						<Card sx={{ height: '100%' }}>
							<CardContent>
								<Stack direction='row' alignItems='center' spacing={2} mb={2}>
									<Avatar sx={{ bgcolor: 'primary.main' }}>
										<Security />
									</Avatar>
									<Typography variant='h6'>Secure Platform</Typography>
								</Stack>
								<Typography variant='body2' color='text.secondary'>
									Enterprise-grade security to protect your team's data and ensure privacy compliance.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Divider sx={{ my: 6 }} />

				<Typography variant='h4' gutterBottom>
					Our Technology
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					Built with cutting-edge technology, Match Replay leverages modern web frameworks and cloud infrastructure to
					deliver a seamless experience. Our platform is built on:
				</Typography>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid size={{ xs: 12, md: 4 }}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Frontend
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									React, Next.js, Material-UI, and TypeScript for a responsive and intuitive user interface.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Backend
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Node.js, Express, and PostgreSQL for robust and scalable server-side operations.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid size={{ xs: 12, md: 4 }}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Infrastructure
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									AWS cloud services, Docker containers, and CI/CD pipelines for reliable deployment.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Divider sx={{ my: 6 }} />

				<Typography variant='h4' gutterBottom>
					Join Our Community
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					We're constantly evolving based on feedback from our community of clubs. Join us in revolutionizing grassroots
					football management and be part of a growing network of forward-thinking teams.
				</Typography>
			</Container>
		</Box>
	);
}

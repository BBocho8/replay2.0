'use client';

import { Analytics, Groups, Security, SportsSoccer } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material';

export default function AboutPage() {
	return (
		<Box sx={{ py: 10 }}>
			<Container>
				{/* Header */}
				<Typography variant='h3' gutterBottom textAlign='center' fontWeight={700}>
					About Match Replay
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph textAlign='center' maxWidth='md' mx='auto'>
					Match Replay is a modern platform designed to help football clubs streamline team operations...
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph textAlign='center' maxWidth='md' mx='auto'>
					From organizing match footage to managing player fines, scheduling training, and keeping the team informed,
					Match Replay does it all in one unified system.
				</Typography>

				<Divider sx={{ my: 6 }} />

				{/* Mission and Why */}
				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<Typography variant='h4' gutterBottom fontWeight={600}>
							Why We Built It
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							After years of playing in amateur and semi-pro leagues, we noticed how disorganized clubs could be —
							WhatsApp groups, random spreadsheets, and missing footage were the norm. We built Match Replay to bring
							order and professionalism to grassroots football.
						</Typography>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<Typography variant='h4' gutterBottom fontWeight={600}>
							Our Mission
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							We want to empower every football club — regardless of size or budget — with the tools they need to
							operate efficiently, stay organized, and focus on what matters most: playing great football.
						</Typography>
					</Grid>
				</Grid>

				<Divider sx={{ my: 6 }} />

				{/* Key Features */}
				<Box sx={{ bgcolor: 'background.paper', py: 8 }}>
					<Typography variant='h4' gutterBottom fontWeight={700} textAlign='center'>
						Key Features
					</Typography>
					<Grid container spacing={4} sx={{ mt: 2 }}>
						{[
							{
								icon: <SportsSoccer />,
								title: 'Match Analysis',
								desc: 'Advanced video analysis tools to break down matches, track player performance, and identify areas for improvement.',
							},
							{
								icon: <Groups />,
								title: 'Team Management',
								desc: 'Comprehensive tools for managing player rosters, training schedules, and team communications.',
							},
							{
								icon: <Analytics />,
								title: 'Performance Analytics',
								desc: 'Data-driven insights to track team progress, player development, and tactical effectiveness.',
							},
							{
								icon: <Security />,
								title: 'Secure Platform',
								desc: "Enterprise-grade security to protect your team's data and ensure privacy compliance.",
							},
						].map(feat => (
							<Grid
								size={{
									xs: 12,
									sm: 6,
									md: 3,
								}}
								key={feat.title}
							>
								<Card
									sx={{
										height: '100%',
										transition: 'all 0.3s ease',
										'&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
										borderRadius: 2,
									}}
								>
									<CardContent>
										<Stack direction='row' alignItems='center' spacing={2} mb={2}>
											<Avatar sx={{ bgcolor: 'primary.main' }}>{feat.icon}</Avatar>
											<Typography variant='h6'>{feat.title}</Typography>
										</Stack>
										<Typography variant='body2' color='text.secondary'>
											{feat.desc}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>

				<Divider sx={{ my: 6 }} />

				{/* Tech Stack */}
				<Typography variant='h4' gutterBottom fontWeight={700}>
					Our Technology
				</Typography>
				<Typography variant='body1' color='text.secondary' paragraph>
					Built with cutting-edge technology, Match Replay leverages modern web frameworks and cloud infrastructure to
					deliver a seamless experience. Our platform is built on:
				</Typography>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid size={{ xs: 12, md: 4 }}>
						<Card sx={{ borderRadius: 2, boxShadow: 3 }}>
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
						<Card sx={{ borderRadius: 2, boxShadow: 3 }}>
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
						<Card sx={{ borderRadius: 2, boxShadow: 3 }}>
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

				{/* Final CTA */}
				<Box
					sx={{ py: 10, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center', borderRadius: 2 }}
				>
					<Container>
						<Typography variant='h4' gutterBottom fontWeight={700}>
							Join Our Community
						</Typography>
						<Typography variant='h6' maxWidth='sm' mx='auto' mb={4}>
							Be part of the grassroots football revolution. Your feedback helps shape the future of Match Replay.
						</Typography>
						<Stack direction='row' justifyContent='center' spacing={2}>
							<Button variant='contained' color='secondary' size='large' href='/register'>
								Get Started
							</Button>
							<Button variant='outlined' color='inherit' size='large' href='/contact'>
								Contact Us
							</Button>
						</Stack>
					</Container>
				</Box>
			</Container>
		</Box>
	);
}

'use client';

import { Analytics, CalendarMonth, Groups, Payment, Security, VideoLibrary } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const fadeInUp = {
	hidden: { opacity: 0, y: 40 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.15 },
	}),
};

export default function LandingPage() {
	return (
		<>
			{/* Hero Section */}
			<MotionBox
				initial='hidden'
				animate='visible'
				variants={fadeInUp}
				custom={0}
				sx={{
					minHeight: '90vh',
					backgroundImage: 'url(/images/hero-bg.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					py: 10,
					position: 'relative',
					textAlign: 'center',
					'&::before': {
						content: '""',
						position: 'absolute',
						inset: 0,
						bgcolor: 'rgba(0, 0, 0, 0.6)', // Enable overlay
						zIndex: 1,
					},
				}}
			>
				<Container sx={{ position: 'relative', zIndex: 2 }}>
					<Typography
						variant='h2'
						component='h1'
						gutterBottom
						fontWeight={700}
						sx={{
							color: 'white',
							textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
						}}
					>
						Replay Every Match. Connect Every Player.
					</Typography>
					<Typography
						variant='h5'
						sx={{
							color: 'white',
							mb: 4,
							textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
						}}
					>
						All-in-one platform for football clubs. Manage matches, track players, collect fines — from anywhere.
					</Typography>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='center'>
						<Button component={Link} href='/register' variant='contained' color='primary' size='large'>
							Get Started Free
						</Button>
						<Button
							component={Link}
							href='/about'
							variant='outlined'
							color='primary'
							size='large'
							sx={{ color: 'white', borderColor: 'white' }}
						>
							Learn More
						</Button>
					</Stack>
				</Container>
			</MotionBox>

			{/* Features Section */}
			<Box sx={{ py: 10, bgcolor: 'background.paper' }}>
				<Container>
					<Typography variant='h3' textAlign='center' gutterBottom fontWeight={700}>
						Everything Your Club Needs
					</Typography>
					<Typography variant='h6' color='text.secondary' textAlign='center' maxWidth='md' mx='auto' mb={6}>
						From match analysis to internal communication, Match Replay helps your club perform better on and off the
						pitch.
					</Typography>
					<Grid container spacing={4}>
						{[
							{
								icon: <VideoLibrary />,
								title: 'Video Management',
								desc: 'Upload and organize footage — by match, half, or highlight.',
							},
							{
								icon: <Payment />,
								title: 'Smart Fines',
								desc: 'Assign fines easily and let players pay directly online.',
							},
							{
								icon: <CalendarMonth />,
								title: 'Shared Calendar',
								desc: 'Plan trainings, matches, and events — with RSVP tracking.',
							},
							{
								icon: <Analytics />,
								title: 'Stats & Insights',
								desc: "Follow your squad's data: attendance, goals, and more.",
							},
							{
								icon: <Groups />,
								title: 'Roster Control',
								desc: 'Add coaches and players to roles. Keep everything updated.',
							},
							{
								icon: <Security />,
								title: 'Secure & Reliable',
								desc: 'Data is encrypted and backed up — peace of mind built in.',
							},
						].map((feat, idx) => (
							<MotionGrid
								size={{ xs: 12, sm: 6, md: 4 }}
								key={feat.title}
								initial='hidden'
								animate='visible'
								variants={fadeInUp}
								custom={idx}
							>
								<Card
									sx={{ height: '100%', p: 2, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}
								>
									<CardContent>
										<Stack direction='row' spacing={2} alignItems='center' mb={2}>
											<Avatar sx={{ bgcolor: 'primary.main' }}>{feat.icon}</Avatar>
											<Typography variant='h6'>{feat.title}</Typography>
										</Stack>
										<Typography color='text.secondary'>{feat.desc}</Typography>
									</CardContent>
								</Card>
							</MotionGrid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Call to Action */}
			<Box sx={{ py: 10, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
				<Container>
					<Grid container spacing={4} alignItems='center'>
						<Grid size={{ xs: 12, md: 8 }}>
							<Typography variant='h3' gutterBottom fontWeight={700}>
								Ready to Join the Replay Revolution?
							</Typography>
							<Typography variant='h6'>Sign up now and give your club the digital tools it deserves.</Typography>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Stack spacing={2}>
								<Button component={Link} href='/register' variant='contained' color='secondary' size='large'>
									Start Now
								</Button>
								<Button component={Link} href='/contact' variant='outlined' color='inherit' size='large'>
									Contact Us
								</Button>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

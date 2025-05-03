'use client';

import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Box, Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';

export default function FooterLanding() {
	return (
		<Box
			component='footer'
			sx={{
				py: 8,
				bgcolor: 'background.paper',
				borderTop: '1px solid',
				borderColor: 'divider',
				mt: 'auto',
			}}
		>
			<Container maxWidth='lg'>
				<Grid container spacing={6}>
					{/* About Section */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={2}>
							<Typography
								variant='h6'
								color='text.primary'
								sx={{
									fontWeight: 700,
									mb: 1,
								}}
							>
								About Us
							</Typography>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{
									lineHeight: 1.8,
									maxWidth: '90%',
								}}
							>
								Match Replay is dedicated to providing the best platform for sharing and analyzing game replays. Join us
								to relive your favorite moments and enhance your team's performance.
							</Typography>
						</Stack>
					</Grid>

					{/* Navigation Links */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={2}>
							<Typography
								variant='h6'
								color='text.primary'
								sx={{
									fontWeight: 700,
									mb: 1,
								}}
							>
								Quick Links
							</Typography>
							<Stack spacing={1}>
								<Link
									href='/about'
									color='text.secondary'
									underline='none'
									sx={{
										'&:hover': {
											color: 'primary.main',
											transform: 'translateX(4px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									About
								</Link>
								<Link
									href='/contact'
									color='text.secondary'
									underline='none'
									sx={{
										'&:hover': {
											color: 'primary.main',
											transform: 'translateX(4px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									Contact
								</Link>
								<Link
									href='/privacy'
									color='text.secondary'
									underline='none'
									sx={{
										'&:hover': {
											color: 'primary.main',
											transform: 'translateX(4px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									Privacy Policy
								</Link>
								<Link
									href='/terms'
									color='text.secondary'
									underline='none'
									sx={{
										'&:hover': {
											color: 'primary.main',
											transform: 'translateX(4px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									Terms of Service
								</Link>
							</Stack>
						</Stack>
					</Grid>

					{/* Social Media Links */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={2}>
							<Typography
								variant='h6'
								color='text.primary'
								sx={{
									fontWeight: 700,
									mb: 1,
								}}
							>
								Connect With Us
							</Typography>
							<Stack direction='row' spacing={2}>
								<IconButton
									href='https://facebook.com'
									target='_blank'
									aria-label='Facebook'
									sx={{
										bgcolor: 'primary.main',
										color: 'primary.contrastText',
										'&:hover': {
											bgcolor: 'primary.dark',
											transform: 'translateY(-2px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									<Facebook />
								</IconButton>
								<IconButton
									href='https://twitter.com'
									target='_blank'
									aria-label='Twitter'
									sx={{
										bgcolor: 'primary.main',
										color: 'primary.contrastText',
										'&:hover': {
											bgcolor: 'primary.dark',
											transform: 'translateY(-2px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									<Twitter />
								</IconButton>
								<IconButton
									href='https://linkedin.com'
									target='_blank'
									aria-label='LinkedIn'
									sx={{
										bgcolor: 'primary.main',
										color: 'primary.contrastText',
										'&:hover': {
											bgcolor: 'primary.dark',
											transform: 'translateY(-2px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									<LinkedIn />
								</IconButton>
								<IconButton
									href='https://instagram.com'
									target='_blank'
									aria-label='Instagram'
									sx={{
										bgcolor: 'primary.main',
										color: 'primary.contrastText',
										'&:hover': {
											bgcolor: 'primary.dark',
											transform: 'translateY(-2px)',
											transition: 'all 0.2s ease',
										},
									}}
								>
									<Instagram />
								</IconButton>
							</Stack>
						</Stack>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }} />

				{/* Copyright Section */}
				<Box sx={{ textAlign: 'center' }}>
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{
							opacity: 0.8,
							fontSize: '0.875rem',
						}}
					>
						&copy; {new Date().getFullYear()} Match Replay. All rights reserved.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
}

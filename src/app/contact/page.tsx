'use client';

import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

export default function ContactPage() {
	return (
		<Box sx={{ py: 10, bgcolor: 'background.paper' }}>
			<Container maxWidth='md'>
				<Typography variant='h4' gutterBottom textAlign='center'>
					Get in Touch
				</Typography>
				<Typography variant='body1' color='text.secondary' textAlign='center' mb={4}>
					Have a question, feedback, or want to collaborate? We'd love to hear from you.
				</Typography>

				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<Typography variant='h6' gutterBottom>
							Contact Information
						</Typography>
						<Typography variant='body2' color='text.secondary' mb={1}>
							📍 Address: 123 Football Lane, Koblenz, Germany
						</Typography>
						<Typography variant='body2' color='text.secondary' mb={1}>
							📧 Email: support@matchreplay.app
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							📞 Phone: +49 123 456 789
						</Typography>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<Typography variant='h6' gutterBottom>
							Send Us a Message
						</Typography>
						<form>
							<Grid container spacing={2}>
								<Grid size={{ xs: 12 }}>
									<TextField label='Your Name' fullWidth required />
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField label='Email Address' type='email' fullWidth required />
								</Grid>
								<Grid size={{ xs: 12 }}>
									<TextField label='Message' multiline rows={4} fullWidth required />
								</Grid>
								<Grid size={{ xs: 12 }}>
									<Button type='submit' variant='contained' fullWidth>
										Send Message
									</Button>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

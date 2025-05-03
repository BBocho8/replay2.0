'use client';

import { Box, Button, Container, Grid, TextField, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function ContactPage() {
	const theme = useTheme();
	return (
		<Box sx={{ py: 10, bgcolor: 'background.paper' }}>
			<Container maxWidth='md'>
				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
					<Typography variant='h3' gutterBottom textAlign='center' fontWeight={700}>
						Get in Touch
					</Typography>
					<Typography variant='body1' color='text.secondary' textAlign='center' mb={4}>
						Have a question, feedback, or want to collaborate? We'd love to hear from you.
					</Typography>
				</motion.div>

				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
						>
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
						</motion.div>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
						>
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
						</motion.div>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

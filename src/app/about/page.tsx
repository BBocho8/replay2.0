'use client';

import { Box, Container, Typography } from '@mui/material';

export default function AboutPage() {
	return (
		<Box sx={{ py: 10 }}>
			<Container>
				<Typography variant='h3' gutterBottom>
					About Match Replay
				</Typography>
				<Typography variant='body1' color='text.secondary' component={'p'}>
					Match Replay was built by passionate footballers and developers who wanted a better way for local clubs to
					manage their teams. From match footage organization to internal discipline systems and planning events — our
					platform gives your club structure and clarity.
				</Typography>
				<Typography variant='body1' color='text.secondary'>
					Whether you're a coach, a player, or a club administrator, Match Replay helps you collaborate better and focus
					on the game.
				</Typography>
			</Container>
		</Box>
	);
}

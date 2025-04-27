'use client';

import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import games from '@/utils/tempData';
import GamesContainer from './GamesContainer';

const theme = createTheme({
	palette: { primary: { main: '#15A34A' } },
});

const competitions = ['Bezirksliga', 'Kreisfreundschaftsspiele', 'Rheinlandpokal'];
const ROWS_PER_PAGE = 10;

const Replay = () => {
	const [selectedCompetition, setSelectedCompetition] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);

	const filteredGames = useMemo(() => {
		if (!games) return [];
		return selectedCompetition === 'all' ? games : games.filter(game => game.competition === selectedCompetition);
	}, [selectedCompetition]);

	const totalPages = Math.ceil(filteredGames.length / ROWS_PER_PAGE);
	const paginatedGames = useMemo(
		() => filteredGames.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE),
		[filteredGames, currentPage],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCompetition]);

	return (
		<section>
			<div className='flex overflow-auto whitespace-nowrap no-scrollbar items-center justify-start md:justify-center gap-2 mt-4 pb-2 px-2 md:mt-0 md:px-0 md:pb-0'>
				{competitions.map(comp => (
					<button
						key={comp}
						onClick={() => setSelectedCompetition(comp)}
						className={`btn ${selectedCompetition === comp ? 'bg-black' : ''}`}
						type='button'
					>
						{comp}
					</button>
				))}
				<button
					className={`btn ${selectedCompetition === 'all' ? 'bg-black' : ''}`}
					onClick={() => setSelectedCompetition('all')}
					type='button'
				>
					ALL GAMES
				</button>
			</div>

			<div className='grid items-center justify-center grid-cols-1 md:px-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2'>
				{paginatedGames.map(game => (
					<GamesContainer key={`${game._id}-ReplayComponent`} {...game} />
				))}
			</div>

			<ThemeProvider theme={theme}>
				<Pagination
					sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
					count={totalPages}
					color='primary'
					page={currentPage}
					onChange={(_, value) => setCurrentPage(value)}
				/>
			</ThemeProvider>
		</section>
	);
};

export default Replay;

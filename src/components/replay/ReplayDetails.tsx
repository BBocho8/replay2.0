import type { Game } from '@/utils/tempData';
import { useState } from 'react';
import GameHeader from './GameHeader';
import GamePartsButtons from './GamePartsButtons';
import GameResult from './GameResult';

type GamePart =
	| 'firstHalf1'
	| 'firstHalf2'
	| 'firstHalf3'
	| 'secondHalf1'
	| 'secondHalf2'
	| 'secondHalf3'
	| 'fullGame'
	| '';

type ReplayDetailsProps = {
	game: Game;
};

const ReplayDetails = ({ game }: ReplayDetailsProps) => {
	const [gamePart, setGamePart] = useState<GamePart>('');

	const {
		isVideoAvailable,
		competition,
		homeTeam,
		awayTeam,
		homeScore,
		awayScore,
		date,
		firstHalf1,
		firstHalf2,
		firstHalf3,
		secondHalf1,
		secondHalf2,
		secondHalf3,
		fullGame,
	} = game;

	const gameLinks: Record<GamePart, string | undefined> = {
		firstHalf1,
		firstHalf2,
		firstHalf3,
		secondHalf1,
		secondHalf2,
		secondHalf3,
		fullGame,
		'': undefined,
	};

	const availableParts = (Object.keys(gameLinks) as GamePart[]).filter(part => gameLinks[part]);

	return (
		<div className='flex flex-col items-center mx-auto my-4'>
			<GameHeader homeTeam={homeTeam} awayTeam={awayTeam} competition={competition} date={date} />
			<GamePartsButtons availableParts={availableParts} selectedPart={gamePart} onSelectPart={setGamePart} />
			{!isVideoAvailable && <p className='text-blue-800'>Game video is not yet available</p>}
			{gamePart && gameLinks[gamePart] && (
				<iframe
					src={gameLinks[gamePart]}
					allowFullScreen
					className='w-4/5 h-auto my-2 aspect-video'
					title='Game Replay'
				/>
			)}
			<GameResult homeTeam={homeTeam} awayTeam={awayTeam} homeScore={homeScore} awayScore={awayScore} />
		</div>
	);
};

export default ReplayDetails;

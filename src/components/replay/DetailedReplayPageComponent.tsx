'use client';

import ReplayDetails from '@/components/replay/ReplayDetails';
import games, { type Game } from '@/utils/tempData';
import { useParams } from 'next/navigation';

const DetailedReplayComponent = () => {
	const { gameID } = useParams();

	const targetGame = games?.find(game => game._id === gameID);

	if (!targetGame) return <p className='text-gray-500'>Game not found.</p>;

	return <ReplayDetails game={targetGame as Game} />;
};

export default DetailedReplayComponent;

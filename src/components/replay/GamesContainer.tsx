import type { Game } from '@/utils/tempData';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.png';
import gameImg from '../../../public/team.jpg';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDate';
import getYoutubeID from '../../utils/getYoutubeID';

const GamesContainer = ({
	_id: id,
	isVideoAvailable,
	competition,
	homeTeam,
	awayTeam,
	date,
	firstHalf1,
	fullGame,
}: Partial<Game>) => {
	// Check if the video is available and get the thumbnail
	const videoThumbnail = getYoutubeID(firstHalf1) || getYoutubeID(fullGame);

	return (
		<div className='pt-2 pb-0 md:pt-4 md:pb-4 mx-auto'>
			<div className='md:max-w-sm'>
				<Link href={`/replay/${id}`}>
					<Image
						src={isVideoAvailable && videoThumbnail ? videoThumbnail : gameImg}
						alt={`${homeTeam} ${awayTeam} ${competition}`}
						width={1080}
						height={720}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority
						style={{ height: '225px', objectFit: 'cover', objectPosition: isVideoAvailable ? 'cover' : 'bottom' }}
					/>
					<div className='flex flex-col my-2 md:my-4'>
						<div className='flex items-center justify-start px-4 gap-x-3'>
							<Image src={logo} alt='SGE logo' className='aspect-square w-8 h-8' width={36} height={36} />
							<div className='flex flex-col gap-y-0.5 mb-2'>
								<p
									className='text-lg font-medium leading-6 tracking-tighter line-clamp-1'
									title={`${homeTeam} vs ${awayTeam} - ${competition}`}
								>
									{homeTeam} vs {awayTeam} - <span>{competition}</span>
								</p>
								<p className='font-light text-md'>
									{getFormattedDate(date as string)} - <span>{getFormattedTime(date as string)}</span>
								</p>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default GamesContainer;

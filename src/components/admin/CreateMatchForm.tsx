'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreateMatchForm() {
	const supabase = createClient();
	const [homeTeam, setHomeTeam] = useState('');
	const [awayTeam, setAwayTeam] = useState('');
	const [date, setDate] = useState('');
	const [competition, setCompetition] = useState('Bezirksliga');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { error } = await supabase.from('matches').insert({
				home_team: homeTeam,
				away_team: awayTeam,
				date: date,
				competition: competition,
				is_video_available: false, // Default to false for now
			});

			if (error) throw error;

			toast.success('Match created successfully!');
			// Reset form
			setHomeTeam('');
			setAwayTeam('');
			setDate('');
			setCompetition('Bezirksliga');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create match.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
			<h2 className='text-2xl font-bold mb-6 text-center'>Create New Match</h2>

			<input
				type='text'
				placeholder='Home Team'
				value={homeTeam}
				onChange={e => setHomeTeam(e.target.value)}
				className='w-full p-2 mb-4 border rounded'
			/>

			<input
				type='text'
				placeholder='Away Team'
				value={awayTeam}
				onChange={e => setAwayTeam(e.target.value)}
				className='w-full p-2 mb-4 border rounded'
			/>

			<input
				type='date'
				value={date}
				onChange={e => setDate(e.target.value)}
				className='w-full p-2 mb-4 border rounded'
			/>

			<select
				value={competition}
				onChange={e => setCompetition(e.target.value)}
				className='w-full p-2 mb-6 border rounded'
			>
				<option value='Bezirksliga'>Bezirksliga</option>
				<option value='Rheinlandpokal'>Rheinlandpokal</option>
				<option value='Kreisfreundschaftsspiele'>Kreisfreundschaftsspiele</option>
			</select>

			<button
				type='submit'
				className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
				disabled={loading}
			>
				{loading ? 'Creating...' : 'Create Match'}
			</button>
		</form>
	);
}

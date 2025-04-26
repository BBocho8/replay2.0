'use client';

import { useState } from 'react';

export default function CreateMatchForm() {
	const [homeTeam, setHomeTeam] = useState('');
	const [awayTeam, setAwayTeam] = useState('');
	const [date, setDate] = useState('');
	const [competition, setCompetition] = useState('Bezirksliga');

	const handleSubmit = async () => {
		// Tomorrow: Insert match into Supabase here
		console.log({ homeTeam, awayTeam, date, competition });
	};

	return (
		<form
			className='space-y-4'
			onSubmit={e => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<input
				type='text'
				className='w-full border p-2 rounded'
				placeholder='Home Team'
				value={homeTeam}
				onChange={e => setHomeTeam(e.target.value)}
			/>
			<input
				type='text'
				className='w-full border p-2 rounded'
				placeholder='Away Team'
				value={awayTeam}
				onChange={e => setAwayTeam(e.target.value)}
			/>
			<input type='date' className='w-full border p-2 rounded' value={date} onChange={e => setDate(e.target.value)} />
			<select className='w-full border p-2 rounded' value={competition} onChange={e => setCompetition(e.target.value)}>
				<option value='Bezirksliga'>Bezirksliga</option>
				<option value='Rheinlandpokal'>Rheinlandpokal</option>
				<option value='Kreisfreundschaftsspiele'>Kreisfreundschaftsspiele</option>
			</select>

			<button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'>
				Create Match
			</button>
		</form>
	);
}

'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AddVideoDialogProps {
	open: boolean;
	onClose: () => void;
	onCreated: () => void;
	matchId: string;
	matchLabel?: string;
}

const predefinedTypes = ['Full Match', 'First Half', 'Second Half', 'Other'] as const;
type VideoType = (typeof predefinedTypes)[number];

export function getYoutubeVideoId(url: string): string | null {
	const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
	return match ? match[1] : null;
}

export default function AddVideoDialog({ open, onClose, onCreated, matchId }: AddVideoDialogProps) {
	const supabase = createClient();

	const [url, setUrl] = useState('');
	const [videoType, setVideoType] = useState<VideoType>('Full Match');
	const [customLabel, setCustomLabel] = useState('');
	const [partNumber, setPartNumber] = useState<number>(1);
	const [loading, setLoading] = useState(false);

	const videoId = getYoutubeVideoId(url);

	// Fetch part number based on selected video type
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchPartNumber = async () => {
			if (!matchId || videoType === 'Other') return;

			const { data, error } = await supabase
				.from('videos')
				.select('id')
				.eq('match_id', matchId)
				.ilike('label', `${videoType} - Part %`);

			if (!error && data) {
				setPartNumber(data.length + 1);
			} else {
				console.error(error);
				setPartNumber(1);
			}
		};

		fetchPartNumber();
	}, [matchId, open, videoType]);

	const getFinalLabel = () => {
		if (videoType === 'Other') {
			return customLabel.trim() || `Video ${partNumber}`;
		}
		return `${videoType} - Part ${partNumber}`;
	};

	const handleCreate = async () => {
		if (!url.trim()) {
			toast.error('URL cannot be empty');
			return;
		}

		const label = getFinalLabel();

		if (videoType === 'Other' && !customLabel.trim()) {
			toast.error('Please provide a custom label for "Other"');
			return;
		}

		setLoading(true);
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error('User not logged in');

			const { data: profile } = await supabase.from('users').select('club_id').eq('id', user.id).single();
			if (!profile?.club_id) throw new Error('Club not assigned');

			// Check for existing label
			const { data: existing } = await supabase.from('videos').select('id').eq('match_id', matchId).eq('label', label);

			if (existing && existing.length > 0) {
				toast.error(`A video with label "${label}" already exists for this match.`);
				setLoading(false);
				return;
			}

			const { error } = await supabase.from('videos').insert({
				match_id: matchId,
				url: url.trim(),
				label,
				created_by: user.id,
				club_id: profile.club_id,
			});

			if (error) throw error;

			toast.success('Video added successfully!');
			onCreated();
			onClose();
			setUrl('');
			setCustomLabel('');
			setVideoType('Full Match');
		} catch (e: any) {
			console.error(e);
			toast.error('Failed to add video');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>Add Video to Match</DialogTitle>
			<DialogContent>
				<Box mt={2} display='flex' flexDirection='column' gap={2}>
					{videoType !== 'Other' && <Typography variant='body2'>Next Video Number: {partNumber}</Typography>}

					<TextField
						select
						label='Video Type'
						value={videoType}
						onChange={e => setVideoType(e.target.value as VideoType)}
						helperText='Choose a predefined type or "Other" for a custom label.'
						fullWidth
					>
						{predefinedTypes.map(type => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</TextField>

					{videoType === 'Other' && (
						<TextField
							label='Custom Label'
							value={customLabel}
							onChange={e => setCustomLabel(e.target.value)}
							helperText='Enter a custom label for the video (e.g., "Highlights", "Press Conference").'
							fullWidth
							required
						/>
					)}

					<TextField
						label='YouTube URL'
						value={url}
						onChange={e => setUrl(e.target.value)}
						helperText='Paste the full YouTube URL. Thumbnail preview will appear if valid.'
						fullWidth
						required
					/>

					{videoId && (
						<Box mt={2} textAlign='center'>
							<img
								src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
								alt='Video thumbnail'
								style={{ maxWidth: '100%', borderRadius: 8 }}
							/>
							<Typography variant='caption' display='block'>
								Thumbnail preview
							</Typography>
						</Box>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancel
				</Button>
				<Button onClick={handleCreate} variant='contained' disabled={loading}>
					Add Video
				</Button>
			</DialogActions>
		</Dialog>
	);
}

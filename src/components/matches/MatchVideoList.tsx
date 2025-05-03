'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { getYoutubeVideoId } from './AddVideoDialog';

const supabase = createClient();

async function fetchVideosForMatch(matchId: string) {
	const { data, error } = await supabase
		.from('videos')
		.select('id, label, url, created_at')
		.eq('match_id', matchId)
		.order('created_at', { ascending: true });

	if (error) throw error;
	return data;
}

export default function MatchVideoList({ matchId }: { matchId: string }) {
	const { data: videos, error, isLoading, mutate } = useSWR(`videos-${matchId}`, () => fetchVideosForMatch(matchId));
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

	const [editingId, setEditingId] = useState<string | null>(null);
	const [editedData, setEditedData] = useState<{ label: string; url: string }>({
		label: '',
		url: '',
	});

	const handleDelete = async () => {
		if (!videoToDelete) return;
		const { error } = await supabase.from('videos').delete().eq('id', videoToDelete);
		if (error) {
			toast.error('Failed to delete video');
		} else {
			toast.success('Video deleted');
			mutate();
		}
		setConfirmOpen(false);
		setVideoToDelete(null);
	};

	const handleSave = async (videoId: string) => {
		const trimmedLabel = editedData.label.trim();
		const trimmedUrl = editedData.url.trim();

		if (!trimmedLabel || !trimmedUrl) {
			toast.error('Label and URL cannot be empty');
			return;
		}

		const { error } = await supabase.from('videos').update({ label: trimmedLabel, url: trimmedUrl }).eq('id', videoId);

		if (error) {
			toast.error('Failed to update video');
		} else {
			toast.success('Video updated');
			setEditingId(null);
			mutate();
		}
	};

	const startEdit = (video: any) => {
		setEditingId(video.id);
		setEditedData({ label: video.label, url: video.url });
	};

	if (isLoading) return <Typography>Loading videos...</Typography>;
	if (error) return <Typography color='error'>Failed to load videos.</Typography>;
	if (!videos || videos.length === 0) return <Typography>No videos yet.</Typography>;

	return (
		<>
			<List>
				{videos.map((video: any) => {
					const isEditing = editingId === video.id;

					return (
						<ListItem
							key={video.id}
							divider
							alignItems='flex-start'
							secondaryAction={
								<Box display='flex' alignItems='center' gap={1}>
									{isEditing ? (
										<>
											<IconButton onClick={() => handleSave(video.id)}>
												<Tooltip title='Save'>
													<SaveIcon />
												</Tooltip>
											</IconButton>
											<IconButton
												onClick={() => {
													setEditingId(null);
													setEditedData({ label: '', url: '' });
												}}
											>
												<Tooltip title='Cancel'>
													<CloseIcon />
												</Tooltip>
											</IconButton>
										</>
									) : (
										<IconButton onClick={() => startEdit(video)}>
											<Tooltip title='Edit'>
												<EditIcon />
											</Tooltip>
										</IconButton>
									)}
									<IconButton
										onClick={() => {
											setVideoToDelete(video.id);
											setConfirmOpen(true);
										}}
									>
										<Tooltip title='Delete'>
											<DeleteIcon />
										</Tooltip>
									</IconButton>
								</Box>
							}
						>
							{isEditing ? (
								<Box width='100%' display='flex' flexDirection='column' gap={1}>
									<TextField
										label='Label'
										value={editedData.label}
										onChange={e => setEditedData(prev => ({ ...prev, label: e.target.value }))}
										fullWidth
										size='small'
									/>
									<TextField
										label='YouTube URL'
										value={editedData.url}
										onChange={e => setEditedData(prev => ({ ...prev, url: e.target.value }))}
										fullWidth
										size='small'
									/>
								</Box>
							) : (
								<Box display='flex' alignItems='center' gap={2}>
									<img
										src={`https://img.youtube.com/vi/${getYoutubeVideoId(video.url)}/default.jpg`}
										alt='Thumbnail'
										width={100}
										style={{ borderRadius: 4 }}
									/>
									<ListItemText
										primary={video.label}
										secondary={
											<a href={video.url} target='_blank' rel='noopener noreferrer'>
												{video.url}
											</a>
										}
									/>
								</Box>
							)}
						</ListItem>
					);
				})}
			</List>
			<Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this video? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
					<Button onClick={handleDelete} color='error' variant='contained'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

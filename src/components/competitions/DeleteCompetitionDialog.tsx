'use client';

import { createClient } from '@/utils/supabase/supabaseClient';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const supabase = createClient();

export default function DeleteCompetitionDialog({
	open,
	onClose,
	onDeleted,
	competitionId,
}: {
	open: boolean;
	onClose: () => void;
	onDeleted: () => void;
	competitionId: string;
}) {
	const handleDelete = async () => {
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();
		if (userError || !user) return toast.error('User not authenticated');

		const { data: profile, error: profileError } = await supabase
			.from('users')
			.select('club_id')
			.eq('id', user.id)
			.maybeSingle();
		if (profileError || !profile?.club_id) return toast.error('Club not assigned');

		const { error: removeError } = await supabase.rpc('remove_competition_from_club', {
			club_id_input: profile.club_id,
			competition_id_input: competitionId,
		});
		if (removeError) return toast.error('Failed to remove competition from club');

		const { error: deleteError } = await supabase.from('competitions').delete().eq('id', competitionId);
		if (deleteError) return toast.error('Failed to delete competition');

		toast.success('Competition removed and deleted!');
		onDeleted();
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
			<DialogTitle>Delete Competition</DialogTitle>
			<DialogContent>
				<Typography>Are you sure you want to delete this competition?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleDelete} variant='contained' color='error'>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

import dayjs from 'dayjs';

export const hasTheGameBeenPlayed = (date: dayjs.Dayjs | null) => {
	if (!date) return false;

	const matchTime = dayjs(date).add(2, 'hour');
	return matchTime.isBefore(dayjs());
};

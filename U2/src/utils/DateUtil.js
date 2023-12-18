import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInMonths,
	differenceInSeconds,
	differenceInWeeks,
	differenceInYears,
	format,
	isDate,
	isValid,
} from 'date-fns';
import { sortBy } from 'lodash';

export const getDatesBetween = (startDate, endDate) => {
	const dates = [];
	const currentDate = new Date(startDate);
	const lastDate = new Date(endDate);
	while (currentDate < lastDate) {
		dates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}
	dates.push(lastDate);
	return dates;
};

export const getDatesBetweenLimit = (startDate, endDate, limit = 7) => {
	const dates = [];
	const fisrtDate = new Date(startDate);
	const lastDate = new Date(endDate);
	let count = 0;

	while (fisrtDate <= lastDate && count < limit / 2) {
		dates.push(new Date(fisrtDate));
		count++;
		fisrtDate.setDate(fisrtDate.getDate() + 1);
	}

	while (lastDate >= fisrtDate && count < limit) {
		dates.push(new Date(lastDate));
		count++;
		lastDate.setDate(lastDate.getDate() - 1);
	}

	return sortBy(dates);
};

export function formatToString(d, fm = 'yyyy-MM-dd') {
	let date = isDate(d) ? d : new Date(d);
	return isValid(date) ? format(date, fm) : null;
}

export function omitToString(d) {
	let result = '';
	if (!!d) {
		let date = isDate(d) ? d : new Date(d);

		if (isValid(date)) {
			const now = new Date();
			const diff = differenceInSeconds(now, date);

			if (diff <= 0) result = '방금';
			else if (diff < 60) result = `${diff}초 전`;
			else if (differenceInMinutes(now, date) < 60)
				result = `${differenceInMinutes(now, date)}분 전`;
			else if (differenceInHours(now, date) < 24)
				result = `${differenceInHours(now, date)}시간 전`;
			else if (differenceInDays(now, date) < 7) result = `${differenceInDays(now, date)}일 전`;
			else if (differenceInWeeks(now, date) < 5) result = `${differenceInWeeks(now, date)}주 전`;
			else if (differenceInMonths(now, date) < 12)
				result = `${differenceInMonths(now, date)}달 전`;
			else result = `${differenceInYears(now, date)}년 전`;
		} else result = '?';
	}
	return result;
}

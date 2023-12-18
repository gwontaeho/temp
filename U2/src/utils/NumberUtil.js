import { round } from 'lodash';

export function calculateRatio(value, total, precision = 0) {
	return value ? round((value / total) * 100, precision) : 0;
}

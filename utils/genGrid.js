import { CELLS } from '../constant';
import { sumBy } from 'lodash';

const generateGrid = (players) => {
	const charsAll = [];

	if (players.length) {
		const sum = sumBy(players, ({ count }) => count);
		const chars = players.map(({ count }) => (CELLS.count / 100) * (count / (sum / 100)));
		const charsRounded = chars.map((i) => Math.floor(i) + 1);

		while (charsRounded.reduce((all, i) => all + i) !== CELLS.count) {
			const max = charsRounded.indexOf(Math.max(...charsRounded));
			charsRounded[max] -= 1;
		}
		for (const p in charsRounded) {
			for (let i = 0; i < charsRounded[p]; i++) {
				charsAll.push(p);
			}
		}
	}

	return charsAll;
}

export default generateGrid;
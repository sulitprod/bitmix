import { CELLS } from '../constant';

const generateGrid = (players) => {
	const charsAll = [];

	if (!players.length) {
		for (let i = 0; i < CELLS.count; i++) {
			charsAll.push(0);
		}
	} else {
		const sum = players.reduce((all, { count }) => all + count, 0);
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
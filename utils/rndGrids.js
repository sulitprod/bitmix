import { shuffle } from 'lodash';
import { genGrid } from '.';
import { CELLS, TIMES } from '../constant';

const randomGrids = (players, id) => {
	const grid = genGrid(players);
	const grids = [];
	const gridCenter = (CELLS.count - 1) / 2;
	const loopCount = TIMES.domination[2] * 2;

	for (let i = 0; i < loopCount; i++) grids.push(shuffle(grid));

	const lastGrid = grids[loopCount - 1];

	for (const r of lastGrid) {
		if (lastGrid[r] === id) {
			lastGrid[r] = lastGrid[gridCenter];
			lastGrid[gridCenter] = id;
			break;
		}
	}

	return grids.map((arr) => arr.join(':'));
}

export default randomGrids;
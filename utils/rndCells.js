import { shuffle } from 'underscore';
import { CELLS, TIMES } from '../constant';

const randomCells = (cells, winner) => {
	const { player } = winner;
	const newCells = [];
	const gridCenter = (CELLS.count - 1) / 2;
	const loopCount = TIMES.domination[2] * 2;

	for (let i = 0; i < loopCount; i++) newCells.push(shuffle(cells.split(':')));

	const lastArray = newCells[loopCount - 1];

	for (const r in lastArray) 
		if (lastArray[r] === player) {
			lastArray[r] = lastArray[gridCenter];
			break;
		}

	lastArray[gridCenter] = player;

	return newCells.map((arr) => arr.join(':'));
}

export default randomCells;
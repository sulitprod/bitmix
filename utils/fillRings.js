import { CELLS } from '../constant';

const { count, fullSize: [ cols, rows ] } = CELLS;

const addRing = (keys, colored, rings) => {
	const newKeys = [];

	for (const key of keys) {
		if (newKeys.indexOf(key + 1) === -1 && colored.indexOf(key + 1) === -1 && key + 1 < count) newKeys.push(key + 1);
		if (newKeys.indexOf(key - 1) === -1 && colored.indexOf(key - 1) === -1 && key - 1 >= 0) newKeys.push(key - 1);
		if (newKeys.indexOf(key + rows) === -1 && colored.indexOf(key + rows) === -1 && key + rows < count) newKeys.push(key + rows);
		if (newKeys.indexOf(key - rows) === -1 && colored.indexOf(key - rows) === -1 && key - rows >= 0) newKeys.push(key - rows);
	}
	if (newKeys.length) {
		colored = [...colored, ...newKeys];
		rings = addRing(newKeys, colored, rings);
	}

	return [...rings, keys];
}
const fillRingsStages = () => {
	const start = (count - 1) / 2;
	const rings = [];

	return addRing([start], [start], rings).reverse();
}

export default fillRingsStages;
import { CELLS_COUNT } from '../constant';

const addRing = (array, keys, verticalLen, colored, rings) => {
	const newKeys = [];

	for (const key of keys) {
		array[key] = "0";
		if (newKeys.indexOf(key + 1) === -1 && colored.indexOf(key + 1) === -1 && key + 1 < array.length) newKeys.push(key + 1);
		if (newKeys.indexOf(key - 1) === -1 && colored.indexOf(key - 1) === -1 && key - 1 >= 0) newKeys.push(key - 1);
		if (newKeys.indexOf(key + verticalLen) === -1 && colored.indexOf(key + verticalLen) === -1 && key + verticalLen < array.length) newKeys.push(key + verticalLen);
		if (newKeys.indexOf(key - verticalLen) === -1 && colored.indexOf(key - verticalLen) === -1 && key - verticalLen >= 0) newKeys.push(key - verticalLen);
	}
	if (newKeys.length) {
		colored = [...colored, ...newKeys];
		rings = addRing(array, newKeys, verticalLen, colored, rings);
	}

	return [...rings, keys];
}
const fillRings = (array) => {
	const start = (CELLS_COUNT - 1) / 2;
	const verticalLen = 13;
	const rings = [];

	return addRing(array.slice(0), [start], verticalLen, [start], rings).reverse();
}

export default fillRings;
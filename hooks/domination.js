import firebase from 'firebase/app';
import hash from 'md5';
import rs from 'randomstring';
import random from 'random';
import 'firebase/firestore';
import { genGrid, rndColor, shuffleArr } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { CELLS_COUNT } from '../constant';

export const addBits = async (playerId, count, domination) => {
	let newPlayer = null;
	const sum = domination.players.reduce((all, { count }) => all + count, 0);
	const packages = { 0: sum * 10 + 1, 1: (sum + count) * 10 };

	for (const player of domination.players) if (player.id === playerId) newPlayer = player;
	if (!newPlayer) {
		newPlayer = {
			id: playerId,
			photo_50: 'favicon.png',
			name: 'Алена',
			bits: [],
			count: 0,
			color: rndColor()
		}
		domination.players = [
			newPlayer,
			...domination.players
		];
	}
	newPlayer.bits.push({ ...packages, 2: count });
	newPlayer.count += count;
	domination.cells = genGrid(domination.players);
	domination.actions.push({
		id: newPlayer.id,
		photo_50: newPlayer.photo_50, 
		count,
		name: `${newPlayer.name}-${newPlayer.id}`,
		packages, 
		color: newPlayer.color
	});


	await firebaseDB.collection('current').doc('domination').update(domination);
	if (domination.status === 0 && domination.players.length >= 2) {
		changeStatus(1);
	}
}

const randomCells = (domination, id) => {
	const cells = [];
	const gridCenter = (CELLS_COUNT - 1) / 2;
	const loopCount = 20;

	for (let i = 0; i < loopCount; i++) cells.push(shuffleArr(domination.cells));
	for (const r in cells[loopCount - 1]) {
		if (cells[loopCount - 1][r] === id) {
			cells[loopCount - 1][r] = cells[loopCount - 1][gridCenter];
		}
	}
	cells[loopCount - 1][gridCenter] = id;

	return cells;
}

export const changeStatus = async (status) => {
	const domination = await getCurrentDomination();

	switch (status) {
		case 1:
			domination.start = firebase.firestore.FieldValue.serverTimestamp();
			domination.status = 1;
			break;
		case 2:
			const sum = domination.players.reduce((all, { count }) => all + count, 0);
			const winnerBit = Math.ceil(domination.float * sum * 10);
			const winnerPlayer = null;

			for (const player of domination.players) {
				for (const p of player.packages) {
					if (p[0] <= winnerBit && p[1] >= winnerBit) winnerPlayer = player;
				}
			}
			domination.winner = {
				player: winnerPlayer,
				bit: winnerBit
			}
			domination.randomCells = randomCells(domination, winnerPlayer.id);
			domination.status = 2;
			break;
		case 3:
			domination.status = 3;
			break;
	}
	await firebaseDB.collection('current').doc('domination').update(domination);
}

const setDomination = async (id) => {
	const float = random.float();
	const token = rs.generate(16);

	await firebaseDB.collection('current').doc('domination').set({
		id,
		actions: [],
		cells: genGrid([]),
		players: [],
		status: 0,
		float,
		token,
		hash: hash(`${float}:${token}`),
		created: firebase.firestore.FieldValue.serverTimestamp()
	});
}

export const getCurrentDomination = async () => {
	let current = await firebaseDB.collection('current').doc('domination').get();
	let domination;

	if (!current.exists) {
		await setDomination(0);
		current = await firebaseDB.collection('current').doc('domination').get();
	}
	domination = current.data();
	for (const key in domination) {
		const value = domination[key];
		
		if (typeof value === 'object' && value.constructor.name === 'Timestamp')
			domination[key] = value.toDate().toString();
	}

	return domination;
} 

export const createDomination = async () => {
	const current = await firebaseDB.collection('current').doc('domination').get();
	let id = 0;

	if (current.exists) {
		const data = current.data();

		await firebaseDB.collection('domination').add(data);
		id = data.id + 1;
	}
	await setDomination(id);
}
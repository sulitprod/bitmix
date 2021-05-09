import hash from 'md5';
import rs from 'randomstring';
import random from 'random';
import 'firebase/firestore';
import { genGrid, rndColor, Times } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { CELLS_COUNT, TIMES } from '../constant';
import { shuffle } from 'underscore';

export const addBits = async (playerId, count) => {
	const domination = await getCurrentDomination();
	const { id, players } = domination;
	const sum = players.reduce((all, { count }) => all + count, 0);


	let newPlayer = null;
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
	domination.cells = genGrid(domination.players).join(':');
	domination.actions.push({
		id: newPlayer.id,
		photo_50: newPlayer.photo_50, 
		count,
		name: `${newPlayer.name}-${newPlayer.id}`,
		packages, 
		color: newPlayer.color
	});

	const bet = {
		gameId: id,
		gameType: 'domination',
		playerId,
		packages: [ sum * 10 + 1, (sum + count) * 10 ],
		time: Times(1),
		count
	};

	// await firebaseDB.collection('current/domination/bets').add(bet);

	await firebaseDB.collection('current').doc('domination').update(domination);
	if (domination.status === 0 && domination.players.length >= 2) changeStatus(1);
}

const randomCells = (cells, winner) => {
	const { player } = winner;
	const newCells = [];
	const gridCenter = (CELLS_COUNT - 1) / 2;
	const loopCount = 20;

	for (let i = 0; i < loopCount; i++) newCells.push(shuffle(cells.split(':')));

	const lastArray = newCells[loopCount - 1];

	for (const r in lastArray) if (lastArray[r] === player) {
		lastArray[r] = lastArray[gridCenter];
		break;
	}

	lastArray[gridCenter] = player;

	return newCells.map((arr) => arr.join(':'));
}

const setWinner = (float, players) => {
	const sum = players.reduce((all, { count }) => all + count, 0);
	const bit = Math.ceil(float * sum * 10);
	let player = null;

	for (const pl in players) {
		const plr = players[pl];
		for (const pk in plr.bits) {
			const pkg = plr.bits[pk];
			if (pkg['0'] <= bit && pkg['1'] >= bit) {
				player = pl;
				break;
			}
		}
	}

	return { bit, player }
}

export const changeStatus = async (status) => {
	const domination = await getCurrentDomination();
	const { cells, float, players } = domination;
	const newValues = {
		started: Times(1),
		status
	};

	switch (status) {
		case 1:
			setTimeout(() => changeStatus(status + 1), TIMES.domination[status] * 1000);
			break;
		case 2:
			const winner = setWinner(float, players);

			newValues.winner = winner;
			newValues.randomCells = randomCells(cells, winner);
			setTimeout(() => changeStatus(status + 1), TIMES.domination[status] * 1000);
			break;
		case 3:
			// setTimeout(() => changeStatus(0), TIMES.domination[status] * 1000);
			break;
	}
	await firebaseDB.collection('current').doc('domination').update({ ...domination, ...newValues });
}

const setDomination = async (id) => {
	const float = random.float();
	const token = rs.generate(16);

	await firebaseDB.collection('current').doc('domination').set({
		id,
		actions: [],
		cells: genGrid([]).join(':'),
		players: [],
		status: 0,
		float,
		token,
		hash: hash(`${float}:${token}`),
		created: Times(1)
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
import hash from 'md5';
import rs from 'randomstring';
import random from 'random';
import 'firebase/firestore';
import { genGrid, rndColor, shuffleArr, Times } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { CELLS_COUNT, TIMES } from '../constant';

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
	if (domination.status === 0 && domination.players.length >= 2) {
		changeStatus(1);
		setTimeout(() => changeStatus(2), TIMES.domination[1] * 1000);
	}
}

const randomCells = (domination, id) => {
	const { cells, players } = domination;
	const newCells = [];
	const gridCenter = (CELLS_COUNT - 1) / 2;
	const loopCount = 20;

	for (let i = 0; i < loopCount; i++) newCells.push(shuffleArr(cells.split(':')));
	for (const r in newCells[loopCount - 1]) {
		if (newCells[loopCount - 1][r] === id) {
			newCells[loopCount - 1][r] = newCells[loopCount - 1][gridCenter];
		}
	}
	newCells[loopCount - 1][gridCenter] = id;

	return newCells.map((arr) => arr.join(':'));
}

const setWinner = (domination) => {
	const sum = domination.players.reduce((all, { count }) => all + count, 0);
	const bit = Math.ceil(domination.float * sum * 10);
	let player = null;

	for (const pl in domination.players) {
		const plr = domination.players[pl];
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

	switch (status) {
		case 1:
			domination.started = Times(1);
			domination.status = 1;
			break;
		case 2:
			domination.winner = setWinner(domination);
			domination.randomCells = randomCells(domination, domination.winner.player);
			domination.started = Times(1);
			domination.status = 2;
			break;
		case 3:
			domination.started = Times(1);
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
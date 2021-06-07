import hash from 'md5';
import rs from 'randomstring';
import random from 'random';
import 'firebase/firestore';
import { genGrid, rndColor, Times } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { CELLS, TIMES } from '../constant';
import { shuffle, clone } from 'underscore';
import { getSession } from 'next-auth/client';

const currentDominationRaw = async () => {
	let current = await firebaseDB.collection('domination').where('current', '==', true).get();

	if (current.empty) {
		await addDomination(0);
		current = await firebaseDB.collection('domination').where('current', '==', true).get();
	}

	return current;
} 

const currentDomination = async () => {
	const raw = await currentDominationRaw();
	let current;

	raw.forEach(doc => current = { data: doc.data(), key: doc.id });

	return current;
}

const addBits = async (count, req) => {
	const currentUser = await getSession({ req });
	const { data, key } = await currentDomination();
	let newData = clone(data);
	let { players, status } = newData;

	if (status !== 0 && status !== 1) return;
	if (currentUser.balance < count) return;

	const sum = players.reduce((all, { count }) => all + count, 0);
	const packages = { 0: sum * 10 + 1, 1: (sum + count) * 10 };
	let newPlayer = null;

	for (const player of players) {
		if (player.id === currentUser.id) {
			newPlayer = player;
			break;
		}
	}
	if (!newPlayer) {
		const { id, photo_100, name } = currentUser;

		newPlayer = {
			id,
			photo_100,
			name,
			bits: [],
			count: 0,
			color: rndColor()
		}
		players.push(newPlayer);
	}
	newPlayer.bits.push({ ...packages, 2: count });
	newPlayer.count += count;
	newData.cells = genGrid(players).join(':');
	newData.actions.push({
		id: newPlayer.id,
		photo_100: newPlayer.photo_100, 
		count,
		name: newPlayer.name,
		packages, 
		color: newPlayer.color
	});

	const bet = {
		gameId: newData.id,
		gameType: 'domination',
		playerId: currentUser.id,
		packages: [ sum * 10 + 1, (sum + count) * 10 ],
		time: Times(1),
		count
	};

	// await firebaseDB.collection('current/domination/bets').add(bet);

	await firebaseDB.collection('domination').doc(key).update(newData);
	if (status === 0 && players.length >= 2) changeStatus(1);
}

const randomCells = (cells, winner) => {
	const { player } = winner;
	const newCells = [];
	const gridCenter = (CELLS.count - 1) / 2;
	const loopCount = TIMES.domination[2] * 2;

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

const changeStatus = async (status) => {
	const { data, key } = await currentDomination();
	const { cells, float, players } = data;
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
			setTimeout(() => { 
				addReward();
				createDomination();
			}, TIMES.domination[status] * 1000);
			break;
	}
	await firebaseDB.collection('domination').doc(key).update({ ...data, ...newValues });
}

const addReward = async () => {
	console.log('hello');
}

const addDomination = async (id) => {
	const float = random.float();
	const token = rs.generate(16);

	await firebaseDB.collection('domination').add({
		id,
		actions: [],
		cells: '',
		players: [],
		status: 0,
		float,
		current: true,
		token,
		hash: hash(`${float}:${token}`),
		created: Times(1)
	});
} 

const createDomination = async () => {
	const { data, key } = await currentDomination();

	await addDomination(data.id + 1);
	await firebaseDB.collection('domination').doc(key).update({ ...data, current: false });
}

export {
	currentDomination, createDomination, addBits
}
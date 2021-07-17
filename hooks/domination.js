import hash from 'md5';
import rs from 'randomstring';
import random from 'random';
import 'firebase/firestore';
import { randomGrids, rndColor, Times } from '../utils';
import { firebaseDB } from '../utils/firebase';
import { TIMES } from '../constant';
import { clone, sumBy } from 'lodash';
import { getSession } from 'next-auth/client';

const currentDominationRaw = async () => {
	let current = await firebaseDB.collection('domination').where('status', '!=', 4).get();

	if (current.empty) {
		await addDomination(0);
		current = await firebaseDB.collection('domination').where('status', '!=', 4).get();
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
	const currentPlayer = await getSession({ req });
	const { data, key } = await currentDomination();
	let newData = clone(data);
	let { players, status } = newData;

	if (status !== 0 && status !== 1) return;
	if (currentPlayer.balance < count) return;

	const sum = sumBy(players, ({ count }) => count);
	const packages = { 0: sum * 10 + 1, 1: (sum + count) * 10 };
	let newPlayer = null;

	for (const player of players) {
		if (player.id === currentPlayer.id) {
			newPlayer = player;
			break;
		}
	}
	if (!newPlayer) {
		const { id, photo_100, name } = currentPlayer;

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
	newData.actions.push({
		id: newPlayer.id,
		photo_100: newPlayer.photo_100, 
		count,
		name: newPlayer.name,
		packages, 
		color: newPlayer.color
	});

	const bet = {
		playerId: currentPlayer.id,
		packages: [ sum * 10 + 1, (sum + count) * 10 ],
		time: Times(1),
		count
	};

	// await firebaseDB.collection('current/domination/bets').add(bet);

	await firebaseDB.collection('domination').doc(key).update(newData);
	if (status === 0 && players.length >= 2) changeStatus(1);
}

const setWinner = (float, players) => {
	const sum = sumBy(players, ({ count }) => count);
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
	const { float, players } = data;
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
			newValues.randomGrids = randomGrids(players, winner.player);
			setTimeout(() => changeStatus(status + 1), TIMES.domination[status] * 1000);
			break;
		case 3:
			await addReward(data.winner, players);
			setTimeout(async () => {
				await createDomination();
				changeStatus(status + 1);
			}, TIMES.domination[status] * 1000);
			break;
	}
	await firebaseDB.collection('domination').doc(key).update({ ...newValues });
}

const addReward = async (winner, players) => {
	const sum = sumBy(players, ({ count }) => count);
	const getPlayer = await firebaseDB.collection('players').where('id', '==', players[winner.player].id).get();
	let player = {};

	getPlayer.forEach(doc => player = { data: doc.data(), key: doc.id });

	await firebaseDB.collection('players').doc(player.key).update({ balance: player.data.balance + sum });
}

const lastWinners = async () => {
	const games = [];
	const raw = await firebaseDB.collection('domination').where('status', '==', 4).orderBy('id', 'desc').limit(5).get();

	raw.forEach(doc => games.push(doc.data()));

	return games.map((data) => {
		return {
			photo: data.players[data.winner.player].photo_100
		}
	});
}

const addDomination = async (id) => {
	const float = random.float();
	const token = rs.generate(16);

	await firebaseDB.collection('domination').add({
		id,
		actions: [],
		players: [],
		status: 0,
		float,
		token,
		hash: hash(`${float}:${token}`),
		created: Times(1)
	});
} 

const createDomination = async () => {
	const { data, key } = await currentDomination();

	await addDomination(data.id + 1);
}

export {
	currentDomination, createDomination, addBits, lastWinners
}
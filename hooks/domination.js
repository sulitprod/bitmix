import firebase from 'firebase/app';
import 'firebase/firestore';
import { genGrid, rndColor } from '../utils';
import { firebaseDB } from '../utils/firebase';

export const addBits = async (playerId, count, domination) => {
	let newPlayer = null;

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
	const packages = { 0: newPlayer.count * 10 + 1, 1: (newPlayer.count + count) * 10 } 
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
}

export const getDomination = async () => {
	const current = await firebaseDB.collection('current').doc('domination').get();

	if (current.exists) {
		const domination = current.data();

		for (const key in domination) {
			const value = domination[key];
			
			if (typeof value === 'object' && value.constructor.name === 'Timestamp')
				domination[key] = value.toDate().toString();
		}

		return domination;
	} else {
		const domination = await firebaseDB.collection('current').doc('domination').set({
			id: 0,
			actions: [],
			cells: genGrid([]),
			players: [],
			status: 0,
			created: firebase.firestore.FieldValue.serverTimestamp()
		});
		console.log(domination);
	}
}

export const createDomination = async () => {
	const current = await firebaseDB.collection('current').doc('domination').get();
	let id = 0;

	if (current.exists) {
		const data = current.data();

		await firebaseDB.collection('domination').add(data);
		id = data.id + 1;
	}
	await firebaseDB.collection('current').doc('domination').set({
		id,
		actions: [],
		cells: genGrid([]),
		players: [],
		status: 0,
		created: firebase.firestore.FieldValue.serverTimestamp()
	});
	// const info = await firebaseDB.collection('info').doc('domination').get();
	// const id = info.data().id;
	// const game = await info.data().game.get();
	// console.log(info);
	// console.log(game);
}
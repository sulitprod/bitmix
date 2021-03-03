import { genGrid, rndColor } from '../utils';
import { firebaseDB } from '../utils/firebase';

export const addBits = async (gameId, playerId, count, domination) => {
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
	newPlayer.bits.push({ 0: newPlayer.count * 10 + 1, 1: (newPlayer.count + count) * 10, 2: count });
	newPlayer.count += count;
	domination.cells = genGrid(domination.players);

	await firebaseDB.collection('domination').doc(gameId).update(domination);
}
import hash from 'md5';
import rs from 'randomstring';
import random from 'random';
import { getSession } from 'next-auth/client';
import { groupBy, sumBy, shuffle, find } from 'lodash';

import redis from '../redis';
import { rndColor, Times } from '../utils';
import { CELLS, TIMES } from '../constant';

const getCurrentGame = async () => {
	if (!(await redis.exists('domination:games'))) await addGame(0);

	const currentGame = JSON.parse(await redis.lindex('domination:games', -1));
	const bets = (await redis.lrange(`domination:bets:${currentGame.id}`, 0, -1)).map(JSON.parse);
	const players = (await redis.lrange(`domination:players:${currentGame.id}`, 0, -1)).map(JSON.parse);
	const lastWinners = await getLastWinners();

	return { ...currentGame, bets, players, lastWinners }
}

const setGame = async (data) => {
	const { bets, players, lastWinners, ...game } = data;

	await redis.lset('domination:games', game.id, JSON.stringify(game));
}

const changeBalance = async (player, transaction) => {
	const { playerId, balance } = player;

	await addTransaction(player, transaction);
	await redis.lset('players', playerId, JSON.stringify({ ...player, balance: balance + transaction }));
}

const addCount = async (count, req) => {
	const currentPlayer = await getSession({ req });
	// Костыль, надо чтоб id был как у игрока в базе редис, а не как id от соц сети
	currentPlayer.id = (await redis.lsearch('players', { authId: currentPlayer.id })).id;

	const { id, bets, status, players } = await getCurrentGame();
	const sum = sumBy(bets, ({ count }) => count);
	const bet = {
		playerId: currentPlayer.id,
		packages: [ sum * 10 + 1, (sum + count) * 10 ],
		created: Times(1),
		count
	};

	if (!bets.some(({ playerId }) => playerId === currentPlayer.id)) 
		await redis.rpush(`domination:players:${id}`, JSON.stringify({
			playerId: currentPlayer.id,
			color: rndColor(),
			comission: bets.length === 1 ? 3 : 5
		}));
	await redis.rpush(`domination:bets:${id}`, JSON.stringify(bet));
	if (status === 0 && players.length >= 2) startGame();
}

const startGame = async () => {
	await setStage(1);
	setTimeout(async () => {
		await setStage(2);
		setTimeout(async () => {
			await setStage(3);
			setTimeout(async () => await setStage(4), TIMES.domination[3] * 1000);
		}, TIMES.domination[2] * 1000);
	}, TIMES.domination[1] * 1000);
}

const setStage = async (stage) => {
	const currentGame = await getCurrentGame();
	let adding = {
		started: Times(1), 
		status: stage
	}

	switch (stage) {
		case 2: {
			const { float, bets } = currentGame;
			const winner = getWinner(float, bets);
			const grid = getGrid(bets);
			const { playerId } = winner.bet;

			adding = {
				...adding,
				winner,
				randomGrids: getRandomGrids(grid, playerId)
			}
			break;
		}
		case 3: {
			const { winner, bets, id, players } = currentGame;
			const { playerId } = winner.bet;
			const sum = sumBy(bets, ({ count }) => count);
			const player = find(players, { playerId });

			await setReward(player, sum);
			break;
		}
		case 4: {
			const id = await redis.llen('domination:games');

			await addGame(id);
			break;
		}
	}
	
	await setGame({ ...currentGame, ...adding });
}

const addGame = async (id) => {
	const float = random.float();
	const token = rs.generate(16);
	const game = {
		id,
		created: Times(1),
		float,
		token,
		hash: hash(`${float}:${token}`),
		status: 0
	};

	await redis.rpush('domination:games', JSON.stringify(game));
}

const addPlayer = async (adding) => {
	const id = await redis.llen('players');
	const player = {
		status: 0,
		created: Times(1),
		photo: 'img/favicon.png',
		id,
		balance: 0,
		rewards: [],
		...adding
	};

	await redis.rpush('players', JSON.stringify(player));
}

const getWinner = (float, bets) => {
	const sum = sumBy(bets, ({ count }) => count);
	const bit = Math.ceil(float * sum * 10);

	for (const b in bets) {
		const bet = bets[b];
		const { packages } = bet;

		if (packages[0] <= bit && packages[1] >= bit) {
			return { bit, bet }
		}
	}
}

const getPlayer = async (id) => {
	return JSON.parse(await redis.lindex('players', id));
}

const setReward = async ({ playerId, comission }, count) => {
	const reward = count - count / 100 * comission;
	const player = await getPlayer(playerId);

	await changeBalance(player, reward);
}

const addTransaction = async (player, transaction) => {
	const { playerId, balance } = player; 

	await redis.rpush('transactions', JSON.stringify({
		playerId,
		prevBalance: balance,
		balance: balance + transaction,
		transaction
	}));
}

const getLastWinners = async () => {
	const players = await redis.lrange('players', 0, -1);
	const lastGames = (await redis.lrange('domination:games', -6, -1)).map(JSON.parse);
	const lastWinners = lastGames
		.filter(({ status }) => status === 4)
		.map(({ winner }) => {
			const { playerId } = winner.bet;

			return JSON.parse(players[playerId]);
		});


	
	return lastWinners;
}

const getGrid = (bets) => {
	const grid = [];

	if (bets.length) {
		const players = Object.entries(groupBy(bets, (bet) => bet.playerId));
		const sum = sumBy(bets, ({ count }) => count);
		const chars = players.map(([ _, bets ]) => {
			const count = bets.reduce((all, { count }) => all + count, 0);

			return (CELLS.count / 100) * (count / (sum / 100))
		});
		const charsRounded = chars.map((i) => Math.floor(i) + 1);

		while (charsRounded.reduce((all, i) => all + i) !== CELLS.count) {
			const max = charsRounded.indexOf(Math.max(...charsRounded));
			charsRounded[max] -= 1;
		}
		for (const p in charsRounded) {
			for (let i = 0; i < charsRounded[p]; i++) {
				grid.push(p);
			}
		}
	}

	return grid.join(':');
}

const getRandomGrids = (grid, playerId) => {
	const grids = [];
	const gridCenter = (CELLS.count - 1) / 2;
	const loopCount = TIMES.domination[2] * 2;

	for (let i = 0; i < loopCount; i++) grids.push(shuffle(grid.split(':')));

	const lastGrid = grids[loopCount - 1];

	for (const r of lastGrid) {
		if (lastGrid[r] === playerId) {
			[lastGrid[r], lastGrid[gridCenter]] = [lastGrid[gridCenter], lastGrid[r]];
			break;
		}
	}

	return grids.map((arr) => arr.join(':'));
}

export {
	addCount,
	getCurrentGame,
	addPlayer,
	addGame,
	setStage
}
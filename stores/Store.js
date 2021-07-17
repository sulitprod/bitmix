import { runInAction, makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { sumBy } from 'lodash';

import { TIMES } from '../constant';
import { isClient, Times, genGrid } from '../utils';

enableStaticRendering(!isClient());

class Store {
	id;
	session;
	actions;
	status;
	players;
	randomGrids;
	started;
	float;
	hash;
	token;
	remaining = 0;
	addingBits = 0;

	constructor() {
		makeAutoObservable(this);
	}

	get statusTime() {
		return TIMES.domination[this.status];
	}

	get computedRemaining() {
		const remaining = this.statusTime - (Times(2) - Times(2, this.started)) / 1000;

		return remaining < 0 ? 0 : remaining;
	}

	get grid() {
		return genGrid(this.players).join(':');
	}

	get sum() {
		return sumBy(this.players, ({ count }) => count);
	}

	get currentGrid() {
		const { statusTime, randomGrids, remaining, grid, status } = this;

		switch (status) {
			case 2:
				const id = Math.ceil((statusTime - remaining) / (statusTime / randomGrids.length)) - 1;

				return randomGrids[id].split(':');
			case 3:
				return randomGrids[randomGrids.length - 1].split(':');
			default:
				return grid ? grid.split(':') : [];
		}
	};

	setAddingBits = (count) => {
		this.addingBits = count;
	}

	startRemaining = () => {
		if (this.status !== 0)
			this.timer = setInterval(() => {
				runInAction(() => this.remaining = this.computedRemaining);
			}, 500);
	}

	init = async (data) => {
		if (!data) return;

		clearInterval(this.timer);

		const { actions, status, players, started, id, float, hash, token, randomGrids, winner, lastWinners } = data.domination;

		this.actions = actions;
		this.status = status;
		this.randomGrids = randomGrids;
		this.players = players;
		this.started = started;
		this.id = id;
		this.float = float;
		this.hash = hash;
		this.token = token;
		this.winner = winner;

		this.lastWinners = lastWinners;

		this.last = data.redis.lastWinners;

		this.startRemaining();

		this.session = data.session;
	}
}

export default Store;
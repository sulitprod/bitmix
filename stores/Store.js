import { runInAction, makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

import { TIMES } from '../constant';
import { isClient, Times } from '../utils';

enableStaticRendering(!isClient());

class Store {
	id;
	session;
	actions;
	status;
	players;
	cells;
	randomCells;
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

	get currentGrid() {
		const { statusTime, randomCells, remaining, cells, status } = this;

		switch (status) {
			case 2:
				const id = Math.ceil((statusTime - remaining) / (statusTime / randomCells.length)) - 1;

				return randomCells[id].split(':');
			case 3:
				return randomCells[randomCells.length - 1].split(':');
			default:
				return cells ? cells.split(':') : [];
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

		const { actions, status, cells, players, started, id, float, hash, token, randomCells, winner, lastWinners } = data.domination;

		this.actions = actions;
		this.status = status;
		this.cells = cells;
		this.randomCells = randomCells;
		this.players = players;
		this.started = started;
		this.id = id;
		this.float = float;
		this.hash = hash;
		this.token = token;
		this.winner = winner;

		this.lastWinners = lastWinners;

		this.startRemaining();

		this.session = data.session;
	}
}

export default Store;
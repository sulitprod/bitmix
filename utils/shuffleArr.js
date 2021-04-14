const shuffleArray = (array) => {
	const shuffle = array.slice(0);

	for (let i = shuffle.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
	}

	return shuffle;
}

export default shuffleArray;
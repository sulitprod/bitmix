import random from 'random';

const randomColor = () => {
	return `hsl(${random.int(0, 359)}, 100%, 75%)`;
}

export default randomColor;
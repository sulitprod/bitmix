import random from 'random';

export default function randomColor() {
	return `hsl(${random.int(0, 359)}, 100%, 75%)`;
}
import { addBits } from '../../hooks/domination';
import random from 'random';

const handler = async (req, res) => {
	const { method, body } = req;

	if (method === 'POST') {
		if(['count'].every(key => key in body)) {
			const { count } = body;

			await addBits(random.int(0, 10), count);
		}
	}
	res.status(200).json({});
}

export default handler;
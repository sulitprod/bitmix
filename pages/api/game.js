import { getCurrentGame } from '../../hooks/domination-redis';

const handler = async (req, res) => {
	const { method } = req;

	if (method === 'GET') {
		return getCurrentGame();
	}
	res.end();
}

export default handler;
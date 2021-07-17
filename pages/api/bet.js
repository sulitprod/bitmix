import { addBits } from '../../hooks/domination';
import { getSession } from 'next-auth/client';
import { addCount } from '../../hooks/domination-redis';

const handler = async (req, res) => {
	const user = await getSession({ req });
	const { method, body } = req;

	if (method === 'POST' && user && body.count) {
		const { count } = body;
		
		await addCount(count, req);
		await addBits(count, req);
	}
	res.end();
}

export default handler;
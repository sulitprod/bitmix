import { addBits } from '../../hooks/domination';
import { getSession } from 'next-auth/client';

const handler = async (req, res) => {
	const user = await getSession({ req });
	const { method, body } = req;

	if (method === 'POST' && user && 'count' in body) {
		const { count } = body;
		
		await addBits(count, req);
	}
	res.end();
}

export default handler;
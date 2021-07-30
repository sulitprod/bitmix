import { addBits } from '../../hooks/domination';
import { getSession } from 'next-auth/client';
import { addCount } from '../../hooks/domination-redis';

import Pusher from 'pusher';

const handler = async (req, res) => {
	const user = await getSession({ req });
	const { method, body } = req;

	const pusher = new Pusher({
		appId: '1241223',
		key: '6118d30bbc02e4d11db3',
		secret: '09cb810e42edbe994598',
		cluster: 'eu',
		useTLS: true
	});
	console.time('a')
	
	pusher.trigger('my-channel', 'my-event', {
		message: 'hello world'
	});
	console.timeEnd('a')

	res.socket.server.io.emit('updateGame');

	if (method === 'POST' && user && body.count) {
		const { count } = body;
		
		await addCount(count, user);
		await addBits(count, req);
	}
	res.end();
}

export default handler;
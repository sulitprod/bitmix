import { createNodeRedisClient } from 'handy-redis';
import { find } from 'lodash';
import { isClient } from './utils';

let client = null;

if (!isClient()) {
	const url = 'redis://127.0.0.1:6379';

	client = createNodeRedisClient(url);
	// where underscore!
	client.lsearch = async (key, object) => {
		const values = (await client.lrange(key, 0, -1)).map(JSON.parse);

		return find(values, object);
	}

	client.nodeRedis.on('error', function(error) {
		console.error(error);
	});
} else {
	console.error('Redis called on client side!');
}

export default client;
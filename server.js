import next from 'next';
import express from 'express';
import { DEFAULT_PORT } from './constant';
import { isDev } from './utils';

const { PORT } = process.env;
const server = express();
const app = next({
	dev: isDev()
});
const handle = app.getRequestHandler();

server.all('*', (request, response) => {
	handle(request, response);
});

async function start() {
	try {
		const port = Number(PORT) || DEFAULT_PORT;

		await app.prepare();
		server.listen(port);
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

start();

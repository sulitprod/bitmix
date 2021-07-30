import next from 'next';
import express from 'express';
import http from 'http';
import { DEFAULT_PORT } from './constant';
import { isDev } from './utils';

const { PORT } = process.env;
const port = Number(PORT) || DEFAULT_PORT;
const exp = express();
const server = http.createServer(exp);
const app = next({ dev: isDev() });
const nextHandler = app.getRequestHandler();

async function start() {
	try {
		await app.prepare();

		exp.all('*', (request, response) => {
			nextHandler(request, response);
		});
		server.listen(port, () => {
			console.log(`listening on *:${port}`);
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

start();
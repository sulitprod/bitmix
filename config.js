import { DEFAULT_PORT } from './constant';
import packageJson from './package.json';
import manifest from './public/manifest.json';

const { PORT } = process.env;
const port = Number(PORT) || DEFAULT_PORT

const completeConfig = {
	default: {
		port,
		appSlug: packageJson.name,
		appVersion: packageJson.version,
		appUrl: 'https://nextjs-pwa-firebase-boilerplate.vercel.app/',
		appName: manifest.name,
		appTagline: manifest.description,
		appDescription: `${manifest.name} – ${manifest.description}`,
		locale: 'en_US',
		googleAnalyticsId: 'UA-XXXXXXX-X',
		googleSiteVerification: false
	},
	development: {
		appUrl: `http://localhost:${port}/`,
		googleAnalyticsId: null
	},
	production: {
	}

}

// Public API
module.exports = {
	config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
	completeConfig
}

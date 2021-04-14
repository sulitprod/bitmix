import Head from 'next/head';

import manifest from '../public/manifest.json';
import { config } from '../config';

const MainHead = ({ title, description, path = '/' }) => {
	const pageTitle = title || config.appName;
	const pageDescription = description || config.appDescription;
	const iconUrl = '/img/favicon.png';

	return (
		<> 
			<Head>
				<title>{pageTitle}</title>
				<meta name='description' content={pageDescription} />
				<meta charSet='utf-8' />
				<meta httpEquiv='content-language' content={config.locale.split('_')[0]} />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
				<meta name='theme-color' content={manifest.theme_color} />
				<link rel='manifest' href='/manifest.json' />
				<link rel='shortcut icon' type='image/x-icon' href={iconUrl} />
			</Head>
			<style jsx>{`
				@font-face {
					font-family: 'Pixel';
					src: url('/Piksieli_Prosto.otf');
					font-display: fallback;
				}
			`}</style>
		</>
	);
}
export default MainHead;

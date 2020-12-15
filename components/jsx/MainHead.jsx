import Head from 'next/head'

import manifest from '../../public/manifest.json'
import { config } from '../../config'

const MainHead = ({ title, description, path = '/' }) => {
	const pageTitle = title || config.appName
	const pageDescription = description || config.appDescription
	const iconUrl = '/img/favicon.png'

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
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Montserrat');
				@import 'public/variables.scss';

				@font-face {
					font-family: "Pixel";
					src: url('/pixel.otf');
				}

				* {
					border: 0;
					box-sizing: border-box;
					font-family: Pixel, serif;
					font-size: 14px;
					list-style: none;
					margin: 0;
					outline: 0;
					padding: 0;
					position: relative;
					text-decoration: none;
				}

				body {
					background: $bodyBackground;
				}
			`}</style>
		</>
	)
}
export default MainHead

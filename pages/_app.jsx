import { createGlobalStyle, ThemeProvider } from 'styled-components';

import MainHead from '../components/MainHead';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import Notifications from '../components/default/Notifications';
import manifest from '../public/manifest.json';
import { rndColor } from '../utils';

const GlobalStyle = createGlobalStyle`
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
	html {
		height: 100%;

		> body {
			background: ${({theme}) => theme.bodyBackground};
			overflow-y: scroll;
			height: 100%;

			> #__next {
				height: 100%;
				display: flex;
    			flex-direction: column;
			}
		}
	}
`;
const theme = {
	bodyBackground: manifest.background_color,
	white: '#ffffff',
	gray: '#434343',
	darkGray: '#282828',
	darkGrayHover: '#1b1b1b',
	shadowGray: '#2F2F2F',
	lightGray: '#9a9a9a',
	pg12: '12px',
	pg8: '8px',
	pg4: '4px'
};

const lightTheme = {
	bodyBackground: '#EDEEF0',
	white: '#000000',
	gray: '#d8d8d8',
	darkGray: '#cacaca',
	darkGrayHover: '#dadada',
	shadowGray: '#e2e2e2',
	lightGray: '#9a9a9a',
	pg12: '12px',
	pg8: '8px',
	pg4: '4px'
}

const App = ({ Component, err, pageProps, router }) => {
	const { title, description, color } = pageProps;
	const user = {
		id: 3,
		photo_50: 'favicon.png',
		name: 'Gleb',
		balance: 300
	};

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<MainHead {...{ title, description }} />
			<Header {...{ color, user }} />
			<Subheader />
			<Component {...pageProps}{...router} user={user} />
			<Notifications />
		</ThemeProvider>
	);
}

App.getInitialProps = async () => {
	return { pageProps: { color: rndColor() } }
}

export default App;
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import MainHead from '../components/MainHead';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import Notifications from '../components/Notifications';
import manifest from '../public/manifest.json';

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
	body {
		background: ${({theme}) => theme.bodyBackground};
		overflow-y: scroll;
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
	pg8: '8px',
	pg4: '4px'
};

const App = ({ Component, err, pageProps, router }) => {
	const { title, description } = pageProps;

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<MainHead {...{ title, description }} />
			<Header />
			<Subheader />
			<Component {...pageProps}{...router} />
			<Notifications />
		</ThemeProvider>
	);
}

export default App;
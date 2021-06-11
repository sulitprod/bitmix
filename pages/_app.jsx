import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getSession, Provider as SessionProvider } from 'next-auth/client';

import MainHead from '../components/MainHead';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import Notifications from '../components/default/Notifications';
import manifest from '../public/manifest.json';
import { rndColor } from '../utils';
import '../public/default.css';
import { StoreProvider } from '../providers/Store';

const GlobalStyle = createGlobalStyle`
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
	pg4: '4px',
	redText: '#BF4242'
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
	pg4: '4px',
	redText: '#BF4242'
}

const App = ({ Component, err, pageProps, router }) => {
	const { title, description, color, session } = pageProps;

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<StoreProvider {...pageProps}>
				<SessionProvider session={session}>
					<MainHead {...{ title, description }} />
					<Header {...{ color }} />
					<Subheader />
					<Component {...{ ...pageProps, ...router }} />
					<Notifications />
				</SessionProvider>
			</StoreProvider>
		</ThemeProvider>
	);
}

App.getInitialProps = async ({ req }) => {
	return { 
		pageProps: { 
			color: rndColor(), 
			session: getSession({ req }) 
		}
	}
}

export default App;
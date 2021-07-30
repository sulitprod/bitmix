import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getSession } from 'next-auth/client';

import MainHead from '../components/MainHead';
import Header from '../components/Header';
import Subheader from '../components/Subheader';
import Notifications from '../components/default/Notifications';
import manifest from '../public/manifest.json';
import { rndColor } from '../utils';
import { StoreProvider } from '../providers/Store';
import { currentDomination, lastWinners } from '../hooks/domination';
import { firebaseDB } from '../utils/firebase';
import { getCurrentGame, getTopPlayers } from '../hooks/domination-redis';

import '../public/default.css';

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
	grayFocus: '#57585a',
	darkGray: '#282828',
	darkGrayHover: '#1b1b1b',
	shadowGray: '#2F2F2F',
	lightGray: '#9a9a9a',
	redText: '#BF4242',
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
	redText: '#BF4242',
	pg12: '12px',
	pg8: '8px',
	pg4: '4px'
}

const App = ({ Component, err, pageProps, router }) => {
	const { title, description, color, session, domination, lastWin, redis, topPlayers } = pageProps;
	const [ currentDomination, setCurrent ] = useState({ ...domination.data, lastWinners: lastWin });
	const [ getDomination, loading, error ] = useCollectionData(
		firebaseDB.collection('domination').where('status', '!=', 4),
		{ snapshotListenOptions: { includeMetadataChanges: true } }
	);
	useEffect(async () => {
		if (getDomination) setCurrent({
			...getDomination[0], lastWinners: await lastWinners()
		});
	}, [getDomination]);
	const initialState = {
		domination: currentDomination,
		session,
		redis,
		topPlayers
	};
	initialState.domination.lastWinners = lastWin;

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<StoreProvider {...{ initialState }}>
				<MainHead {...{ title, description }} />
				<Header {...{ color }} />
				<Subheader />
				<Component {...{ ...pageProps, ...router }} />
				<Notifications />
			</StoreProvider>
		</ThemeProvider>
	);
}

App.getInitialProps = async (ctx) => {
	return {
		pageProps: {
			color: rndColor(), 
			session: await getSession(ctx),
			redis: await getCurrentGame(),
			domination: await currentDomination(),
			lastWin: await lastWinners(),
			topPlayers: await getTopPlayers()
		}
	}
}

export default App;
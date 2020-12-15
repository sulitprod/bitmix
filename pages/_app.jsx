import Router from 'next/router'

// import { config } from 'config/config'

import MainHead from '../components/jsx/MainHead'
import Header from '../components/jsx/Header'
import Subheader from '../components/jsx/Subheader'
import Notifications from '../components/jsx/Notifications'
// import { googlePageview } from 'components/page/GoogleAnalytics'

// Router.events.on('routeChangeComplete', path => googlePageview(path))

const App = ({ Component, err, pageProps, router }) => {
	const { title, description } = pageProps;

	return (
		<>
			<MainHead {...{ title, description }} />
			<Header />
			<Subheader />
			<Component {...pageProps}{...router} />
			<Notifications />
		</>
	)
}
export default App
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
	providers: [
		Providers.VK({
			clientId: '6936634',
			clientSecret: 'VwAu2P6UBfIfAvIlhcEU'
		})
	],
	callbacks: {
		async session(session, user) {
			const { picture, name, sub } = user;

			return {
				photo_100: picture,
				name,
				id: sub,
				balance: 300,
				rewards: [],
				created: '21.05.2021',
				status: 0
			}
		}
	}
})
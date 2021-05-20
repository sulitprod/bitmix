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
				picture,
				name,
				id: sub,
				balance: 300
			}
		}
	}
})
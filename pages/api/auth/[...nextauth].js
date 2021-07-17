import NextAuth from 'next-auth'
import { VK } from 'next-auth/providers'
import { firebaseDB } from '../../../utils/firebase'
import { Times } from '../../../utils'
import { addPlayer } from '../../../hooks/domination-redis'

export default NextAuth({
	providers: [
		VK({
			clientId: '6936634',
			clientSecret: 'VwAu2P6UBfIfAvIlhcEU'
		})
	],
	callbacks: {
		async signIn(user, account, profile) {
			return true
		},
		async jwt(token, user, account, profile, isNewUser) {
			if (account?.provider === 'vk') {
				const { id, photo_100, first_name, last_name } = profile.response[0];

				// await addPlayer({
				// 	photo: photo_100,
				// 	name: `${first_name} ${last_name}`,
				// 	authType: 'vk',
				// 	authId: id
				// });

				const player = await firebaseDB.collection('players').where('id', '==', id).get();

				if (player.empty) {
					const newPlayer = await firebaseDB.collection('players').add({
						status: 0,
						created: Times(1),
						id,
						photo_100,
						name: `${first_name} ${last_name}`,
						balance: 0,
						rewards: []
					});
					token.id = newPlayer.id;
				} else {
					player.forEach(({ id }) => token.id = id);
				}
			}

			return token
		},
		async session(session, user) {
			const player = await firebaseDB.collection('players').doc(user.id).get();

			if (!player.exists) return {};

			return player.data();
		}
	}
})
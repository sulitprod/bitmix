import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import ProfilePage from '../../components/pages/ProfilePage';

const User = () => {
	const params = useRouter();
	const [ user, userLoading ] = useSession();
	const { id } = params.query;

	console.log(user);

	return (
		<ProfilePage searchId={user && user.id === id ? null : id} />
	)
}

export default User;
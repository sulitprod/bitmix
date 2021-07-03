import { useRouter } from 'next/router';

import ProfilePage from '../../components/pages/ProfilePage';
import { useUser } from '../../providers/Store';

const User = () => {
	const params = useRouter();
	const user = useUser();
	const { id } = params.query;

	return (
		<ProfilePage searchId={user && user.id === id ? null : id} />
	)
}

export default User;
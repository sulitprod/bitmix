import { signIn, useSession } from 'next-auth/client';

import { Button, Icon } from '../../components/default';
import ProfilePage from '../../components/pages/ProfilePage';
import { Warning } from '../../components/Styled';

const User = () => {
	const [ user, userLoading ] = useSession();

	return (user && 'id' in user ? 
		<ProfilePage /> :
		<Warning>
			<Icon src='warning' width={64} />
			<p>Чтобы посмотреть свой профиль, нужно войти на сайт</p>
			<Button {...{
				right: <Icon src='login' width={24} />,
				align: 'right',
				value: 'Вход',
				onClick: () => signIn('vk'),
				type: 'main'
			}} />
		</Warning>
	)
}

export default User;
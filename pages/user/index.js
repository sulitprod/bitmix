import { signIn, useSession } from 'next-auth/client';
import styled from 'styled-components';
import Button from '../../components/default/Button';
import Icon from '../../components/default/Icon';
import ProfilePage from '../../components/pages/ProfilePage';
import { Warning } from '../../components/Styled';

const StyledIcon = styled(Icon)`
	fill: ${({theme}) => theme.lightGray};
`;
const StyledButton = styled(Button)`
	line-height: 24px;
`;

const User = () => {
	const [ user, userLoading ] = useSession();

	return (user && 'id' in user ? 
		<ProfilePage /> :
		<Warning>
			<StyledIcon src='warning' width={64} />
			<p>Чтобы посмотреть свой профиль, нужно войти на сайт</p>
			<StyledButton {...{
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
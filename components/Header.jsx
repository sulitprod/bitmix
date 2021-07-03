import styled from 'styled-components';
import { signIn } from 'next-auth/client';

import Profile from './Profile';
import { Button, Link, Icon } from './default';
import { useUser } from '../providers/Store';

const Styled = styled.div`
	align-items: center;
	display: flex;
	padding: ${({theme}) => theme.pg8};
	width: 100%;
	justify-content: space-between;
`;
const Logo = styled.div`
	color: ${p => p.bg};
	cursor: pointer;
	font-size: 20px;
	font-weight: 600;
	position: absolute;
	margin: auto;
	margin-left: 50%;
	width: 80px;
	left: -40px;
	text-align: center;
`;

const Header = ({ color }) => {
	const user = useUser();

	return (
		<Styled>
			<div>
				<Button href='/leaders' value='Лидеры' />
			</div>
			<Link href='/'>
				<Logo bg={color}>BITMIX</Logo>
			</Link>
			{ user?.id ? 
				<Profile user={user} href='/user' /> :
				<Button {...{
					right: <Icon src='login' width={24} />,
					align: 'right',
					value: 'Вход',
					onClick: () => signIn('vk')
				}} />
			}
		</Styled>
	);
}

export default Header;

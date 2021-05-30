import styled from 'styled-components';
import { useSession, signIn } from 'next-auth/client';

import Profile from './Profile';
import Button from './default/Button';
import Link from './default/Link';
import Icon from './default/Icon';

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
	const [ user, loading ] = useSession();

	return (
		<Styled>
			<div>
				<Button href='/leaders' value='Лидеры' />
			</div>
			<Link href='/'>
				<Logo bg={color}>BITMIX</Logo>
			</Link>
			{ user && 'id' in user ? 
				<Profile user={user} href='/user' /> :
				<Button right={<Icon src='login' width={24} padding={8} />} align='right' value='Вход' onClick={() => signIn('vk')} />
			}
		</Styled>
	);
}

export default Header;

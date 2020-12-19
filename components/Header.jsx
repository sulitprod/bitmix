import styled from 'styled-components';

import Profile from './Profile';
import Button from './Button';
import Link from './Link';

const Logo = styled.div`
	color: ${({theme}) => theme.white};
	cursor: pointer;
	font-size: 20px;
	font-weight: 600;
`;
const Styled = styled.div`
	align-items: center;
	display: flex;
	padding: ${({theme}) => theme.pg8};
	width: 100%;
	justify-content: space-between;
`;

const Header = () => (
	<Styled>
		<div>
			<Button href='/leaders' value='Лидеры' />
		</div>
		<Link href='/'>
			<Logo>BITMIX</Logo>
		</Link>
		<Profile />
	</Styled>
);

export default Header;

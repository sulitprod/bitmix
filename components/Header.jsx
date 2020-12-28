import styled from 'styled-components';

import Profile from './Profile';
import Button from './default/Button';
import Link from './default/Link';
import { rndColor } from '../utils';

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

const Header = ({ color }) => (
	<Styled>
		<div>
			<Button href='/leaders' value='Лидеры' />
		</div>
		<Link href='/'>
			<Logo bg={color}>BITMIX</Logo>
		</Link>
		<Profile />
	</Styled>
);

export default Header;

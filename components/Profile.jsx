import styled from 'styled-components';

import Coins from './Coins';
import Button from './Button';
import Photo from './Photo';

const Name = styled.p`
	border-bottom: 1px solid ${({theme}) => theme.gray};
	line-height: 16px;
	padding-bottom: ${({theme}) => theme.pg4};
`;
const Styled = styled(Coins)`
	padding-top: ${({theme}) => theme.pg4} !important;
`;

const Profile = () => {
	const User = {
		photo_50: 'favicon.png',
		name: 'Gleb',
		balance: 300
	};

	return (
		<div className='profile'>
			<Button right={<Photo src={User.photo_50} />} align='right'>
				<Name>{User.name}</Name>
				<Styled value={User.balance} />
			</Button>
		</div>	
	);
}

export default Profile;
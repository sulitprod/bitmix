import styled from 'styled-components';

import Bits from './Bits';
import Button from './default/Button';
import Photo from './default/Photo';

const Name = styled.p`
	border-bottom: 1px solid ${({theme}) => theme.gray};
	line-height: 16px;
	padding-bottom: ${({theme}) => theme.pg4};
`;
const Styled = styled(Bits)`
	padding-top: ${({theme}) => theme.pg4} !important;
`;

const Profile = ({ user }) => {
	return (
		<div>
			<Button right={<Photo src={user.photo_50} />} align='right'>
				<Name>{user.name}</Name>
				<Styled value={user.balance} />
			</Button>
		</div>	
	);
}

export default Profile;
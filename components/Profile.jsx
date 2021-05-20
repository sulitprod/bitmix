import styled from 'styled-components';

import Bits from './Bits';
import Button from './default/Button';
import Photo from './default/Photo';

const Name = styled.p`
	line-height: 16px;
	padding-bottom: ${({theme}) => theme.pg8};
`;

const Profile = ({ user: { picture, name, balance }, onClick }) => {
	return (
		<div>
			<Button {...{ right: <Photo src={picture} />, align:'right', onClick }}>
				<Name>{name}</Name>
				<Bits value={balance} />
			</Button>
		</div>	
	);
}

export default Profile;
import styled from 'styled-components';

import Bits from './Bits';
import Button from './default/Button';
import Photo from './default/Photo';

const Name = styled.p`
	line-height: 16px;
	padding-bottom: ${({theme}) => theme.pg8};
`;

const Profile = ({ user: { photo_100, name, balance }, onClick }) => {
	return (
		<div>
			<Button {...{ right: <Photo src={photo_100} />, align:'right', onClick }}>
				<Name>{name}</Name>
				<Bits value={balance} />
			</Button>
		</div>	
	);
}

export default Profile;
import styled from 'styled-components';

import Button from './Button';
import Icon from './Icon';

const Styled = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const Subheader = () => (
	<Styled>
		<Button
			href='/'
			type='main'
			left={<Icon src='crown' />}
			value='Доминация'
		/>
	</Styled>
);

export default Subheader;
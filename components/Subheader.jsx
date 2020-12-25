import styled from 'styled-components';

import Button from './default/Button'
import Icon from './default/Icon';

const Styled = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const Subheader = () => (
	<Styled>
		<Button
			href='/domination'
			type='main'
			left={<Icon src='crown' />}
			value='Доминация'
		/>
	</Styled>
);

export default Subheader;
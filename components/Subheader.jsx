import styled from 'styled-components';

import { Icon, Button } from './default';

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
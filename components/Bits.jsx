import styled from 'styled-components';

import { Icon } from './default';

const Styled = styled.div`
	color: ${({theme}) => theme.white};
	display: inline-block;
	line-height: 0;
	white-space: nowrap;

	> * {
		display: inline-block;
		vertical-align: middle;
	}
	> p {
		font-weight: 600;
		line-height: 16px;
		margin-left: ${({theme}) => theme.pg4};
	}
`;

const Bits = ({ value, className }) => (
	<Styled className={className}>
		<Icon src='bits' />
		<p>{value}</p>
	</Styled>
);

export default Bits;
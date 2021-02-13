import styled from 'styled-components';

import Svgs from './Svgs';

const Styled = styled.div`
	font-size: 0;
	line-height: 0;
	fill: ${({theme}) => theme.white};
	display: inline-block;

	> svg {
		fill: unset;
		height: ${p => p.height};
		width: ${p => p.width};
	}
`;

const Icon = ({ src, width = 16, height, className }) => {
	width = typeof width === 'string' ? width : width + 'px';
	height = height || width;

	const Svg = Svgs[src];

	return (
		<Styled {...{ width, height, className }}>
			<Svg src={src} />
		</Styled>
	);
}

export default Icon;